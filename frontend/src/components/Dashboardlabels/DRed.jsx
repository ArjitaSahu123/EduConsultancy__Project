import React from 'react'
import fullplane from "../../assets/fullplane.png"


const DRed = () => {
  return (
    <div className='bg-red flex justify-center items-center gap-10 p-5  w-[360px]'>
    <div className='bg-[#FFFFFF] w-14 h-14 flex justify-center items-center'>
        <img src={fullplane} alt="Description" className="w-8 h-13" />
    </div>
    <div>
        <div className='font-semibold'>TAT Corssed Service Schedules</div>
        <div>2,600 Courses</div>
    </div>
</div>
  )
}

export default DRed