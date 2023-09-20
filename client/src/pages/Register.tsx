import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingAnimation from "../components/LoadingAnimation";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    matchPassword: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:4200/register", formData);
      console.log(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        matchPassword: "",
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#F5F5F5]">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-4 rounded-lg flex flex-col gap-2 shadow-lg"
      >
        <h1 className=" text-center font-bold text-2xl">Register an account</h1>

        <span className="w-full flex gap-2">
          <input
            type="text"
            placeholder="firstname"
            className="outline-none px-4 py-2 rounded-lg shadow-inner border-[1px]"
            value={formData.firstname}
            onChange={(e) =>
              setFormData({ ...formData, firstname: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="lastname"
            className="outline-none px-4 py-2 rounded-lg shadow-inner border-[1px]"
            value={formData.lastname}
            onChange={(e) =>
              setFormData({ ...formData, lastname: e.target.value })
            }
          />
        </span>
        <input
          type="text"
          placeholder="email"
          aria-describedby="uidnote"
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

        <input
          type="password"
          placeholder="type your password again"
          className="outline-none px-4 py-2 rounded-lg shadow-inner border-[1px]"
          value={formData.matchPassword}
          onChange={(e) =>
            setFormData({ ...formData, matchPassword: e.target.value })
          }
        />
        <span className="text-sm w-full justify-end flex gap-2 items-center">
          already have an account?
          <Link to="/login" className="text-blue-500 cursor-pointer">
            login
          </Link>
        </span>
        <button
          disabled={loading}
          type="submit"
          className="bg-black text-white rounded-sm px-4 py-2"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              registering
              <LoadingAnimation />
            </span>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}
