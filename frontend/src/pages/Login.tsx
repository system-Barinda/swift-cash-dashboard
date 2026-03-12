import { useState } from "react";
import { login } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login: saveToken } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await login(email, password);

    if (data.token) {

      saveToken(data.token);

      navigate("/dashboard");

    } else {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Login</button>

    </form>
  );
}