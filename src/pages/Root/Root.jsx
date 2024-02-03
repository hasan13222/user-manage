import { Outlet } from "react-router-dom"
import Header from "../../allSharedComp/Header"
import Footer from "../../allSharedComp/Footer"

const Root = () => {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Root