import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Utilities/Navbar'
import BRed from './Biglabels/BRed';
import BPurple from './Biglabels/BPurple';
import BGreen from './Biglabels/BGreen';
import BOrange from './Biglabels/BOrange';
import Pricingcard from './Utilities/Pricingcarddetails';
import Footer from './Utilities/Footer';
import Testimonials from './Utilities/Testimonials';

const LandingPage = () => {
    return (
        <div className="max-w-7xl h-screen mx-auto">
            <Navbar />

            <div className="hero flex h-[41%] justify-center">

                <div className="w-1/2 flex flex-col p-16 justify-center">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        Learn with expert anytime anywhere
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Our mission is to help people to find the best course online and
                        learn with expert anytime, anywhere.
                    </p>
                    <Link to="/signup">
                        <button className="bg-orange btnhover text-white  w-40 font-bold py-2 px-4 rounded-lg">
                            Create Account
                        </button>
                    </Link>

                </div>

                <div className="parallelogram w-1/2">

                </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <div className='font-semibold text-4xl m-14'>
                    Browse Top Category
                </div>



                <div className='flex gap-5'>
                    <BRed />
                    <BPurple />
                    <BGreen />
                    <BOrange />
                </div>
            </div>

            <div className='flex flex-col justify-center items-center h-full'>
                <section id='about' className='flex flex-col justify-center items-center'>
                    <div className='font-semibold text-5xl mt-10'>
                        About Us
                    </div>
                    <div className='h-2 w-1/4 bg-[#FF6636] m-10 rounded-full'></div>
                    <div className='flex flex-col justify-center item gap-10 w-3/4 mt-10'>
                        <div className='leading-loose'>
                            At Edu Consultancy, we are dedicated to transforming educational institutions through expert consultancy services. With years of experience and a deep understanding of the education sector, our team is committed to providing tailored strategies that drive academic success, operational efficiency, and institutional growth. We work closely with schools, colleges, and universities to understand their specific needs, offering customized solutions that foster improvement and innovation at every level.
                        </div>
                        <div className='leading-loose'>
                            Our approach is built on collaboration and continuous improvement. We believe in creating long-lasting partnerships with our clients, supporting them through every stage of their journey. From curriculum development and staff training to operational optimization and student engagement, we offer comprehensive services that help institutions thrive in a dynamic educational landscape. With Edu-Consultancy as your trusted partner, you can achieve sustainable growth and a brighter future for your institution.
                        </div>
                    </div>
                </section>

            </div>
            <hr />
            <section id='pricing' className='flex flex-col justify-center items-center mt-60'>
                <div className='flex flex-col justify-center items-center mt-5 h-full'>

                    <div className='font-semibold text-5xl'>
                        Pricing
                    </div>
                    <div className='h-2 w-1/4 bg-[#FF6636] m-10 rounded-full'></div>
                    <Pricingcard />
                </div>
            </section>


            <div className='flex justify-center items-center gap-10 mt-20'>
                <div className="line w-full"></div>
                <div className='text-3xl'>TESTIMONIALS</div>
                <div className="line w-full"></div>
            </div>
            <div className="testimonial-section w-full flex justify-center items-center py-8">
                <Testimonials />
            </div>

            <div className='mt-56'>
                <Footer />
            </div>
        </div>
    )
}

export default LandingPage