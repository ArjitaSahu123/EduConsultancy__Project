import React from 'react'
import Pricingcard from './Utilities/Pricingcard'
import Nav from './Utilities/Nav'

const Pricing = () => {
    return (
        <div className="max-w-7xl h-screen mx-auto">

            <Nav />
            <div className='flex'>
                <div className='w-full'>
                    <div className='font-semibold text-2xl mt-10'>Pricing</div>
                    <div className='leading-loose'>Choose the plan that fits your needs and start learning today. Our flexible pricing ensures everyone can access expert guidance at affordable rates.</div>
                    <div className='mt-6'>

                        <Pricingcard />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing