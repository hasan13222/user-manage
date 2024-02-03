import { useContext } from "react"
import { AuthContext } from "../Provider/AuthProvider"

const Home = () => {
    const {user: userInfo} = useContext(AuthContext);
  return (
    <>
        <div className="container-fluid dashboard">
            <div className="container dashboard__cont">
                <div className="sidebar">
                    <ul>
                        <li><a href="/">View Details</a></li>
                        <li><a href="/edit-user">Edit Details</a></li>
                    </ul>
                </div>
                <div className="mainbar">
                    <ul>
                        <li>
                            <img src={userInfo?.proflePhoto} alt="profile photo" />
                        </li>
                        <li>Name: {userInfo?.userName}</li>
                        <li>Email: {userInfo?.email}</li>
                        <li>Age: {userInfo?.userAge}</li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home