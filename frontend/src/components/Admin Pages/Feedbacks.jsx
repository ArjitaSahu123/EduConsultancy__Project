import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFeedbacks, deleteFeedback } from '../../services/feedback-service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Adminsidenav from '../Utilities/Adminsidenav';
import trash from "../../assets/trash-2 3.png";
import Skeleton from 'react-loading-skeleton'; 
import Admintop from "../Utilities/Admintop";
import Confirmationmodel from '../Utilities/Confirmationmodel'; 

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [feedbackIdToDelete, setFeedbackIdToDelete] = useState(null); 
  const navigate = useNavigate();

  const fetchFeedbacks = async () => {
    try {
      const fetchedFeedbacks = await getFeedbacks();
      setFeedbacks(fetchedFeedbacks);
    } catch (error) {
      toast.error('Failed to fetch feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFeedback = (feedbackId) => {
    setFeedbackIdToDelete(feedbackId); 
    setIsModalOpen(true); 
  };

  const confirmDeleteFeedback = async () => {
    try {
      await deleteFeedback(feedbackIdToDelete);
      setFeedbacks(feedbacks.filter((feedback) => feedback.feedbackId !== feedbackIdToDelete));
      toast.success('Feedback deleted successfully');
    } catch (error) {
      toast.error('Failed to delete feedback');
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleRowClick = (feedbackId) => {
    navigate(`/admin/feedbacks/${feedbackId}`);
  };

  const formatDate = (date) => {
    if (new Date(date).getTime() === 0) {
      return '--';
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  return (
    <div className='flex justify-between bg-[#F9FAFB] poppins-regular'>
      <Adminsidenav />
      <div className='w-full'>
        <Admintop />
        <div className='bg-[white] p-10 gap-5 inline-block rounded-3xl m-10 w-[90%]'>
          <div>
            <div className='font-semibold text-lg'>Feedbacks Management</div>
            <div className='text-[#737791]'>Manage your feedbacks efficiently</div>
          </div>
          <div className="overflow-x-auto mt-10">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm">
                  <th className="py-2 px-4 border-b whitespace-nowrap overflow-hidden text-ellipsis">#</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Message</th>
                  <th className="py-2 px-4 border-b">Phone</th>
                  <th className="py-2 px-4 border-b whitespace-nowrap overflow-hidden text-ellipsis">UID</th>
                  <th className="py-2 px-4 border-b">Created At</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array(5).fill().map((_, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b"><Skeleton width={40} /></td>
                      <td className="py-2 px-4 border-b"><Skeleton width={100} /></td>
                      <td className="py-2 px-4 border-b"><Skeleton width={150} /></td>
                      <td className="py-2 px-4 border-b"><Skeleton width={100} /></td>
                      <td className="py-2 px-4 border-b"><Skeleton width={60} /></td>
                      <td className="py-2 px-4 border-b"><Skeleton width={120} /></td>
                      <td className="py-2 px-4 border-b"><Skeleton width={50} /></td>
                    </tr>
                  ))
                ) : (
                  feedbacks.length > 0 ? (
                    feedbacks.map((feedback) => (
                      <tr
                        key={feedback.feedbackId}
                        onClick={() => handleRowClick(feedback.feedbackId)}
                        className="cursor-pointer hover:bg-gray-200 text-sm"
                      >
                        <td className="py-2 px-4 border-b">{feedback.feedbackId}</td>
                        <td className="py-2 px-4 border-b">{feedback.email}</td>
                        <td className="py-2 px-4 border-b">{feedback.message.length > 50
                          ? `${feedback.message.slice(0, 50)}...`
                          : feedback.message}</td>
                        <td className="py-2 px-4 border-b">{feedback.phone}</td>
                        <td className="py-2 px-4 border-b">{feedback.user?.userId || 'N/A'}</td>
                        <td className="py-2 px-4 border-b">
                          {formatDate(feedback.createdAt)}
                        </td>
                        <td className="py-2 px-4 border-b" onClick={(e) => e.stopPropagation()}>
                          <button
                            className="text-white py-1 px-3 rounded-md"
                            onClick={() => handleDeleteFeedback(feedback.feedbackId)}
                          >
                            <img src={trash} alt="Delete icon" className="w-6" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No feedbacks found.
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Confirmationmodel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeleteFeedback}
        message="Are you sure you want to delete this feedback?"
      />
    </div>
  );
};

export default Feedbacks;
