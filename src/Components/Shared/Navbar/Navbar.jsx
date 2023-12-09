

import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../assets/images/logo.png'

import Container from "../Container";
const Navbar = () => {
  const { user, logOut } = useAuth();

  return (
    <Container>
      <nav className="bg-gray-300 p-4 ">
        <div className="container mx-auto  md:flex md:justify-between items-center">
          <Link to="/" className="text-red-400 text-lg font-bold">
           <img src={logo} className='w-12 h-12' alt="" />
          </Link>

          {/* small screen */}




          {/* Navigation Links for Medium and Larger Screens */}
          <div className=" flex sm:text-xs text-red-400 md:text-lg items-center">
            <Link to="/" className=" mx-4">
              Home
            </Link>
            <Link to="/allProperty" className="mx-4">
              All Property
            </Link>
            <Link to="/dashboard" className=" mx-4">
              Dashboard
            </Link>
           
          </div>

          {/* User Information */}
          <div className="md:flex items-center">
            {user ? (
              <>
                <div className="md:flex sm:block hidden items-center focus:outline-none">
                  <img
                    className="w-10 h-10 rounded-lg mx-2"
                    src={user?.photoURL}
                    alt="Avatar"
                  />
                  <button
                    onClick={logOut}
                    className=" text-red-400 font-bold py-2  md:px-4 rounded"
                  >
                    Logout
                  </button>
                </div>

              </>
            ) : (

              // <span className="flex items-center gap-4">
              //   <Link to={'/signUp'}>
              //     <button
              //       className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              //     >
              //       SignUp
              //     </button>
              //   </Link>
                <Link to={'/login'}>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Login
                  </button>
                </Link>
              

            )}
          </div>
        </div>
      </nav>
    </Container >
  );
};

export default Navbar;
