import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar/Navbar";

const Main = () => {
    return (
        <div className=""> 
            <Navbar/>
            <div className="main-h-[calc(100vh-68px)] ">
                <Outlet />
            </div>
        </div>
    );
};

export default Main;