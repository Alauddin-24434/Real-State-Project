import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './PropertyOffer.css';
import useOffers from '../../../hooks/useOffer';

const PropertyOffers = () => {
  const { data, refetch } = useOffers();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    if (data) {
      setOffers(data);
    }
  }, [data]);

console.log("all",data)

  const handleAccept = async (id) => {
    // Get the property title of the selected offer
    const selectedOffer = offers.find((offer) => offer._id === id);
    const propertyTitle = selectedOffer.propertyTitle;

    // Logic to handle accepting an offer
    const updatedOffers = offers.map((offer) => {
      if (offer._id === id) {
        return { ...offer, status: 'accepted' };
      } else if (offer.propertyTitle === propertyTitle && offer.status === 'pending') {
        // Automatically reject other offers for the same property
        return { ...offer,  status: 'rejected' };
      }
      return offer; // Return other offers unchanged
    });

    setOffers(updatedOffers);

    // Trigger a refetch to get the latest data
    refetch();

    try {
      // Perform the PUT request when an offer is accepted
      await axios.put(`http://localhost:5000/offers/accept/${id}`, { status: 'accepted' });
    } catch (error) {
      console.error('Error accepting offer:', error);
    }
  };

  const handleReject = async (id) => {
    // Logic to handle rejecting an offer
    const updatedOffers = offers.map((offer) => {
      if (offer._id === id) {
        return { ...offer, status: 'rejected' };
      }
      return offer; // Return other offers unchanged
    });

    setOffers(updatedOffers);

    // Trigger a refetch to get the latest data
    refetch();

    try {
      // Perform the PUT request when an offer is rejected
      await axios.put(`http://localhost:5000/offers/reject/${id}`, { status: 'rejected' });
    } catch (error) {
      console.error('Error rejecting offer:', error);
    }
  };

  return (
    <div>
      <h2>Property Offers</h2>
      {data ? (
        <table className="property-offers-table">
          <thead>
            <tr>
              <th>Property Title</th>
              <th>Property Location</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Offered Price</th>
              <th>Action</th>
              <th>Status</th>
    
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id}>
                {/* ... (existing columns) */}
                <td>{offer?.title}</td>
                <td>{offer?.location}</td>
                <td>{offer?.buyerName}</td>
                <td>{offer?.email}</td>
                <td>${offer?.offeredAmount}</td>
                <td>
                  {offer?.status === 'pending' && (
                    <>
                      <button
                        className={`accept ${offer.status === 'accepted' ? 'accepted' : ''}`}
                        onClick={() => handleAccept(offer._id)}
                      >
                        Accept
                      </button>
                      <button
                        className={`reject ${offer.status === 'rejected' ? 'rejected' : ''}`}
                        onClick={() => handleReject(offer._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
                <td>{offer.status}</td>
               
                <tr/>
               
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PropertyOffers;
