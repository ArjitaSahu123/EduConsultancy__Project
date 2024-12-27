import React, { useEffect, useState } from 'react';
import { getFeedbacks } from '../../services/feedback-service';
import comma from "../../assets/comma.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Testimonials = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const loadFeedbacks = async () => {
            try {
                setLoading(true);
                const data = await getFeedbacks();
                setFeedbacks(data);
            } catch (err) {
                setError(err.message || 'Failed to load testimonials');
            } finally {
                setLoading(false);
            }
        };
        loadFeedbacks();
    }, []);

    useEffect(() => {

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [feedbacks]);

    if (loading) {
        return <div className="text-center py-10">Loading testimonials...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="relative w-full max-w-3xl mx-auto mt-20">
            {feedbacks.length > 0 ? (
                <div className="overflow-hidden">
                    <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {feedbacks.map((feedback) => (
                            <div key={feedback.feedback_id} className="w-full flex-shrink-0">
                                {/* Top Div */}
                                <div className="bg-black text-white text-center p-4 z-20 flex justify-between items-center relative -mb-10 w-1/2">
                                    <div className="text-lg">{feedback.name || 'Anonymous'}</div>
                                    <div className="flex flex-col justify-center items-center gap-2 scale-90">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, index) => (
                                                <FontAwesomeIcon
                                                    key={index}
                                                    icon={faStar}
                                                    className="text-yellow-500"
                                                />
                                            ))}
                                        </div>

                                        <div className="flex justify-center items-center gap-1">
                                            <div className="bg-white p-3 w-7 h-7 rounded-full flex justify-center items-center">
                                                <FontAwesomeIcon icon={faThumbsUp} className="text-black" />
                                            </div>
                                            <div className="font-semibold">Testimonials</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Middle Div */}
                                <div className="bg-white text-black py-20 px-10 shadow-md m-0 relative z-10">
                                    {feedback.message}
                                </div>

                                {/* Bottom Div */}
                                <div className="bg-yellow-500 p-4 z-20 w-28 h-30 relative -mt-10">
                                    <img src={comma} alt="Comma" className="w-16 h-30" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-10">No testimonials available</div>
            )}

            {/* Bullet pointers at the bottom */}
            <div className="flex justify-center mt-5 space-x-2">
                {feedbacks.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full bg-gray-500 cursor-pointer transition-all duration-300 ${index === currentIndex ? 'bg-blue-500' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
