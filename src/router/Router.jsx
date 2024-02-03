import { BrowserRouter, Route, Routes } from "react-router-dom"
import Root from "../pages/Root/Root"
import Home from "../pages/Home/Home"
import SignUp from "../pages/SignUp/SignUp"
import Login from "../pages/Login/Login"
import PrivateRoute from "./PrivateRoute"
import EditUser from "../pages/EditUser/EditUser"

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Root/>} >
                <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
                <Route path="/edit-user" element={<PrivateRoute><EditUser/></PrivateRoute>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/login" element={<Login/>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Router