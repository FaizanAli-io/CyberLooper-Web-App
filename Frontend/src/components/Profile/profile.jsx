import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.js";
import { signOut } from "firebase/auth";
import "./Profile.css";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const Profile = () => {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        jobtitle: "",
        bio: "",
    });

    const [passwordData, setPasswordData] = useState({
        old_password: "",
        new_password: "",
    });

    const [passwordMessage, setPasswordMessage] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loadingUser, setLoadingUser] = useState(true);
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("user_token");

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handlePasswordChange = (e) =>
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_ENDPOINT}/users`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Profile updated successfully!");
        } catch (err) {
            alert("Failed to update profile.");
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_ENDPOINT}/change-password`, passwordData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPasswordMessage("Password changed successfully.");
        } catch (error) {
            setPasswordMessage("Failed to change password.");
        }
    };

    const deleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account?")) return;

        try {
            await axios.delete(`${API_ENDPOINT}/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (auth.currentUser) await signOut(auth);

            localStorage.removeItem("user_token");
            sessionStorage.removeItem("user_token");

            navigate("/login");
            alert("Account deleted successfully.");
        } catch (err) {
            console.error("Delete Account Error:", err);
            alert("Failed to delete account.");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("user_token");
        if (token) {
            setIsAuthenticated(true);
            fetchUser(token);
        } else {
            setIsAuthenticated(false);
            setLoadingUser(false);
        }
    }, []);

    const fetchUser = async (token) => {
        setLoadingUser(true);
        try {
            const res = await axios.get(`${API_ENDPOINT}/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data);
            setFormData({
                firstname: res.data.firstname || "",
                lastname: res.data.lastname || "",
                jobtitle: res.data.jobtitle || "",
                bio: res.data.bio || "",
            });
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setLoadingUser(false);
        }
    };

    const togglePasswordSection = () => {
        setChangePasswordVisible(!changePasswordVisible);
    };

    return (
        <div className="profile-page-container">
            <div className="profile-page-header">
                <h1>Update Your Details, Stay in Control</h1>
                <p>Keep your profile accurate so the Cyberlooper can tailor suggestions to your unique role and work environment!</p>
            </div>

            <div className="profile-page-content">
                <div className="profile-page-form-container">
                    <form onSubmit={handleUpdate} className="profile-page-details-form">
                        <div className="profile-page-input-group-container">
                            <div className="profile-page-input-group">
                                <div className="profile-page-form-field">
                                    <input 
                                        name="firstname" 
                                        value={formData.firstname} 
                                        onChange={handleChange} 
                                        placeholder="First Name" 
                                        className="profile-page-input-field"
                                    />
                                </div>
                                <div className="profile-page-form-field">
                                    <input 
                                        name="lastname" 
                                        value={formData.lastname} 
                                        onChange={handleChange} 
                                        placeholder="Last Name" 
                                        className="profile-page-input-field"
                                    />
                                </div>
                            </div>

                            <div className="profile-page-input-group">
                                <div className="profile-page-form-field">
                                    <input 
                                        name="email" 
                                        value={user.email || ""} 
                                        disabled 
                                        placeholder="Email" 
                                        className="profile-page-input-field"
                                    />
                                </div>
                                <div className="profile-page-form-field">
                                    <input 
                                        name="jobtitle" 
                                        value={formData.jobtitle} 
                                        onChange={handleChange} 
                                        placeholder="Job Title" 
                                        className="profile-page-input-field"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="profile-page-bio-container">
                            <textarea 
                                name="bio" 
                                value={formData.bio} 
                                onChange={handleChange} 
                                placeholder="BIO" 
                                className="profile-page-bio-field"
                            />
                        </div>

                        <div className="profile-page-button-container">
                            <button type="submit" className="profile-page-update-button">Save Changes</button>
                        </div>
                    </form>
                </div>

                <div className="profile-page-security-section">
                    <div className="profile-page-security-header">
                        <h1>Secure Access Made Simple</h1>
                        <p>Your safety is our top priority. Manage your login, password, and additional security measures here</p>
                    </div>

                    <div className="profile-page-password-toggle-container">
                        <div className="profile-page-toggle-header">
                            <h3>Change Password</h3>
                            <p>Keep it fresh—update your password regularly for better protection.</p>
                        </div>
                        <div 
                            className={`profile-page-toggle-switch ${changePasswordVisible ? 'profile-page-toggle-active' : ''}`} 
                            onClick={togglePasswordSection}
                        >
                            <div className="profile-page-toggle-handle"></div>
                        </div>
                    </div>

                    {changePasswordVisible && (
                        <div className="profile-page-password-form-container">
                            {passwordMessage && <p className="profile-page-password-message">{passwordMessage}</p>}
                            <form onSubmit={handlePasswordSubmit} className="profile-page-password-form">
                                <div className="profile-page-password-inputs">
                                    <input
                                        type="password"
                                        name="old_password"
                                        placeholder="Old Password"
                                        value={passwordData.old_password}
                                        onChange={handlePasswordChange}
                                        className="profile-page-password-field"
                                    />
                                    <input
                                        type="password"
                                        name="new_password"
                                        placeholder="New Password"
                                        value={passwordData.new_password}
                                        onChange={handlePasswordChange}
                                        className="profile-page-password-field"
                                    />
                                </div>
                                <button type="submit" className="profile-page-password-button">Update Password</button>
                            </form>
                        </div>
                    )}

                    <div className="profile-page-danger-zone">
                        <h3>Danger Zone</h3>
                        <button onClick={deleteAccount} className="profile-page-delete-button">
                            DELETE ACCOUNT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;