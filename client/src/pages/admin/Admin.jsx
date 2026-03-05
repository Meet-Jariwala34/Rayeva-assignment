import React, {useState, useEffect} from 'react';
import { PackageSearch } from 'lucide-react';
import Replying from './Replying';
import axios from 'axios';
import {toast} from 'react-toastify';
import {backendUrl} from '../../App';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import gsap from 'gsap';
import {io} from 'socket.io-client';
const socketBackend = import.meta.env.VITE_BACKEND_URL
const socket = io(socketBackend);

export default function Admin() {
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isResponse, setIsResponse] = useState(null);
    const [isDes, setIsDes] = useState("");
    const expired = localStorage.getItem('expired');
    const token = localStorage.getItem('token');
    let minimumDelay

    const fetchUsers = async () => {
        try {
            const res = await axios.get(backendUrl+"/user/fetchUser");
            console.log(res)
            if(res.data.success){
                console.log(res.data.message)
                setUserList(res.data.userData);
            }else{
                console.log("Fail to fetch the users")
            }
        } catch (error) {
            console.log("Error from fetchUser catch");
            toast.error(error.message);
            console.log(error);
        }
    }

    useEffect(() => {
        const now = Date.now();
        if(now > expired){
            toast.error("You are not logged-in !!");
            navigate('/admin-login');
        }else{
            minimumDelay = new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds
            handleVerify();
        }

        socket.emit("admin-join")
        fetchUsers();

        socket.on("updated-data",(data)=>{
            setUserList(prev => {
                const existingIndex = prev.findIndex(u => u.name === data.name);
    if (existingIndex !== -1) {
        // Update existing user and move to top
        const updatedList = [...prev];
        updatedList[existingIndex] = data;
        return [updatedList[existingIndex], ...updatedList.filter((_, i) => i !== existingIndex)];
    }
    // New user? Add to top
    toast.info("Users are updated")
    return [data, ...prev];
})
        })

        return () => {
        socket.off("updated-data"); // This "unplugs" the ear when you leave the page
    };
        
    },[])


    const handleOnChange = (e) => {
        setIsDes(e.target.value);
    }

    const handleOnInput = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    const handleCancle = () => {
        setIsResponse(null)
    }

    const handleVerify = async () => {
        try {
            const res = await axios.get(backendUrl+"/verify/admin", {headers : {token : token}});

            await Promise.all([res, minimumDelay]);
            if(res.data.success){
                setIsVerified(true)
            }else{
                navigate("/admin-login");
            }

        } catch (error) {
            console.log("The error from the catch block")
            console.log(error);
        }
    }

    const handleGenerate = async () => {
        try {

            setIsLoading(true);
            const res = await axios.post(backendUrl+"/ai/generate",{description : isDes})

            if(res != null){
                setIsResponse(res.data.result)
                console.log(res)
                setIsLoading(false);
            }else{
                console.log("The res is empty ")
                setIsLoading(false);
            }
            
        } catch (error) {
            console.log("The error from the outter try catch")
            console.log(error)
        }
    }

    const handleApprove = async () => {
        try {
            setIsResponse(null)
            const product = {
                description : isDes ,
                category : isResponse.category ,
                subCategory : isResponse.subcategory,
                seoTags : isResponse.seo_tags ,
                filter : isResponse.filters,
                response : isResponse
            }
            const res = await axios.post(backendUrl+"/ai/insert",product)

            console.log(res.data.success);

            if(res.data.success){
                toast.success(res.data.message)
                setIsDes("");
            }

        } catch (error) {
            console.log("The error from handleApprove outter")
            console.log(error)
        }
    }

    if(!isVerified){
        return (<Loader/>)
    }


    const demoData = [
    {
    name: "Meet", 
    lastConversation: [{role: "bot", content: "Hi"}, {role: "user", content: "Help me!"}], 
    mood: -1 
  }, // ✅ Active & Urgent
    {
    name: "Guest_102", 
    lastConversation: [{role: "bot", content: "Hi"}], 
    mood: 1 
  }, // ❌ Ghost User (Length 1)
    {
    name: "Aman", 
    lastConversation: [{role: "bot", content: "Hi"}, {role: "user", content: "Thanks!"}], 
    mood: 1 
  }, // ✅ Active & Happy
  { 
    name: "Aarav Sharma", 
    lastConversation: [{role: "bot", content: "Hi"}, {role: "user", content: "My payment failed but money was deducted!"}], 
    mood: -1,
    time: "2 mins ago"
  }, // 🔥 URGENT: High Escalation
  { 
    name: "Sanya Iyer", 
    lastConversation: [{role: "bot", content: "Welcome! How can I help?"}, {role: "user", content: "I love the new mountain trekking guide, thanks!"}], 
    mood: 1,
    time: "5 mins ago"
  }, // ✅ SATISFIED: Positive Feedback
  { 
    name: "John Doe", 
    lastConversation: [{role: "bot", content: "Hello!"}], 
    mood: 1,
    time: "Just now"
  }, // 👻 GHOST: Should be filtered out (Length = 1)
  { 
    name: "Rohan Varma", 
    lastConversation: [{role: "bot", content: "Hi"}, {role: "user", content: "Where can I find the terms and conditions?"}], 
    mood: 0,
    time: "15 mins ago"
  }, // 💬 NEUTRAL: Simple Inquiry
  { 
    name: "Priya Das", 
    lastConversation: [{role: "bot", content: "Hi"}, {role: "user", content: "The app keeps crashing when I upload photos. Fix it!!"}], 
    mood: -0.8,
    time: "8 mins ago"
  }, // ⚠️ ESCALATED: Frustrated user
  { 
    name: "Vikram Singh", 
    lastConversation: [{role: "bot", content: "Hi"}, {role: "user", content: "Can I get a discount for a group of 10?"}], 
    mood: 0.2,
    time: "25 mins ago"
  }, // 💬 NEUTRAL: Potential Customer
  { 
    name: "Unknown Guest", 
    lastConversation: [{role: "bot", content: "Hi"}], 
    mood: 1,
    time: "1 hour ago"
  }, // 👻 GHOST: Should be filtered out (Length = 1)
  { 
    name: "Ananya Rao", 
    lastConversation: [{role: "bot", content: "Hi"}, {role: "user", content: "This is the worst service I have ever used. Refund me."}], 
    mood: -1,
    time: "1 min ago"
  }, // 🔥 URGENT: High Escalation (Angry)
  { 
    name: "Chris Evans", 
    lastConversation: [{role: "bot", content: "Hi"}, {role: "user", content: "Is the Manali trip available in December?"}], 
    mood: 0.1,
    time: "40 mins ago"
  }, // 💬 NEUTRAL: General Question
  { 
    name: "Meera Patel", 
    lastConversation: [{role: "bot", content: "Hi"}, {role: "user", content: "Thank you for the quick response, very helpful!"}], 
    mood: 0.9,
    time: "12 mins ago"
  }  // ✅ SATISFIED: Polite user
];

    gsap.to(".escalated-card-border", {
  boxShadow: "0px 0px 15px 8px rgba(255, 0, 0, 0.6)",
  repeat: -1,
  yoyo: true,
  duration: 1,
  ease: "sine.inOut"
});

