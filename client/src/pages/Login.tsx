import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingAnimation from "../components/LoadingAnimation";
import TokenStore from "../utils/TokenStore";

export default function Login() {
  const navigate = useNavigate();
  const setToken = TokenStore((state) => state.setToken);
  const setUserID = TokenStore((state) => state.setUserID);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:4200/login", formData);
      console.log(res.data);
      setToken(res.data.token);
      setUserID(res.data.id);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#F5F5F5]">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-4 rounded-lg flex flex-col gap-2 shadow-lg"
      >
        <h1 className=" text-center font-bold text-2xl">Login your account</h1>
        <input
          type="text"
          placeholder="email"
          className="outline-none px-4 py-2 rounded-lg shadow-inner border-[1px]"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          className="outline-none px-4 py-2 rounded-lg shadow-inner border-[1px]"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <span className="text-sm w-full justify-end flex gap-2 items-center">
          Don't have an account?
          <Link to="/register" className="text-blue-500 cursor-pointer">
            register
          </Link>
        </span>
        <button
          disabled={loading}
          type="submit"
          className="bg-black text-white rounded-md px-4 py-2"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              logging in
              <LoadingAnimation />
            </span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
