import React from 'react'
import bell from "../../assets/bell.png"
const DPurple = () => {
  return (
    <div className='bg-purple flex justify-center items-center gap-10 p-5 w-[360px]'>
    <div className='bg-[#FFFFFF] w-14 h-14 flex justify-center items-center'>
        <img src={bell} alt="Description" className="w-8 h-13" />
    </div>
    <div>
        <div className='font-semibold'>New Support Requests</div>
        <div>1</div>
    </div>
</div>
  )
}

export default DPurple