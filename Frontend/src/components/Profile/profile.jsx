import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.js";
import {
    signOut,
} from "firebase/auth";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const Profile = () => {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        jobtitle: "",
        bio: "",
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loadingUser, setLoadingUser] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("user_token");

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleUpdate = (e) => {
        console.log("user contents->")
        console.log(user)
        e.preventDefault();
        axios
            .put(`${API_ENDPOINT}/users`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => alert("Profile updated successfully!"))
            .catch((err) => alert("Failed to update profile."));
    };

    const deleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account?")) return;

        try {
            const token = localStorage.getItem("user_token");
            await axios.delete(`${API_ENDPOINT}/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (auth.currentUser) {
                // Sign out the user from Firebase
                await signOut(auth);
                console.log("User signed out from Firebase.");
            }
            // If no Firebase user is logged in, handle normal JWT-based logout
            console.log("User signed out from normal auth.");
            localStorage.removeItem("user_token"); // Remove JWT token from localStorage
            sessionStorage.removeItem("user_token"); // Remove JWT token from sessionStorage

            // After logout, navigate to the login page
            navigate("/login");
            alert("Account deleted successfully.");
        } catch (err) {
            console.error("Delete Account Error:", err);
            alert("Failed to delete account.");
        }
    };

    // Get token and check authentication
    useEffect(() => {
        const token = localStorage.getItem("user_token");
        if (token) {
            setIsAuthenticated(true);
            fetchUser(token);
            console.log(user)
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
            console.log(res.data)
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

    return (
        <div>
            <div>
                <h2>Profile</h2>
                <form onSubmit={handleUpdate}>
                    <input name="firstname" value={formData.firstname} onChange={handleChange} />
                    <input name="lastname" value={formData.lastname} onChange={handleChange} />
                    <input name="jobtitle" value={formData.jobtitle} onChange={handleChange} />
                    <textarea name="bio" value={formData.bio} onChange={handleChange} />
                    <button type="submit">Update</button>
                </form>
            </div>
            <div>
                <button onClick={deleteAccount}>
                    DELETE ACCOUNT
                </button>
            </div>
        </div>
    );
};

export default Profile;