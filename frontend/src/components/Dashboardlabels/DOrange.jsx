import React from 'react'
import fullbell from "../../assets/fullbell.png"
const DOrange = () => {
  return (
    <div className='bg-yellow flex justify-center items-center gap-10 p-5  w-[360px]'>
    <div className='bg-[#FFFFFF] w-14 h-14 flex justify-center items-center'>
        <img src={fullbell} alt="Description" className="w-8 h-13" />
    </div>
    <div>
        <div className='font-semibold'>TAT Crossed Support Requests</div>
        <div>2,600 Courses</div>
    </div>
</div>
  )
}

export default DOrange