import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// import { AstrologerLogin } from "@/redux/slice/AstroAuth";
import { Link, useNavigate } from "react-router-dom";
import {
  AstrologerLogin,
  AstrologerProfile,
  GetAllAstrologer,
} from "@/redux/slice/AstroAuth";

const AstroLogin = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.astroAuth);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const fatchAstrologers = async () => {
    await dispatch(GetAllAstrologer()).unwrap();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      username: form.username,
      password: form.password,
    };

    console.log("Login Data from astrologin:", submitData);

    try {
      await dispatch(AstrologerLogin(submitData)).unwrap();
      setTimeout(async () => {
        await dispatch(AstrologerProfile()).unwrap();
      }, 1000);
      toast.success("Login successful!");
      await fatchAstrologers();
      navigate("/dashboard/profile");
      setForm({
        username: "",
        password: "",
      });
    } catch (error) {

      console.log(error)
      if (error?.message) {
        toast.error(error.message );
      } else if (error?.error) {
        toast.error(error.error);
      } else if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error("Login failed. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  const labelStyle = {
    color: "var(--secondary)",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <section>
      <div className="container">
        <div className="max-w-md mb-10 mx-auto p-6 border border-black rounded-lg mt-10">
          <h2 className="text-2xl text-center mb-6">Astrologer Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label style={labelStyle}>Username</Label>
              <Input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                placeholder="Enter your username"
              />
            </div>

            <div>
              <Label style={labelStyle}>Password</Label>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            <div className="text-right cursor-pointer">
              <span
                onClick={() => {
                  navigate("/forgot-password-astro", {
                    state: { type: "astro" },
                  });
                }}
                className="text-orange-600 text-sm hover:underline"
              >
                Forgot Password?
              </span>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <Link
                to="/astro-register"
                className="text-orange-600 hover:underline"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AstroLogin;
