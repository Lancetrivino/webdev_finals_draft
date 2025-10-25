import { useState } from "react";
import api from "../api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      setMessage("✅ Login successful!");
      console.log(res.data);
    } catch (error) {
      setMessage("❌ Error: " + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-6">
      <h2 className="text-xl font-bold">Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit" className="bg-green-500 text-white p-2">Login</button>
      <p>{message}</p>
    </form>
  );
}

export default Login;
