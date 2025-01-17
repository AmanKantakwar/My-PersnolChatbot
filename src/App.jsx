import Chatboticon from "./components/Chatboticon"
import ChatForm from "./components/ChatForm"
import ChatMessage from "./components/ChatMessage"
import { useEffect, useState, useRef } from "react"

const App = () => {

  const [chatHistory, setChatHistory] = useState([]);
  const  chatBodyRef = useRef();

  const generateBotResponse = async (history) => {

    //helper function to update chat history 
    const updateHistory=(text) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Typing..."), {role: "model", text}]);
    };

    //Format chat history for Api request
    history = history.map(({ role, text }) => ({ role, parts: [{ text }]}));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history })
    }

    try {
      //make the api call to get the bot response
const response = await fetch(import.meta.env.VITE_API_URL,requestOptions);
const data = await response.json()
if(!response.ok) throw new Error(data.erro.message || "Something went wrong!")


  //clean and update chat history with bot response
  const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*\((.*?)\)\*\*/g, "$1").trim();
  updateHistory(apiResponseText);
} catch (error){
console.log(error)
    }
};

useEffect(() =>{
chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior: "smooth" })
},[chatHistory])

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/*Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">

            <Chatboticon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-rounded">keyboard_arrow_down</button>
        </div>
        {/*Chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <Chatboticon />
            <p className="message-text">
              Hey there 👋! <br /> How can I help you today?
            </p>
          </div>


          {/*Render the chat history dynamically*/}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}

        </div>

        {/* Chatbot Footer */}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>

      </div>

    </div>
  )
}

export default App