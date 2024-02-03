import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignUp = () => {
  const [signupError, setSignupError] = useState("");

  const notify = () => toast("You Signed Up Successfully");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.user_email.value;
    const password = e.target.user_password.value;
    const userName = e.target.user_name.value;
    const userAge = e.target.age.value;

    const profileImg = e.target.profile_image.files[0];
    const dataImg = { image: profileImg };

    axios
      .post(
        "https://api.imgbb.com/1/upload?key=787a92272c8fe84458fd69331f72c734",
        dataImg,
        {
          headers: { "content-Type": "multipart/form-data" },
        }
      )
      .then((data) => {
        const userInfo = {
            email,
            password,
            userName,
            userAge,
            proflePhoto: data.data.data.display_url
        }
        axios.post("http://localhost:5000/signup", userInfo).then((res) => {
          if (res.data?.success === false) {
            setSignupError(res.data.message)
          } else {
            notify();
            navigate("/login");
          }
        });
      });
  };
  return (
    <>
      <div className="container-fluid signup_full">
        <div className="container signup">
          <h2>User Registration</h2>
          <form onSubmit={handleSubmit}>
            <input
              required
              type="text"
              name="user_name"
              placeholder="Full Name"
            />
            <input required type="email" name="user_email" placeholder="Email" />
            <input type="text" name="age" placeholder="Age" />
            <div className="input_item d-flex flex-column gap-2">
              <label htmlFor="profile_image">Upload Profile Photo</label>
              <input required type="file" name="profile_image" />
            </div>
            <input
              pattern="^(?=.*[A-Z])(?=.*[\W_]).{7,}$"
              type="password"
              name="user_password"
              placeholder="PassWord"
            />
            <small>
              Note: Your Password have to be more than 6 characters with a
              capital letter and a special character
            </small>
            {signupError && <p className="warning">{signupError}</p>}

            <input type="submit" value="Register" />
          </form>
          <p>
            Already Signed Up? Go to
            <Link
              style={{
                textDecoration: "underline",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#1b71ac",
              }}
              to={"/login"}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
