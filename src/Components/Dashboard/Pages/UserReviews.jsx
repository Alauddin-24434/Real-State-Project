import { Helmet } from 'react-helmet-async'



import axios from 'axios'

import toast from 'react-hot-toast'

import useAllReviews from '../../../hooks/useAllReviews'



const OwnUserReviews = () => {


    const { data, refetch } = useAllReviews()


    // handle book delete
    const handleBookDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/userReviews/${id}`);
            // Assuming a successful deletion, you might want to update your state or UI
            // based on the response from the server.
            console.log('Booking deleted successfully:', response.data);
            // Update your state or perform any other necessary actions.
            toast.success("Review delete successfully")
            refetch()
        } catch (error) {
            // Handle errors, and you can display an error message to the user.
            console.error('Error deleting booking:', error.message);
            toast.error(error.message);
        }
    };

    return (
        <>
            <Helmet>
                <title>My Bookings</title>
            </Helmet>



            <div className="relative overflow-x-auto shadow-md px-12 sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                Property Title
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Agent Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Review Time
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Remove
                            </th>
                         
                        </tr>
                    </thead>
                    {
                        data?.map(review => <tbody key={review._id}>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                               
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {review?.title}
                                </th>
                               
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {review?.propertyAgentName}
                                </th>

                               
                                
                                <td className="px-6 py-4 justify-center">
                                    {review?.timestamp}
                                  
                                </td>
                                <td className="px-6 py-4 justify-center ">
                                    {review?.reviewText}
                                  
                                </td>

                                
                            
                                <td className="px-6 py-4">
                                    <button className='bg-red-600 rounded-md px-2 text-white' onClick={() => handleBookDelete(review?._id)}>Remove</button>
                                </td>
                            </tr>

                        </tbody>)
                    }
                </table>
            </div>

        </>
    )
}

export default OwnUserReviews
