import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFeedbackById } from '../../services/feedback-service';
import Admintop from '../Utilities/Admintop';
import Adminsidenav from '../Utilities/Adminsidenav';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FeedbackDetails = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (date) => {
    if (new Date(date).getTime() === 0) {
      return '--';
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const fetchedFeedback = await getFeedbackById(id);
        setFeedback(fetchedFeedback);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [id]);

  if (loading) return (
    <div className="flex justify-between bg-[#F9FAFB] poppins-regular">
      <Adminsidenav />
      <div className='w-full'>
        <Admintop />
        <div className='bg-[white] p-10 gap-5 inline-block rounded-3xl m-10 w-[90%] h-[80%]'>
          <div className="flex justify-between items-center pb-5">
            <div className="flex flex-col gap-1">
              <div className="font-bold text-3xl mb-5">
                <Skeleton width={200} />
              </div>
              <div>
                <Skeleton width={150} />
              </div>
              <div>
                <Skeleton width={150} />
              </div>
              <div>
                <Skeleton width={200} />
              </div>
              <div>
                <Skeleton width={200} />
              </div>

            </div>
            {/* Skeleton for blog image */}
            <div className="flex my-5 px-20">
              <Skeleton width={300} height={200} />
            </div>
          </div>
          <div className='line'></div>


          {/* Skeleton for blog content */}
          <div className="space-y-4 mt-4 px-20">
            <div className="text-xl">
              <Skeleton width={250} />
            </div>
            <div className="text-xl">
              <Skeleton width={200} />
            </div>
            <div className="text-xl">
              <Skeleton count={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return <div>Error: {error}</div>;

  if (!feedback) return <div>Feedback not found</div>;

  return (
    <div className="flex justify-between bg-[#F9FAFB] poppins-regular">
      <Adminsidenav />
      <div className='w-full'>
        <Admintop />
        <div className='bg-[white] p-10 gap-5 inline-block rounded-3xl m-10 w-[90%]'>
          <div className="flex justify-between items-center border-b-2 pb-5">
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-lg mb-5">Feedback Details</div>
              <div><span className="font-semibold">Name : </span>{feedback.name}</div>
              <div><span className="font-semibold">Email : </span>{feedback.email}</div>
              <div><span className="font-semibold">Phone : </span>{feedback.phone}</div>
              <div><span className="font-semibold">User : </span>{feedback.user.name} ({feedback.user.email})</div>
              <div><span className="font-semibold">Created At : </span>{formatDate(feedback.createdAt)}</div>
              <div><span className="font-semibold">Updated At : </span>{formatDate(feedback.updatedAt)}</div>
            </div>
          </div>

          <div className="space-y-4 mt-4 px-20">
            <div className="leading-relaxed tracking-wide my-10">
              {feedback.message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetails;
