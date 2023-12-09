/* eslint-disable react/prop-types */
// OfferForm.jsx

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const OfferForm = ({ property, onClose, }) => {
    const { user } = useAuth()
    const [offeredAmount, setOfferedAmount] = useState(0);
const navigate=useNavigate()

    const handleOfferSubmit = async () => {
        try {
            const offeredAmountNumeric = parseFloat(offeredAmount);

            // Validate that the offered amount is within the specified price range
            if (offeredAmountNumeric < property.frange || offeredAmountNumeric > property.trange) {
                // Show an error message (you can use toast.error or any other way to show messages)
                console.error('Invalid offered amount. Must be within the specified price range.');
                toast.error('Invalid offered amount. Must be within the specified price range.');
                return; // Stop further execution if validation fails
            }

            const offerData = {
                propertyId: property._id,
                offeredAmount: offeredAmountNumeric,
                buyerName: user?.displayName,
                email: user?.email,
                buyingDate: new Date().toLocaleDateString(),
                agentName: property?.agentName,
                propertyImage: property?.propertyImage,
                status: 'pending',
                title: property?.title,
                location: property?.propertyLocation,
            };

            // Send the offer to the server
            const response = await axios.post('http://localhost:5000/offers', offerData);
            console.log('Offer submitted successfully:', response.data);
            toast.success('Offer submitted successfully');
           
            onClose();
          
            navigate('/dashboard/my-bought')

        } catch (error) {
            console.error('Error submitting offer:', error.message);
            toast.error('Error submitting offer');
        }
    };
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 max-w-md w-full rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Apply Offer : {new Date().toLocaleDateString()}</h2>

                <div className="mb-4 ">
                   
                    <div className='flex flex-col '>
                     <p>   {user?.email} </p>
                        <p>{user?.displayName}</p>
                    </div>
                    <hr />





                </div>

                <div className="mb-4">
                  
                {property.propertyTitle}
                </div>
                <hr />

                {/* Add similar sections for Property Location and Agent Name */}

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Offer Amount</label>
                    <input
                        type="number"
                        value={offeredAmount}
                  
                        onChange={(e) => setOfferedAmount(e.target.value)}
                        className="w-full p-2 bg-gray-100"
                    />
                </div>







                <div className="flex">
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-2"
                        onClick={handleOfferSubmit}
                    >
                        Make Offer
                    </button>

                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>

    );
};

export default OfferForm;
