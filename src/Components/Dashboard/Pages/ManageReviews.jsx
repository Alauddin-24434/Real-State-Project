
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAllReviews from '../../../hooks/useAllReviews';

const ManageReviews = () => {
 
const {data:reviews,refetch}=useAllReviews()
//   useEffect(() => {
//     // Fetch reviews data from your API
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/reviews');
//         setReviews(response.data);
//       } catch (error) {
//         console.error('Error fetching reviews:', error.message);
//       }
//     };

//     fetchReviews();
//   }, []);

  const handleDeleteReview = async (reviewId) => {
    try {
      // Make an API call to delete the review
      await axios.delete(`http://localhost:5000/userReviews/${reviewId}`);
      // Update the local state after successful deletion
      refetch()
      // Show success message
      toast.success('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error.message);
      // Show error message
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <Helmet>
          <title>Manage Reviews</title>
        </Helmet>
        <div className='py-2'>
          <div className='overflow-x-auto'>
            <div className='bg-white shadow-md rounded my-6'>
              <table className='min-w-full'>
                <thead>
                  <tr>
                    <th className='py-4 px-6 bg-blue-500 text-white font-bold uppercase text-sm'>Reviewer Image</th>
                    <th className='py-4 px-6 bg-blue-500 text-white font-bold uppercase text-sm'>Reviewer Name</th>
                    <th className='py-4 px-6 bg-blue-500 text-white font-bold uppercase text-sm'>Reviewer Email</th>
                    <th className='py-4 px-6 bg-blue-500 text-white font-bold uppercase text-sm'>Review</th>
                    <th className='py-4 px-6 bg-blue-500 text-white font-bold uppercase text-sm'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews?.map((review) => (
                    <tr key={review._id} className='border-b border-gray-200'>
                      <td className='py-4 px-6'>
                        <img src={review?.reviewUser.image} alt='Reviewer' className='w-10 h-10 rounded-md' />
                      </td>
                      <td className='py-4 px-6'>{review?.reviewUser.name}</td>
                      <td className='py-4 px-6'>{review.reviewUser.email}</td>
                      <td className='py-4 px-6'>{review.reviewText}</td>
                      <td className='py-4 px-6'>
                        <button
                          className='bg-red-500 text-white px-3 py-1 rounded'
                          onClick={() => handleDeleteReview(review._id)}
                        >
                          Delete
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

export default ManageReviews;
