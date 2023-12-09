/* eslint-disable react/prop-types */
// Import necessary dependencies
// ----------property details-------------
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Container from '../Container';
import Header from './Header';
import PropertyInfo from './PropertyInfo';


import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import useAllReviews from '../../../hooks/useAllReviews';
import ReadRivew from '../ReadUserRevew/ReadRivew';
import useRole from '../../../hooks/useRole';


const PropertyDetails = () => {
    const navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState(null);
    const { user } = useAuth();
    const loadProperty = useLoaderData();
    const { title, agent, number, location, image, frange, trange, } = loadProperty || {};
    const { refetch } = useAllReviews();
    const [isModalOpen, setModalOpen] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [role] = useRole()

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);

    };

    const handleReviewSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/reviews', {
                reviewText: reviewText,

                number: number,
                timestamp: new Date().toISOString(),
                email: user?.email,
                title: title,



                propertyAgentName: agent?.name,
                reviewUser: {
                    name: user?.displayName,
                    image: user?.photoURL,
                    email: user?.email,
                },
            });

            if (response) {
                toast.success('Added review successfully');
                refetch()
            }

        
            closeModal();
            setReviewText('')

        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const addToWishlist = async () => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',

        };

        const formattedDate = new Date(selectedDate).toLocaleString(undefined, options);



        try {
            const response = await axios.post('http://localhost:5000/carts', {
                email: user?.email,
                guestName: user?.displayName,
                title: title,


                number,

                cardDate: formattedDate,
                propertyImage: image,
                propertyTitle: title,
                propertyLocation: location,
                agentName: agent?.name,
                agentEmail: agent?.email,
                agentImage: agent?.image,
                status: "pending",
                frange,
                trange,

            });

            if (response) {
                toast.success('Added to Wishlist successfully');
                setSelectedDate(null);
                navigate('/dashboard/my-bookings')

            }

        } catch (error) {
            toast.error('Error adding to Wishlist');
            console.log(error);
        }
    };


    return (
        <div className=''>
            <Container>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <div className=''>
                    {/* header */}

                    <Header header={loadProperty} />


                    {/* room info */}
                    <div className='  mt-6'>
                        {/* ---------------------property info like image ,price, room etc---------------------  */}
                        <PropertyInfo info={loadProperty} />
                        {/*------------------react date picker code start hare-------------------- */}
                    </div>


                    <div className='flex flex-row-reverse h-auto justify-between'>
                        <div className='flex flex-col items-center'>
                            <div className='property-date-container mx-auto w-96 h-40 border-solid border border-gray-300 rounded-lg  mb-4'>
                                <p className="text-gray-700 mb-2">Price Range: ${loadProperty?.frange}-{loadProperty?.trange}</p>

                                <div className='date-section'>
                                    <p className='text-white'>
                                        {selectedDate ? (
                                            <span>Selected Date: {selectedDate.toLocaleDateString()}</span>
                                        ) : (
                                            <span>Today Date: {new Date().toLocaleDateString()}</span>
                                        )}
                                    </p>
                                </div>
                                {
                                    role?.role === "agent" || role?.role === "admin" ?<button className='bg-red-600 px-4 rounded-md text-white'>Disabled</button> : <button
                                        onClick={() => addToWishlist(selectedDate)}
className='bg-green-600 px-4 py-1 rounded-md text-white'

                                    >
                                        Add Wishlist
                                    </button>
                                }

                            </div>
                            <button onClick={openModal} className=' bg-blue-500 text-white w-auto p-2 py-2 rounded'>
                                Add Review
                            </button>
                        </div>
                        <div>
                            <p className="text-3xl font-semibold">Description </p>
                            <p className='text-lg font-light text-neutral-500'> {loadProperty?.description}</p>
                        </div>
                    </div>

                    {/*------------ property description code start hare------------------- */}

                    {/*------------ property description code end hare------------------- */}

                    {/* ---------------Review modal code start hare ------------------------ */}


                    {/*------------------------- Add Review Button code start hare------------------------ */}

                    {/*------------------------- Add Review Button code end hare------------------------ */}

                    {isModalOpen && (
                        <div className='modal-overlay fixed inset-0 z-50 flex items-center justify-center'>
                            <div className='modal bg-white p-6 rounded shadow-lg'>
                                <h2 className='text-3xl mb-4 font-bold text-gray-800'>Add a Review</h2>
                                <form onSubmit={handleReviewSubmit} className='space-y-4'>
                                    {/* Review Textarea */}
                                    <label htmlFor='review' className='block text-gray-700 font-bold'>
                                        Your Review:
                                    </label>
                                    <textarea
                                        id='review'
                                        name='review'
                                        rows='4'
                                        className='w-full border rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300'
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        required
                                    ></textarea>
                                    <div className='flex items-center justify-end'>
                                        <button
                                            type='submit'
                                            className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
                                        >
                                            Submit Review
                                        </button>
                                        <button
                                            type='button'
                                            onClick={closeModal}
                                            className='ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* ---------------Review modal code end hare ------------------------ */}

                    {/* ------------revews show in deatils page start ------------------------ */}

                    <ReadRivew property={loadProperty} />
                    {/* ------------revews show in deatils page end hare------------------------ */}
                </div>
            </Container >
        </div >
    );

};




export default PropertyDetails;
