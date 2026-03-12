import { useState } from "react";
import { login } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login: saveToken } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {

      const data = await login(email, password);

      if (data.token) {

        saveToken(data.token);

        navigate("/"); // FIXED

      } else {
        alert("Login failed");
      }

    } catch (error) {

      console.error(error);

      alert("Server error");

    }

  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="email"
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">
        Login
      </button>

    </form>
  );
}