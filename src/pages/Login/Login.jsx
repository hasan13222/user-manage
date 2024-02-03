import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "./Login.css";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const { setUser, setLoading } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.user_email.value;
    const password = e.target.user_password.value;

    axios({
      method: "post",
      url: "http://localhost:5000/login",
      data: { email, password },
      withCredentials: true,
    }).then((res) => {
      if (res.data?.success === true) {
        setLoginError("");
        setUser(res.data);
        setLoading(false)
        navigate(`${location?.state ? location?.state : "/"}`);
      } else {
        setUser(null);
        setLoading(false);
        setLoginError(res.data.message);
      }
    });
  };
  return (
    <>
      <div className="container-fluid login_full">
        <div className="container login">
          <h2>User Login</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="user_email" placeholder="Email" />
            <input
              type="password"
              name="user_password"
              placeholder="PassWord"
            />
            {loginError && <p className="warning">{loginError}</p>}

            <input type="submit" value="Login" />
          </form>
          <p>
            Didn&apos;t Signed Up? Go to{" "}
            <Link
              style={{
                textDecoration: "underline",
                fontSize: "20px",
                color: "#1b71ac",
                fontWeight: "bold",
              }}
              to={"/signup"}
            >
              SignUp
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
