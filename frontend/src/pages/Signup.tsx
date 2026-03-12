import { useState } from "react";
import { signup } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const data = await signup(email, password);

      alert(data.message);

      navigate("/login");

    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <div>

      <h2>Create Account</h2>

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

        <button type="submit">Sign Up</button>

      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>

    </div>
  );
}