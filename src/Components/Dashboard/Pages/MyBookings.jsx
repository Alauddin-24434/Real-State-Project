import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import toast from 'react-hot-toast';
import useUserBooking from '../../../hooks/useUserBooking';
import { useState } from 'react';
import OfferForm from './OfferForm';

const MyBookings = () => {
  const { data, refetch } = useUserBooking();
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleMakeOfferClick = (property) => {
    setSelectedProperty(property);
  };

  const handleBookDelete = async (id) => {
    try {
      const response = await axios.delete(`https://real-state-server-side.vercel.app/carts/${id}`);
      console.log('Booking deleted successfully:', response.data);
      toast.success('Booking deleted successfully');
      refetch();
    } catch (error) {
      console.error('Error deleting booking:', error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Bookings</title>
      </Helmet>

      <div className="relative overflow-x-auto shadow-md px-6 py-4 sm:rounded-md bg-white dark:bg-gray-800">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-transparent border border-white rounded-md">
          <thead className="text-xs text-white uppercase bg-blue-500 dark:bg-blue-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Property Img
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Agent Info
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Make Offer
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {data?.map((booking, index) => (
            <tbody key={booking._id} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}>
              <tr className="border-b dark:border-gray-700">
                <td className="px-6 py-4">
                  <img className="w-16 h-12" src={booking?.propertyImage} alt="" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {booking?.propertyTitle.slice(0, 22)}
                </td>
                <td className="px-6 py-4">
                  {booking?.propertyLocation}
                </td>
                <td className="px-6 py-4 flex justify-center gap-2 flex-col">
                  {booking?.agentName}
                  <img className="w-8 h-8" src={booking?.agentImage} alt="" />
                </td>
                <td className="px-6 py-4">
                  ${booking?.frange}-{booking?.trange}
                </td>
                <td className="px-6 py-4">
                  {booking?.status}
                </td>
                <td className="py-9">
                  <button
                   className='bg-green-500 text-white px-3  py-1 rounded'
                    onClick={() => handleMakeOfferClick(booking)}
                  >
                    Apply Offer
                  </button>
                  {selectedProperty && (
                    <OfferForm handleBookDelete={handleBookDelete} property={selectedProperty} onClose={() => setSelectedProperty(null)} />
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    className='bg-red-500 text-white px-3 py-1 rounded'
                    onClick={() => handleBookDelete(booking?._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default MyBookings;
