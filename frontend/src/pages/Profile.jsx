import { useEffect, useState } from 'react';
import axios from 'axios';
import profileImage from "../assets/pexels-pashal-337909.jpg";
import Navbar from '../components/Navbar';


const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("No token found. Please log in.");
                    return;
                }

                const response = await axios.get('http://localhost:8000/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load profile.");
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return <div className="text-center text-red-500 mt-4">{error}</div>;
    }

    if (!user) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    return (
        <>
            <Navbar hideButtons={true} />
            <div className="h-screen w-screen flex">
                {/* Left Section (Logo) */}
                <div className="hidden md:flex w-3/7 bg-blue-100 items-center justify-center">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover invert"
                    />
                </div>

                {/* Right Section (Profile Data) */}
                <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-12">
                    <div className="max-w-md w-full">

                        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                            <span className='text-red-400'>Welcome </span>
                            <span className='text-red-900'>{user.name}</span>
                        </h1>

                        {/* Profile Picture */}
                        {user.profilePic && (
                            <div className="flex justify-center mb-6">
                                <img
                                    src={`http://localhost:8000${user.profilePic}`}
                                    alt="Profile"
                                    className="w-40 h-40 rounded-full object-cover border-4 border-red-500"
                                />
                            </div>
                        )}

                        {/* User Details */}
                        <div className="space-y-6 text-lg">
                            <div>
                                <strong className="text-red-700">Name:</strong>
                                <span className="ml-2">{user.name}</span>
                            </div>
                            <div>
                                <strong className="text-red-700">Email:</strong>
                                <span className="ml-2">{user.email}</span>
                            </div>
                            <div>
                                <strong className="text-red-700">Gender:</strong>
                                <span className="ml-2">
                                    {user.gender || "Not specified"}
                                </span>
                            </div>
                            <div>
                                <strong className="text-red-700">Address:</strong>
                                <span className="ml-2">
                                    {user.address || "Not provided"}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
