import React, {useState} from 'react'
import { PackageSearch } from 'lucide-react';
import Loader from './Loader';
import axios from 'axios'
import {toast} from 'react-toastify'
import {backendUrl} from '../../App'

export default function Admin() {

    const [isLoading, setIsLoading] = useState(false);
    const [isResponse, setIsResponse] = useState(null);
    const [isDes, setIsDes] = useState("");

    const handleOnChange = (e) => {
        setIsDes(e.target.value);
    }

    const handleOnInput =  (e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    const handleCancle = () => {
        setIsResponse(null)
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

    return (
    <div className='h-auto w-screen flex flex-col bg-black relative' >

        {/* Only visible when the ai is thinking ... */}
        
            {isLoading && <Loader/>}

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
        <div className='h-screen w-full flex flex-col bg-gray-300 z-11'>

        </div>
    </div>
    )
}
