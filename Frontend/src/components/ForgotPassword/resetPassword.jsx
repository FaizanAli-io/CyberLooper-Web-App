import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      alert("No token provided");
      return;
    }

    const resetPassword = async () => {
      try {
        const response = await axios.post(
          `${API_ENDPOINT}/users/reset-password`,
          { token, new_password: "hello" },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 201 || response.status === 200) {
          alert("Password reset successfully. Login using the new password.")
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        alert(
          "Password Reset Failed: " +
            (err.response?.data?.detail || "Unknown error")
        );
      }
    };

    resetPassword();
  }, [navigate, searchParams]);

  return <div></div>;
}