
import { createBrowserHistory } from 'history';
import useUserBought from '../../../hooks/useUserBought';
import './BoughtProperties.css'; // Create a CSS file for styling

import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const BoughtProperties = () => {
  const { data: boughtProperties } = useUserBought();
  const { user } = useAuth()
  console.log(boughtProperties)
  const history = createBrowserHistory();

  const handlePay = (propertyId) => {
    history.push(`/payment/${propertyId}`);
  };

  return (
    <div>
      <h2 className="section-heading">Properties Bought</h2>
      <div className="property-cards-container">
        {boughtProperties ? (
          boughtProperties?.map((property) => (
            <div key={property.id} className="property-card w-64 mx-auto">
              <img src={property?.propertyImage} alt={property.propertyTitle} className="property-image" />
              <div className="property-details">
                {property.status === 'accepted' ? (
                  <>
                    <h3 className="property-title">{property.title}</h3>
                    <p className="property-location">Location: {property.location}</p>
                    <p className="property-agent">Agent: {property.agentName}</p>
                    <p className="property-amount">Offered Amount: ${property.offeredAmount}</p>
                    <p className="property-status">Status: {property.status}</p>
                    {property.status === 'accepted' && (
                  <button className="pay-button" onClick={() => handlePay(property.id)}><Link to='/dashboard/payment'>Pay Now</Link></button>
                )}
                {property.status === 'bought' && (
                  <p className="transaction-id">Transaction ID: {property.transactionId}</p>
                )}
                  </>
                ) : (
                  property.status === 'rejected' ? (
                    <>
                   <div className='flex flex-col items-center gap-2'>
                   <h3 className="property-title"><span className='text-red-600  text-lg font-medium'>Sorry</span>, {user?.displayName}</h3>
                    <p>You do not bye this House</p>
                    
                  
                   <p className='flex flex-row items-center'>Status: <p className="text-red-600 px-4 w-24 py-1 text-lg font-medium rounded-md">{property.status}</p></p>
                   </div>
                  </>
                    
                  ) : (
                    <>
                    <div className='flex flex-col items-center gap-2'>
                    <h3 className="property-title">Hi, {user?.displayName}</h3>
                     <p>I receive your request message</p>

                    <p className='flex flex-row items-center'>Status: <p className="text-yellow-600 text-lg font-medium px-4 w-24 py-1 rounded-md">{property.status}</p></p>
                    </div>
                   </>
                  )
                )}

                {property.status === 'bought' && (
                  <p className="transaction-id">Transaction ID: {property.transactionId}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default BoughtProperties;
``
