import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getContacts, deleteContact } from '../../services/contact-service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Adminsidenav from '../Utilities/Adminsidenav';
import trash from "../../assets/trash-2 3.png";
import Admintop from '../Utilities/Admintop';
import Skeleton from 'react-loading-skeleton';
import ConfirmationModal from '../Utilities/Confirmationmodel';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      const fetchedContacts = await getContacts();
      setContacts(fetchedContacts);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false); 
    }
  };

  const handleDeleteContact = async () => {
    if (!contactToDelete) return;
    try {
      await deleteContact(contactToDelete);
      setContacts(contacts.filter((contact) => contact.contactId !== contactToDelete));
      toast.success('Contact deleted successfully');
    } catch (error) {
      toast.error('Failed to delete contact');
    } finally {
      setIsModalOpen(false); 
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleRowClick = (contactId) => {
    navigate(`/admin/contacts/${contactId}`);
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
            <div className='font-semibold text-lg'>Contacts Management</div>
            <div className='text-[#737791]'>Manage your contacts efficiently</div>
          </div>

          <div className="overflow-x-auto mt-10">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm">
                  <th className="py-2 px-4 border-b whitespace-nowrap text-sm overflow-hidden text-ellipsis">#</th>
                  <th className="py-2 px-4 border-b text-sm">Email</th>
                  <th className="py-2 px-4 border-b text-sm">Name</th>
                  <th className="py-2 px-4 border-b text-sm">Subject</th>
                  <th className="py-2 px-4 border-b text-sm whitespace-nowrap overflow-hidden text-ellipsis">UID</th>
                  <th className="py-2 px-4 border-b text-sm">Created At</th>
                  <th className="py-2 px-4 border-b text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  // Render Skeleton when loading
                  Array(5).fill().map((_, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">
                        <Skeleton width={50} />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton width={200} />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton width={150} />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton width={100} />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton width={100} />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton width={120} />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton width={80} height={40} />
                      </td>
                    </tr>
                  ))
                ) : (
                  contacts.map((contact) => (
                    <tr
                      key={contact.contactId}
                      onClick={() => handleRowClick(contact.contactId)}
                      className="cursor-pointer hover:bg-gray-200 text-sm"
                    >
                      <td className="py-4 px-4 border-b">{contact.contactId}</td>
                      <td className="py-2 px-4 border-b">{contact.email}</td>
                      <td className="py-2 px-4 border-b">{contact.name}</td>
                      <td className="py-2 px-4 border-b">
                        {contact.subject.length > 50
                          ? `${contact.subject.slice(0, 50)}...`
                          : contact.subject}
                      </td>
                      <td className="py-2 px-4 border-b">{contact.user?.userId || 'N/A'}</td>
                      <td className="py-2 px-4 border-b">
                        {formatDate(contact.createdAt)}
                      </td>
                      <td
                        className="border-b text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className=" text-white py-1 px-3 rounded-md"
                          onClick={() => {
                            setContactToDelete(contact.contactId);
                            setIsModalOpen(true); // Open modal
                          }}
                        >
                          <img src={trash} alt="Delete icon" className="w-6" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
                {contacts.length === 0 && !loading && (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      No contacts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteContact}
        message="Are you sure you want to delete this contact?"
      />
    </div>
  );
};

export default Contacts;
