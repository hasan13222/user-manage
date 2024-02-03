import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify"

const EditUser = () => {
    const [editError, setEditError] = useState("");

    const notify = () => toast("Your Info Updated Successfully");

  const handleSubmit = (e) => {
    e.preventDefault();

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
            userName,
            userAge,
            proflePhoto: data.data.data.display_url
        }
        axios({
            method: "patch",
            url: "http://localhost:5000/user-info",
            data: userInfo,
            withCredentials: true,
          })
          .then((res) => {
          if (res.data?.success === false) {
            setEditError(res.data.message)
          } else {
            notify();
          }
        });
      });
  };
  return (
    <>
        <div className="container-fluid signup_full">
        <div className="container signup">
          <h2>Update your profile</h2>
          <form onSubmit={handleSubmit}>
            <input
              required
              type="text"
              name="user_name"
              placeholder="Full Name"
            />
            <input type="text" name="age" placeholder="Age" />
            <div className="input_item d-flex flex-column gap-2">
              <label htmlFor="profile_image">Upload Profile Photo</label>
              <input required type="file" name="profile_image" />
            </div>
            
            {editError && <p className="warning">{editError}</p>}

            <input type="submit" value="Update" />
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default EditUser