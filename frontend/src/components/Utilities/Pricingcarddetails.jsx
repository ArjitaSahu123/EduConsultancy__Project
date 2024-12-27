import React from 'react'
import { useNavigate } from 'react-router-dom'; 
import check from '../../assets/check.png';
import cross from '../../assets/cross.png';

const Pricingcarddetails = () => {
    const navigate = useNavigate(); 
    const plans = [
        {
            title: 'Free',
            price: '0',
            description:
                'Let top creative talent come to you by posting your job listing on #1 Design Jobs Board.',
            features: [
                { text: 'Online Guidance', icon: check },
                { text: 'Online Doubt Clear', icon: check },
                { text: 'No Pro Benefits', icon: cross },
                { text: 'No Premium Benefits', icon: cross },
            ],
        },
        {
            title: 'Java Core',
            price: '200',
            description:
                'Easily search and recruit available designers for hire based on your ideal qualifications.',
            features: [
                { text: 'J2SE Individual Tutor', icon: check },
                { text: 'Individual Tutor For each Subject', icon: check },
                { text: 'Weekly Motivational Lecture', icon: cross },
                { text: 'No Offline Content', icon: cross },
            ],
        },
        {
            title: 'Java Core & Advance',
            price: '250',
            description:
                'Get your roles filled faster with unlimited access to Dribbble\'s Job Board and Designer search.',
            features: [
                { text: 'J2SE & J2EE Individual Tutor', icon: check },
                { text: 'Individual Tutor For each Subject', icon: check },
                { text: 'Weekly Motivational Lecture', icon: check },
                { text: 'No Offline Content', icon: cross },
            ],
        },
        {
            title: 'Premium',
            price: '450',
            description:
                'Get your roles filled faster with unlimited access to Dribbble\'s Job Board and Designer search.',
            features: [
                { text: 'All Pro Benefits', icon: check },
                { text: 'Offline Contents Available', icon: check },
                { text: '24/7 Doubt Clear', icon: check },
                { text: 'Daily Motivational Lecture', icon: check },
            ],
        },
    ];

    return (
        <div className="flex">
            {plans.map((plan, index) => (
                <div
                    key={index}
                    className={`pricingcard flex flex-col gap-10 rounded-3xl ${
                        plan.title === 'Premium' || plan.title === 'Java Core & Advance'
                            ? 'bg-[#060432] text-white'
                            : ''
                    }`}
                >
                    <div className="flex flex-col justify-center items-center gap-5">
                        <div className="font-semibold text-2xl">{plan.title}</div>
                        <div className="font-bold font-roboto text-5xl">₹{plan.price}</div>
                        <div className="text-md">per month</div>
                        <div>
                            <button
                                className="bg-orange btnhover text-white w-40 font-bold py-2 px-4 rounded-lg"
                                onClick={() => navigate('/signup')} // Navigate to /signup
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                    <div className="leading-loose">{plan.description}</div>
                    <div className="flex flex-col gap-4">
                        {plan.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div>
                                    <img src={feature.icon} alt="Description" className="w-5 h-5" />
                                </div>
                                <div className="font-semibold">{feature.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Pricingcarddetails
