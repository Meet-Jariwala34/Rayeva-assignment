import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import gsap from 'gsap';
import axios from 'axios';
import { backendUrl } from '../../App';
import Replying from './Replying';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Customer() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true)
  const [replying, setReplying] = useState(false);
  const [chat, setChat] = useState("");
  const chatContainerRef = useRef(null);
  const expire = localStorage.getItem('userExpired');
  const token = localStorage.getItem('userToken');
  let minimumDelay

  const [messages, setMessages] = useState([{
    role : 'bot', content : "Hello! I'm your Rayeva Eco-Guide. How can I help you today? 🌿"
  }])

  useEffect(() => {

    //verifying the token
    const now = Date.now();
    if(!expire){
      navigate("/login");
    }
    if(now > expire){
      toast.error("You are not currently logged in ")
      navigate("/login");
    }else{
      minimumDelay = new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds
      handleVerify();
    }



  // 1. Added a check to see if the ref is actually attached
  if (chatContainerRef.current && messages.length > 0) {

    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    });
    
    // We use requestAnimationFrame to wait for the browser to finish painting
    requestAnimationFrame(() => {
      const lastMsg = chatContainerRef.current.lastElementChild;

      if (lastMsg) {
        gsap.killTweensOf(lastMsg); // Stop any glitchy overlaps

        gsap.fromTo(lastMsg, 
          { 
            y: 50, 
            opacity: 0 
          }, 
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2, // Increased slightly for the initial load
            ease: "back.out(1.7)" // Added a nice "pop" effect
          }
        );

        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    });
  }

}, [messages,replying]);

  const handleVerify = async () => {
        try {
            const res = await axios.get(backendUrl+"/verify/user", {headers : {token : token}});

            await Promise.all([res, minimumDelay]);
            if(res.data.success){
                setIsLoading(false)
            }else{
                navigate("/login");
            }

        } catch (error) {
            console.log("The error from the catch block")
            console.log(error);
        }
    }

  const aiRes = async (conversation) => {
    
    try {

      console.log("Entered in try block")
      const result = await axios.post(backendUrl+"/customer/ai/chats",{chat : conversation});

      if(result.data.success){
        console.log("result data success true")
        // This creates a NEW array, which triggers the useEffect properly
        
        setReplying(false);
        setMessages(prev => [...prev, { role: 'bot', content: result.data.AIreply.response }]);

        console.log("Checking the with orderRes ....")
        console.log(result.data.AIreply.orderId)
        console.log(result.data.AIreply.mood);
        if(result.data.AIreply.orderId !== null){
          console.log("updating new message after order found")
          setMessages(prev => [...prev, { role: 'bot', content: result.data.withOrderRes.response }]);
        }
      }else{
        console.log("The error from try block")
        console.log(result.data);
      }

    } catch (error) {
      setReplying(false);
      console.log("Error from the aiRes catch")
      console.log(error)
    }
  }

  const handleKeyDown = (e) => {
    if(e.key == "Enter"){
      onSend();
    }
  }

  const handleChat = (e) => {
    setChat(e.target.value);
  }

  const onSend = async () => {
    if (!chat.trim()) return;
    // This creates a NEW array, which triggers the useEffect properly
    const updatedMsg = [...messages, {role : 'user', content : chat}];
    setMessages(updatedMsg);
    setChat("");
    setReplying(true);
    await aiRes(updatedMsg);    
  }

  if(isLoading){
    return (<Loader/>)
  }

  return (
    <div className='h-screen w-screen flex flex-col items-center'>      

      {/* actully customer chats */}
      <div className='customer-chats-bg flex flex-row h-full w-screen items-center justify-center'>
        <div className='h-75/100 w-80/100 bg-[rgba(0,0,0,0.8)] rounded-2xl flex flex-row items-center justify-between'>
          {/* Current Or New chats  */}
          <div className='h-full w-full flex flex-col '>
            {/* chat-box */}
            <div style={{ minHeight: '0' }} ref={chatContainerRef} className="h-full w-full flex-nowrap justify-start overflow-y-auto p-4 flex flex-col gap-4">

  {messages.map((msg, index) => (
    <div 
      key={index} 
      className={`max-w-[80%] p-5 flex items-center h-auto rounded-lg overflow-hidden${
        msg.role === 'user' 
          ? ' self-end bg-green-600 text-white' // User on the right
          : ' self-start bg-white/20 backdrop-blur-md text-white' // Bot on the left
      }`}
    >
      {msg.content}
    </div>
  ))}

  {/* replying Replying animation */}
              {replying && <Replying/>} 
</div>
            <div className='h-1/10 w-full flex items-center justify-between bg-green-300  border-2 rounded-2xl shadow-2xl'>
              <input onKeyDown={handleKeyDown} onChange={handleChat} value={chat} className='h-full w-85/100 p-3 outline-none flex text-2xl items-center ' placeholder='Enter your query' type="text" />
              <div onClick={onSend} className='h-full w-15/100 p-2 flex items-center font-bold text-white justify-center rounded-2xl bg-green-500 cursor-pointer'><Send/> Send</div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}
