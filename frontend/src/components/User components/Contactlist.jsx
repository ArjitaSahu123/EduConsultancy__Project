import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../services/user-service";
import { getContactsByUserId } from "../../services/contact-service";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Contactlist = () => {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchContacts = async () => {
        try {
            const userDetails = await getUserDetails();
            const userId = userDetails.userId;

            const fetchedContacts = await getContactsByUserId(userId);
            setContacts(fetchedContacts);
        } catch (error) {
            toast.error("Failed to fetch contacts");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRowClick = (contactId) => {
        navigate(`/contacts/${contactId}`);
    };

    const formatDate = (date) => {
        if (new Date(date).getTime() === 0) {
            return "--";
        }
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString("en-GB", options);
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="bg-[white] p-10 gap-5 inline-block rounded-3xl ml-10 mb-10 mr-0 w-[70%]">
            <div>
                <div className="font-semibold text-lg">Your Contacts</div>
                <div className="text-[#737791]">Find all your contacts here</div>
            </div>
            <div className="overflow-x-auto mt-10">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm">
                            <th className="py-2 px-4 border-b">#</th>
                            <th className="py-2 px-4 border-b">Subject</th>
                            <th className="py-2 px-4 border-b">Created At</th>
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
                                            <Skeleton width={120} />
                                        </td>
                                    </tr>
                                ))
                            : contacts.length > 0
                                ? contacts.map((contact) => (
                                    <tr
                                        key={contact.contactId}
                                        onClick={() => handleRowClick(contact.contactId)}
                                        className="cursor-pointer hover:bg-gray-200 text-sm"
                                    >
                                        <td className="py-2 px-4 border-b">{contact.contactId}</td>
                                        <td className="py-2 px-4 border-b">{contact.subject}</td>
                                        <td className="py-2 px-4 border-b">
                                            {formatDate(contact.createdAt)}
                                        </td>
                                    </tr>
                                ))
                                : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">
                                            No contacts found.
                                        </td>
                                    </tr>
                                )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Contactlist;