// Your logic:
const displayUsers = demoData.filter(user => user.lastConversation.length > 1);

    return (
    <div className='h-auto w-screen flex flex-col bg-black relative' >

        {/* Only visible when the ai is thinking ... */}
        
            {isLoading && <Replying/>}

            {!isLoading && isResponse && (
        <div className="results-area h-auto w-auto px-2 py-8 bg-[rgba(255,255,255,0.7)] rounded-2xl top-40 relative text-left flex flex-col gap-3 items-center font-bold ">
            {/* Your SEO Tags and Category Cards here */}
            <div className='flex items-center category h-auto w-auto gap-3'><span className='h-auto w-auto p-3 bg-gray-400 rounded'>Category </span>:<span className='h-auto w-auto p-3 bg-green-300 rounded'>{isResponse.category || "Uncategorized"}</span></div>
            <div className='flex items-center subcategory h-auto w-auto gap-3'><span className='h-auto w-auto p-3 bg-gray-400 rounded'>Sub-Category </span>:<span className='h-auto w-auto bg-green-300  p-3 rounded'>{isResponse.subcategory || "Unsubcategorized"}</span></div>
            <div className='flex items-center subcategory h-auto w-auto gap-1'><span className='h-auto w-auto p-3 bg-gray-400 rounded'>SEO_TAGS </span>:
                {
                    isResponse.seo_tags.map(
                        (tag,idx)=>(
                            <div className='h-auto w-auto bg-green-300  p-2 rounded' key={idx}>
                                <p>{tag}</p>
                            </div>
                        )
                    ) || "No Tags"
                }
            </div>
            <div className='flex items-center subcategory h-auto w-auto gap-1'><span className='h-auto w-auto p-3 bg-gray-400 rounded'>FILTERS </span>:
                {
                    isResponse.filters.map(
                        (filter,idx)=>(
                            <div className='h-auto w-auto bg-green-300  p-3 rounded' key={idx}>
                                <p>{filter}</p>
                            </div>
                        )
                    ) || "No Filters"
                }
            </div>
            <div className='flex flex-row gap-3 h-auto w-auto mt-5'>
                <div onClick={handleCancle} className='h-auto cursor-pointer w-auto p-2 font-bold rounded bg-red-400 text-white'><button className='cursor-pointer'>Cancle</button></div>
                <div onClick={handleApprove} className='h-auto cursor-pointer w-auto p-2 font-bold rounded bg-green-500 text-white'><button className='cursor-pointer'>Approve</button></div>
            </div>
        </div>
    )}
        

        <div className='h-screen w-full flex justify-center items-center'>
            <div className='h-auto w-8/10 flex flex-row justify-between items-end rounded-2xl font-medium bg-gray-300'>
                <div className='h-auto w-8/10'><textarea onChange={handleOnChange} value={isDes} rows={1} onInput={handleOnInput} className='h-auto resize-none p-3 min-h-8 flex flex-wrap max-h-120 w-full outline-none border-none'  placeholder='Enter the description of Product'/></div>
                <div><button onClick={handleGenerate} className='h-12 cursor-pointer overflow-hidden w-auto p-3 bg-gray-500 text-white font-medium text-2xl flex flex-row items-center gap-1.5 rounded-2xl'><PackageSearch /> Generate</button></div>
            </div>
        </div>

        {/* Chats */}
        <div className='h-screen w-full flex flex-col items-center gap-6 bg-black p-3'>
            {
                userList.filter(u => u.mood < 0 ).map((user,idx)=>(
                    <div key={idx} className="h-12 escalated-card-border w-80/100 flex justify-center items-center bg-red-600 rounded-2xl relative">
                        <div className='h-10 overflow-hidden w-99/100 p-2 flex flex-row items-center rounded-2xl bg-gray-400 text-white'>
                            <div className='h-full w-2/10 border-r-white border-r-2 text-lg overflow-hidden font-bold flex items-center justify-center'>{user.name}</div>
                            <div className='flex p-1 flex-row items-center justify-start w-7/10 overflow-x-scroll'><span className='text-lg whitespace-nowrap w-2/7'>Last Conversation : </span><div className='flex flex-row items-baseline-last font-bold overflow-x-scroll text-red-700 whitespace-nowrap'>{user.lastConversation[user.lastConversation.length - 1].content}</div></div>
                            <div className='flex p-1 gap-5 flex-row items-center justify-start absolute top-2 right-4'><div className='flex flex-row items-baseline-last font-bold text-red-700'>Escalated</div></div>
                        </div>
                    </div>
                ))}

            { userList.filter(u => u.mood > 0 ).map((user,idx)=>(
                    <div key={idx} className="h-12 w-80/100 flex justify-center items-center bg-green-600 rounded-2xl relative">
                        <div className='h-10 overflow-hidden w-99/100 p-2 flex flex-row items-center rounded-2xl bg-gray-400 text-white'>
                            <div className='h-full w-2/10 border-r-white border-r-2 text-lg overflow-y-hidden font-bold flex items-center justify-center'>{user.name}</div>
                            <div className='flex p-1 flex-row items-center justify-start w-7/10 overflow-x-scroll'><span className='text-lg whitespace-nowrap w-2/7'>Last Conversation : </span><div className='flex flex-row items-baseline-last font-bold overflow-x-scroll text-green-700 whitespace-nowrap'>{user.lastConversation[user.lastConversation.length - 1].content}</div></div>
                            <div className='flex p-1 gap-5 flex-row items-center justify-start absolute top-2 right-4'><div className='flex flex-row items-baseline-last font-bold text-green-700'>Resolved</div></div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
    )
}
