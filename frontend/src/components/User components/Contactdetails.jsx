import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getContactById } from '../../services/contact-service';
import Adminsidenav from '../Utilities/Adminsidenav';
import Admintop from '../Utilities/Admintop';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 
import Usersidenav from '../Utilities/Usersidenav';

const Contactdetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const fetchedContact = await getContactById(id);
        setContact(fetchedContact);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  if (loading) {
    return (
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
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!contact) {
    return <div>Contact not found</div>;
  }

  const formatDate = (date) => {
    if (new Date(date).getTime() === 0) {
      return '--';
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="flex justify-between bg-[#F9FAFB] poppins-regular">
      <Usersidenav />
      <div className='w-full'>
        <Admintop />
        <div className='bg-[white] p-10 gap-5 inline-block rounded-3xl m-10 w-[90%]'>
          <div className="flex justify-between items-center pb-5">
            <div className='flex flex-col gap-1'>
              <div className="font-semibold text-lg mb-5">Contact Details</div>
              <div><span className="font-semibold">Name : </span><span>{contact.name}</span></div>
              <div><span className="font-semibold">Email : </span><span>{contact.email}</span></div>
              <div><span className="font-semibold">User : </span><span> {contact.user.name} ({contact.user.email})</span></div>
              <div><span className="font-semibold">Created At : </span><span>{formatDate(contact.createdAt)}</span></div>
              <div><span className="font-semibold">Updated At : </span><span> {formatDate(contact.updatedAt)}</span></div>
            </div>
          </div>
          <div className='line w-full'></div>
          <div className="space-y-4 mt-4 px-20">
            <div className='text-2xl font-semibold'>
              {contact.subject}
            </div>
            <div className='leading-relaxed tracking-wide my-10'>
              {contact.message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactdetails;
