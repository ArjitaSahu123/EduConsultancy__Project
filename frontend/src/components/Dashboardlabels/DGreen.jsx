import React from 'react'
import plane from "../../assets/plane.png"

const DGreen = () => {
  return (
    <div className='bg-green flex justify-center items-center gap-10 p-5  w-[360px]'>
    <div className='bg-[#FFFFFF] w-14 h-14 flex justify-center items-center'>
        <img src={plane} alt="Description" className="w-8 h-13" />
    </div>
    <div>
        <div className='font-semibold'>Upcoming Service Schedules</div>
        <div>2,600 Courses</div>
    </div>
</div>
  )
}

export default DGreen