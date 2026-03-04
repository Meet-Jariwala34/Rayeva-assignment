import React , {useState, useEffect} from 'react'
import bgImg from '../../assets/login.jpg'
import {useGSAP} from '@gsap/react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {backendUrl} from '../../App'

gsap.registerPlugin(ScrollTrigger)

export default function login() {

    const navigate = useNavigate();

    const [isEmail, setIsEmail] = useState("");
    const [isPassword, setIsPassword] = useState("");

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setIsEmail(email);
    }

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setIsPassword(password);
    }

    const handleOnKeyDown = (e) => {
        if(e.key == "Enter"){
            handleLogin();
        }
    }

    const handleLogin = async () => {
        //handle login logic here
        try {
            const details = {
                email : isEmail,
                password : isPassword
            }
            const res = await axios.post(backendUrl+'/api/login/admin', {email : isEmail, password : isPassword});
            if(res.data.success){
                //login successful
                console.log(res.data.message);

                const now = Date.now();
                localStorage.setItem('expired',now + 6*60*60*1000);
                localStorage.setItem('token' , res.data.token);

                navigate('/admin/dashboard');
                

            }else{
                console.log(res.data.message);

            }

        } catch (error){
            console.log("The outter try-catch error")
            console.log(backendUrl)
            console.log(error);
        }
    }

    useGSAP( () => {
            const tl = gsap.timeline();
            tl.from('.container', {
                opacity: 0,
                duration: 1,
                ease: 'expoScale',
            })
            tl.from('.on-top', {
                opacity: 0,
                scale: 0.8,
                duration: 0.75,
                ease: 'expoScale',
            })
    
        })

    return (
    <div className='container h-screen w-full flex flex-row items-center justify-center relative'>
        {/* image side */}
        <div className='h-full w-6/10'>
            <img src={bgImg} alt='login' className='h-screen w-full object-cover'/>
        </div>
        <div className='h-full w-4/10 bg-gray-400'></div>

        {/* the upper login card */}
        <div className='on-top h-8/10 w-6/10 flex flex-row items-center bg-transparent rounded-2xl absolute top-1/10 left-2/10'>
            <div id='login-card-left' className='h-full w-1/2 bg-transparent flex flex-col items-center justify-center p-8'>
                <div className='font-bold text-5xl text-center overflow-hidden text-white'><h1 className='overflow-hidden'>WELCOME <br/> ADMIN</h1></div>
            </div>
            <div className='h-full w-1/2 bg-white montserrat text-black flex flex-col items-center justify-center gap-6 p-2'>
                <div><h2 className='overflow-hidden text-4xl font-bold'>ENTER DETAILS</h2></div>
                <div><input onChange={handleEmailChange} value={isEmail} className='h-3 w-[25vw] p-4 outline-none border-2 rounded-2xl' type="email" placeholder='Enter your Email'/></div>
                <div><input onKeyDown={handleOnKeyDown} onChange={handlePasswordChange} value={isPassword} className='h-3 w-[25vw] p-4 outline-none border-2 rounded-2xl' type="password" placeholder='Enter your Password'/></div>
                <div><button onClick={handleLogin} className='h-3 w-[25vw] p-6 rounded-2xl bg-green-400 text-white font-bold overflow-hidden text-center flex flex-col justify-center cursor-pointer items-center'>Login</button></div>
            </div>
        </div>
    </div>
    )
}
