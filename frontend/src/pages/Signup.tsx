import { useState } from "react";
import { signup } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await signup(email, password);

    alert(data.message);

    navigate("/login");
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

      <button>Sign Up</button>

    </form>
  );
}