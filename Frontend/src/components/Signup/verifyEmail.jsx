import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      alert("No token provided");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.post(
          `${API_ENDPOINT}/users/verify-email`,
          { token },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 201 || response.status === 200) {
          localStorage.setItem("user_token", response.data.accessToken);
          navigate("/Chat");
        }
      } catch (err) {
        console.error(err);
        alert(
          "Verification failed: " +
            (err.response?.data?.detail || "Unknown error")
        );
      }
    };

    verifyEmail();
  }, [navigate, searchParams]);

  return <div></div>;
}
