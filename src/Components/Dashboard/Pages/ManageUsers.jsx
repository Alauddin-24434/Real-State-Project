import { Helmet } from 'react-helmet-async';
import useAllUsers from '../../../hooks/useAllUsers';
import toast from 'react-hot-toast';
import axios from 'axios';

const ManageUsers = () => {
  const { data: users, refetch } = useAllUsers();

  // Handle user delete
  const handleUserDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${id}`);
      console.log('User deleted successfully:', response.data);
      toast.success('User deleted successfully');
      refetch();
    } catch (error) {
      console.error('Error deleting user:', error.message);
      toast.error(error.message);
    }
  };

  // Handle admin click
  const handleRoleUpdate = async (id, newRole) => {
    try {
      const response = await axios.patch(`http://localhost:5000/users/${id}`, {
        role: newRole,
      });
      console.log(`User role updated to ${newRole}:`, response.data);
      toast.success(`User role updated to ${newRole}`);
      refetch();
    } catch (error) {
      console.error('Error updating user role:', error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <Helmet>
          <title>Manage Users</title>
        </Helmet>
        <div className='py-2'>
          <div className='overflow-x-auto'>
            <div className='bg-gray-100 shadow-md rounded my-6'>
              <table className='min-w-full'>
                <thead>
                  <tr>
                    <th className='py-4 px-6 bg-gray-300 text-gray-700 font-bold uppercase text-sm'>Role</th>
                    <th className='py-4 px-6 bg-gray-300 text-gray-700 font-bold uppercase text-sm'>Name & Email</th>
                    <th className='py-4 px-6 bg-gray-300 text-gray-700 font-bold uppercase text-sm'>Admin</th>
                    <th className='py-4 px-6 bg-gray-300 text-gray-700 font-bold uppercase text-sm'>Agent</th>
                    <th className='py-4 px-6 bg-gray-300 text-gray-700 font-bold uppercase text-sm'>Fraud</th>
                    <th className='py-4 px-6 bg-gray-300 text-gray-700 font-bold uppercase text-sm'>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr key={user._id} className='border-b border-gray-200'>
                      <td className='py-4 px-6'>{user.role}</td>
                      <td className='py-4 px-6'>
                        <div>
                          <p className='font-semibold'>{user.userName}</p>
                          <p>{user.email}</p>
                        </div>
                      </td>
                      <td className='py-4 px-6'>
                        <button className='bg-green-400 text-white px-4 py-2 rounded-full' onClick={() => handleRoleUpdate(user._id, 'admin')}>
                          Admin
                        </button>
                      </td>
                      <td className='py-4 px-6'>
                        <button className='bg-yellow-400 text-white px-4 py-2 rounded-full' onClick={() => handleRoleUpdate(user._id, 'agent')}>
                          Agent
                        </button>
                      </td>
                      <td className='py-4 px-6'>
                        <button className='bg-blue-400 text-white px-4 py-2 rounded-full' onClick={() => handleRoleUpdate(user._id, 'fraud')}>
                          Fraud
                        </button>
                      </td>
                      <td className='py-4 px-6'>
                        <button className='bg-red-400 text-white px-4 py-2 rounded-full' onClick={() => handleUserDelete(user._id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
