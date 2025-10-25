import { useState } from "react";
import api from "../api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", form);
      setMessage("✅ Registered successfully!");
      console.log(res.data);
    } catch (error) {
      setMessage("❌ Error: " + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-6">
      <h2 className="text-xl font-bold">Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit" className="bg-blue-500 text-white p-2">Sign Up</button>
      <p>{message}</p>
    </form>
  );
}

export default Register;
