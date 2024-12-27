import React, { useState, useEffect } from 'react';
import search from '../../assets/search.png';
import userimg from "../../assets/userimg.png";
import { getUserDetails } from '../../services/user-service';  
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 

const Admintop = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await getUserDetails();
                setUser(userDetails);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch user details');
                setLoading(false);
            }
        };    
        fetchUserDetails();
    }, []);  

    if (loading) {
        return (
            <div className='bg-[white] flex w-full gap-1 px-20 py-5 justify-center items-center '>
                <div className='text-4xl poppins-semibold w-[30%]'>Dashboard</div>
                <div className='bg-grey flex justify-start items-center w-[40%] rounded-xl px-5 py-1'>
                    <img src={search} alt='Search icon' className='w-6 h-6' />
                    <input type='text' placeholder='Search here...' className='focus:outline-none h-10 w-96 px-2 bg-grey' />
                </div>
                <div className='w-[30%] flex justify-end'>
                    <div className='flex items-center justify-center gap-5'>
                        <Skeleton circle width={40} height={40} />
                        <div className='flex flex-col'>
                            <Skeleton width={100} />
                            <Skeleton width={70} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='bg-[white] flex w-full gap-1 px-20 py-5 justify-center items-center'>
                <div className='text-4xl poppins-semibold w-[30%]'>Dashboard</div>
                <div className='bg-grey flex justify-start items-center w-[40%] rounded-xl px-5 py-1'>
                    <img src={search} alt='Search icon' className='w-6 h-6' />
                    <input type='text' placeholder='Search here...' className='focus:outline-none h-10 w-96 px-2 bg-grey' />
                </div>
                <div className='w-[30%] flex justify-end'>
                    <div className='flex items-center justify-center gap-5'>
                        <div className='font-semibold'>{error}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-[white] flex w-full gap-1 px-20 py-5 justify-center items-center sticky top-0 z-10'>
            <div className='text-4xl poppins-semibold w-[30%]'>Dashboard</div>
            <div className='bg-grey flex justify-start items-center w-[40%] rounded-xl px-5 py-1'>
                <img src={search} alt='Search icon' className='w-6 h-6' />
                <input type='text' placeholder='Search here...' className='focus:outline-none h-10 w-96 px-2 bg-grey' />
            </div>
            <div className='w-[30%] flex justify-end'>
                <div className='flex items-center justify-center gap-5'>
                    <div>
                        <img src={userimg} alt='userimg' className='w-12' />
                    </div>
                    <div className='flex flex-col'>
                        <div className='font-semibold'>{user.name}</div>
                        <div>{user.role}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admintop;
