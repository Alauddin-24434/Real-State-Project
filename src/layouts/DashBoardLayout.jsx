import { Outlet } from "react-router-dom";

import Container from "../Components/Shared/Container";
import Sidebar from "../Components/Dashboard/Sidebar/Sidebar";

// -------dash board


const DashBoardLayout = () => {
    return (
        <Container>
            
            <div className="relative min-h-screen md:flex">
            {/* sidebar componant  */}
            <Sidebar/>
            <div className='flex-1 md:ml-44'>
                <div className='p-5'>
                    {/* Outlet for dynamic contents */}
                    <Outlet/>
                </div>
            </div>
        </div>
        </Container>
    );
};

export default DashBoardLayout;