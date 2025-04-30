import React, { useState } from "react";
import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

function ChangePassword() {
    const [formData, setFormData] = useState({
        old_password: "",
        new_password: "",
    });
    const [message, setMessage] = useState("");
    const token = localStorage.getItem("user_token");

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_ENDPOINT}/users/change-password`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage("Password changed successfully!");
        } catch (err) {
            setMessage("Password change failed.");
        }
    };

    return (
        <div>
            <h2>Change Password</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    name="old_password"
                    placeholder="Old Password"
                    value={formData.old_password}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="new_password"
                    placeholder="New Password"
                    value={formData.new_password}
                    onChange={handleChange}
                />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default ChangePassword;