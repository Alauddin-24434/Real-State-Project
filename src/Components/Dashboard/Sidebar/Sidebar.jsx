




import Logo from '../Logo'
import useRole from '../../../hooks/useRole'
import HostMenu from './Menu/HostMenu'
import MenuItem from '../MenuItem'
import GuestMenu from './Menu/GuestMenu'
import AdminMenu from './Menu/AdminMenu'
import useAuth from '../../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'



const Sidebar = () => {

 
  const [role] = useRole()
  const navigate=useNavigate()
  console.log('this rol', role?.role)
  const { logOut } = useAuth();

  const handleLogOut=()=>{
    logOut()
    navigate('/login')
    
  }
 
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
      
        
            <Logo />
            
         
       

     
      </div>
      {/* Sidebar */}
      <div
        className='z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform 
           md:translate-x-0  transition duration-200 ease-in-out'
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
          <Link to='/'>
          HOME
          </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* If a user is host */}
           
          
            <nav>
            <MenuItem
         
            label='Profile'
            address='users-profile'
          />

              {/* Menu Items */}
              {
                role?.role === "user" && <GuestMenu />
              }
              {role?.role === "agent" && <HostMenu /> }
              {
                role?.role === "admin" && <AdminMenu />
              }

            </nav>
          </div>
        </div>

        <div>
          <hr />

        
          <button onClick={handleLogOut} className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'>
         

            <span className='mx-4 font-medium'>Logout</span>
           
          </button>
         
        </div>
      </div>
    </>
  )
}

export default Sidebar
