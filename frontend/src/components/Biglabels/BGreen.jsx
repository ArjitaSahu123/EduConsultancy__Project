import React from 'react'
import handshake from '../../assets/handshake.png'
const BGreen = () => {
  return (
    <div className='bg-green flex justify-center items-center gap-10 p-5'>
            <div className='bg-[#FFFFFF] w-14 h-14 flex justify-center items-center'>
                <img src={handshake} alt="Description" className="w-8 h-8" />
            </div>
            <div>
                <div className='font-semibold'>IT & Software</div>
                <div>22,649 Courses</div>
            </div>
        </div>
  )
}

export default BGreen