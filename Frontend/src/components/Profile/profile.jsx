import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleSignOut } from "../Chat/Chat.jsx";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

function Profile() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        jobtitle: "",
        bio: "",
    });

    const token = localStorage.getItem("user_token");

    useEffect(() => {
        axios
            .get(`${API_ENDPOINT}/users`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setUser(res.data);
                setFormData({
                    firstname: res.data.firstname || "",
                    lastname: res.data.lastname || "",
                    jobtitle: res.data.jobtitle || "",
                    bio: res.data.bio || "",
                });
            })
            .catch((err) => console.error("Failed to fetch profile", err));
    }, []);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleUpdate = (e) => {
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
            await axios.delete(`${API_ENDPOINT}/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // localStorage.removeItem("user_token");
            // navigate("/login");
            alert("Account deleted successfully.");

            // Call sign-out function after successful deletion
            await handleSignOut();
        } catch (err) {
            console.error("Delete Account Error:", err);
            alert("Failed to delete account.");
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
}

export default Profile;