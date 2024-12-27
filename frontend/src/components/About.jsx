import React from 'react'
import Nav from './Utilities/Nav'

const About = () => {
    return (
        <div className='max-w-7xl h-screen mx-auto'>
            <Nav />
            <div className='flex flex-col justify-center items-center'>
                <div className='font-semibold text-2xl mt-10'>
                    About Us
                </div>
                <div className='flex flex-col justify-center item gap-10 w-3/4 mt-10'>
                    <div className='leading-loose'>
                        At Edu Consultancy, we are dedicated to transforming educational institutions through expert consultancy services. With years of experience and a deep understanding of the education sector, our team is committed to providing tailored strategies that drive academic success, operational efficiency, and institutional growth. We work closely with schools, colleges, and universities to understand their specific needs, offering customized solutions that foster improvement and innovation at every level.
                    </div>
                    <div className='leading-loose'>
                        Our approach is built on collaboration and continuous improvement. We believe in creating long-lasting partnerships with our clients, supporting them through every stage of their journey. From curriculum development and staff training to operational optimization and student engagement, we offer comprehensive services that help institutions thrive in a dynamic educational landscape. With Edu-Consultancy as your trusted partner, you can achieve sustainable growth and a brighter future for your institution.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About