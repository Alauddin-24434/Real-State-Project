
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';


const UserProfile = () => {
  const { user } = useAuth();
  const [role] = useRole();
 


  

  return (
    <>
      <Helmet>
        <title>User Profile</title>
      </Helmet>

      <div className="container mx-auto max-w-2xl px-4 sm:px-8 py-8">
        <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row justify-between bg-white dark:bg-gray-800 shadow-md rounded-md p-6">
          {user && (
            <div className="flex flex-col gap-4 p-2 justify-center mx-auto items-center mb-4 md:mb-0">
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-32 h-32 rounded-full mr-4 object-cover"
              />
              <div className='flex flex-col items-center'>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {user.displayName}
                </h2>
                <h3 className="text-md text-gray-500 dark:text-gray-300">
                  {user.email} 
                </h3>
                <button className='bg-green-400 text-white  px-2 rounded-md'> <span >{role?.role}</span></button>
              
              </div>
            </div>
          )}
        </div>
      </div>

     
     
    </>
  );
};

export default UserProfile;
