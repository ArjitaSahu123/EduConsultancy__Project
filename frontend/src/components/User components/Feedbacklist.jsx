import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { getUserDetails } from "../../services/user-service";
import { getFeedbacksByUserId } from "../../services/feedback-service";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Feedbacklist = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); 

    const fetchFeedbacks = async () => {
        try {
            const userDetails = await getUserDetails();
            const userId = userDetails.userId;

            const fetchedFeedbacks = await getFeedbacksByUserId(userId);
            setFeedbacks(fetchedFeedbacks);
        } catch (error) {
            toast.error("Failed to fetch feedbacks");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRowClick = (feedbackId) => {
        navigate(`/feedbacks/${feedbackId}`); 
    };

    const formatDate = (date) => {
        if (new Date(date).getTime() === 0) {
            return "--";
        }
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString("en-GB", options);
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    return (
        <div className="bg-[white] p-10 gap-5 inline-block rounded-3xl mt-10 ml-10 mb-10 mr-0 w-[70%]">
            <div>
                <div className="font-semibold text-lg">Your feedbacks</div>
                <div className="text-[#737791]">Find all your feedbacks here</div>
            </div>
            <div className="overflow-x-auto mt-10">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm">
                            <th className="py-2 px-4 border-b">#</th>
                            <th className="py-2 px-4 border-b">Message</th>
                            <th className="py-2 px-4 border-b">Sent At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading
                            ? Array(5)
                                  .fill()
                                  .map((_, index) => (
                                      <tr key={index}>
                                          <td className="py-2 px-4 border-b">
                                              <Skeleton width={40} />
                                          </td>
                                          <td className="py-2 px-4 border-b">
                                              <Skeleton width={100} />
                                          </td>
                                          <td className="py-2 px-4 border-b">
                                              <Skeleton width={150} />
                                          </td>
                                          <td className="py-2 px-4 border-b">
                                              <Skeleton width={100} />
                                          </td>
                                          <td className="py-2 px-4 border-b">
                                              <Skeleton width={60} />
                                          </td>
                                          <td className="py-2 px-4 border-b">
                                              <Skeleton width={120} />
                                          </td>
                                      </tr>
                                  ))
                            : feedbacks.length > 0
                            ? feedbacks.map((feedback) => (
                                  <tr
                                      key={feedback.feedbackId}
                                      onClick={() => handleRowClick(feedback.feedbackId)}
                                      className="cursor-pointer hover:bg-gray-200 text-sm"
                                  >
                                      <td className="py-2 px-4 border-b">{feedback.feedbackId}</td>           
                                      <td className="py-2 px-4 border-b">
                                          {feedback.message.length > 50
                                              ? `${feedback.message.slice(0, 50)}...`
                                              : feedback.message}
                                      </td>                            
                                      <td className="py-2 px-4 border-b">
                                          {formatDate(feedback.createdAt)}
                                      </td>
                                  </tr>
                              ))
                            : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No feedbacks found.
                                    </td>
                                </tr>
                              )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Feedbacklist;
