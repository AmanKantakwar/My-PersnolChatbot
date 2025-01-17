import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory,  generateBotResponse}) => {
const inputRef = useRef() 

const handelFormSubmit = () => {
   
    const userMessage = inputRef.current.value.trim()
    if(!userMessage) return;

    inputRef.current.value = "";

// Update chat history with the user message
   setChatHistory((history) => [...history, {role: "user", text: userMessage }]);

   //Delay 600 ms before showing "Thinking... and generating response"
   setTimeout(()=>{

   // Add a " Thinking..." placeholder for the bot's responce
  setChatHistory((history) => [...history, {role: "model", text: "Typing..."}]);

 //call the function to generate the bot response
  generateBotResponse([...chatHistory, {role: "user", text: userMessage }]);
},600);

}

  return (
    <form action="#" className="chat-form" onSubmit={handelFormSubmit}>
    <input  ref={inputRef}  type="text" placeholder="Message..." className="message-input" required />
    <button className="material-symbols-rounded">arrow_upward</button>
  </form>
  )
}

export default ChatForm