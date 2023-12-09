import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import useAllAgentAdded from '../../../hooks/useAllAgentAdded';
import toast from 'react-hot-toast';
import axios from 'axios';

const ManageBookings = () => {
  const { data, refetch } = useAllAgentAdded();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(data);
  }, [data]);

  const handleRoleUpdate = async (id, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:5000/houses/update/${id}`, {
        status: newStatus,
      });
      console.log(`Booking status updated to ${newStatus}:`, response.data);
      toast.success(`Booking status updated to ${newStatus}`);
      refetch();
    } catch (error) {
      console.error('Error updating booking status:', error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Bookings</title>
      </Helmet>

      <div className='container mx-auto w-full sm:px-8'>
        <div className='sm:-mx-8 sm:px-8 py-4 overflow-x-auto'>
          <div className='rounded-lg overflow-hidden shadow-lg'>
            <table className='min-w-full bg-white'>
              <thead>
                <tr>
                  <th className='py-4 px-6 bg-gray-300 text-gray-700 font-bold uppercase text-sm'>title</th>
                  <th className='py-4 px-6 bg-gray-300 text-gray-700 font-bold uppercase text-sm'>location</th>
                  <th className='py-4 px-6 bg-gray-300 text-gray-700 font-bold uppercase text-sm'>agent info</th>
                  <th className='py-4 px-9  bg-gray-300 text-gray-700 font-bold uppercase text-sm'>range</th>
                  <th className='py-4 px-6 bg-gray-300 text-gray-700 font-bold uppercase text-sm'>status</th>
                  <th className='py-4 px-6 bg-gray-300 text-gray-700 font-bold uppercase text-sm'>Verify</th>
                  <th className='py-4 px-6 bg-gray-300 text-gray-700 font-bold uppercase text-sm'>Rejected</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map((booking) => (
                  <tr key={booking?._id} className='text-sm border-b border-gray-200'>
                    <td className='py-4 px-6 '>{booking?.title}</td>
                    <td className='py-4 px-6  '>{booking?.location}</td>

                    <td className='py-4 px-6'>
                      <div>
                        <p className='font-semibold'>{booking?.agent?.name}</p>
                        <p>{booking?.agent?.email}</p>
                      </div>
                    </td>
                    <td className=' p-4 '>
                      ${booking?.frange} - ${booking?.trange}
                    </td>
                    <td className='py-4 px-6 '>{booking?.status}</td>
                    <td className='py-4 px-6 '>
                      <button
                        className={`bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded-full ${booking?.status === 'Verified' ? 'hidden' : ''
                          }`}
                        onClick={() => handleRoleUpdate(booking._id, 'Verified')}
                      >
                        Verify
                      </button>



                    </td>
                    <td className='py-4 px-6 border-b border-gray-300'>

                      <button
                        className={`bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-full ${booking?.status === 'Rejected' ? 'hidden' : ''
                          }`}
                        onClick={() => handleRoleUpdate(booking._id, 'Rejected')}
                      >
                        Reject
                      </button>

                      {booking?.status === 'Rejected' && (
                        <button className='bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-full'>
                          Rejected
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageBookings;
