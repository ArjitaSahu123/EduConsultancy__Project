import React, { useState, useEffect, useCallback } from 'react';
import { getAllUsers } from '../../services/user-service';
import Adminsidenav from '../Utilities/Adminsidenav';
// import trash from "../../assets/trash-2 3.png";
import UserRole from '../Labels/Userrole';
import AdminRole from '../Labels/Adminrole';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Admintop from "../Utilities/Admintop";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [roleFilter, setRoleFilter] = useState('USER');

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const userData = await getAllUsers();
            setUsers(userData);
        } catch (err) {
            setError(err.message || 'Failed to fetch users.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        setFilteredUsers(users.filter(user => user.role === roleFilter));
    }, [users, roleFilter]);


    // const handleDeleteUser = async (userId) => {
    //     const updatedUsers = users.filter(user => user.userId !== userId);
    //     setUsers(updatedUsers);
    //     setFilteredUsers(
    //         updatedUsers.filter(
    //             user => user.role === roleFilter
    //         )
    //     );

    //     try {
    //         await deleteUser(userId);
    //         alert('User deleted successfully.');
    //     } catch (err) {
    //         alert(`Error deleting the user: ${err.message}`);
    //     }
    // };

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
                        <div className='font-semibold text-lg'>Users Management</div>
                        <div className='text-[#737791]'>Manage your users efficiently</div>
                    </div>

                    <div className="flex gap-4 my-4">
                        {['USER', 'ADMIN'].map(role => (
                            <button
                                key={role}
                                className={`py-2 px-4 rounded-md ${roleFilter === role ? 'bg-dark text-white' : 'bg-gray-200'}`}
                                onClick={() => setRoleFilter(role)}
                            >
                                {role}s
                            </button>
                        ))}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 border-b text-sm text-left">#</th>
                                    <th className="py-2 px-4 border-b text-sm text-left">Name</th>
                                    <th className="py-2 px-4 border-b text-sm text-left">Email</th>
                                    <th className="py-2 px-4 border-b text-sm text-left">Role</th>
                                    <th className="py-2 px-4 border-b text-sm text-left">Created At</th>
                                    <th className="py-2 px-4 border-b text-sm text-left">Updated At</th>
                                    {/* <th className="py-2 px-4 border-b text-sm text-left">Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    // Display skeleton rows when loading
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 border-b text-sm">
                                                <Skeleton width={30} />
                                            </td>
                                            <td className="py-2 px-4 border-b text-sm">
                                                <Skeleton width={150} />
                                            </td>
                                            <td className="py-2 px-4 border-b text-sm">
                                                <Skeleton width={200} />
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                <Skeleton width={100} />
                                            </td>
                                            <td className="py-2 px-4 border-b text-sm">
                                                <Skeleton width={120} />
                                            </td>
                                            <td className="py-2 px-4 border-b text-sm">
                                                <Skeleton width={120} />
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                <Skeleton width={40} height={20} />
                                            </td>
                                        </tr>
                                    ))
                                ) : error ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 text-red-500">{error}</td>
                                    </tr>
                                ) : filteredUsers.length > 0 ? (
                                    filteredUsers.map(user => (
                                        <tr key={user.userId} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 border-b text-sm">{user.userId}</td>
                                            <td className="py-2 px-4 border-b text-sm">{user.name}</td>
                                            <td className="py-2 px-4 border-b text-sm">{user.email}</td>
                                            <td className="py-2 px-4 border-b">
                                                {user.role === 'USER' ? <UserRole /> : <AdminRole />}
                                            </td>
                                            <td className="py-2 px-4 border-b text-sm">{formatDate(user.createdAt)}</td>
                                            <td className="py-2 px-4 border-b text-sm">{formatDate(user.updatedAt)}</td>
                                            {/* <td className="py-2 px-4 border-b">
                                                <button
                                                    className="text-white py-1 px-3 w-full rounded-md"
                                                    onClick={() => handleDeleteUser(user.userId)}
                                                >
                                                    <img src={trash} alt="Delete icon" className="w-6" />
                                                </button>
                                            </td> */}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4">No {roleFilter.toLowerCase()}s found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
