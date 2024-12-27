import React from 'react'
import gradcap from '../../assets/gradcap.png'
import facebook from "../../assets/faceb.png"
import youtube from '../../assets/Youtube.png'
import twitter from "../../assets/Twitter.png"
import instagram from "../../assets/Instragarm.png"
import linkedin from "../../assets/Linkedin.png"
const Footer = () => {
    return (
        <div className='bg-[#1D2026] text-white h-[1/2] flex justify-between items-center p-20'>
            <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-2'>
                <div className="bg-[#FF6636] h-[60px] w-[60px] flex justify-center items-center rounded-xl logoshadow">
                    <img src={gradcap} alt="Pie Chart" className="w-10 h-8" />
                </div>
                    <div className='font-semibold text-3xl'>Edu-Consultancy</div>
                </div>
                <div>   
                <div>Aliquam rhoncus ligula est, non pulvinar elit </div>
                <div>convallis nec. Donec mattis odio at.</div>
                </div>
             
                <div className='flex gap-3'>
                    <div className='h-14 w-14 bg-[#363B47] flex justify-center items-center'><img src={facebook} alt="Logo" className="h-[24px] w-[12px]" /></div>
                    <div className='h-14 w-14 bg-[#363B47] flex justify-center items-center'><img src={instagram} alt="Logo" className="h-[24px] w-[24px]" /></div>
                    <div className='h-14 w-14 bg-[#363B47] flex justify-center items-center'><img src={linkedin} alt="Logo" className="h-[24px] w-[24px]" /></div>
                    <div className='h-14 w-14 bg-[#363B47] flex justify-center items-center'><img src={twitter} alt="Logo" className="h-[24px] w-[24px]" /></div>
                    <div className='h-14 w-14 bg-[#363B47] flex justify-center items-center'><img src={youtube} alt="Logo" className="h-[24px] w-[30px]" /></div>
                </div>
            </div>

            <div className='flex flex-col gap-3'>
            <div>
            <div className='font-semibold text-3xl'>Start learning with 67.1k</div>
            <div className='font-semibold text-3xl'>students around the world.</div>
            </div>
           
                <div className='flex gap-5'>
                    <button className="bg-[#FF6636] btnhover text-white  w-54 font-bold py-2 px-4 rounded-lg">
                        Join the Family
                    </button>
                    <button className="bg-[#363B47] btnhover text-white  w-54 font-bold py-2 px-4 rounded-lg">
                        Browse All Courses
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Footer