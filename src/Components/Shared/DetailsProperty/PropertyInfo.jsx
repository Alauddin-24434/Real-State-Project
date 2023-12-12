/* eslint-disable react/prop-types */
import { FaBed, FaBath, FaLocationDot, FaVectorSquare } from "react-icons/fa6";
import AgentInfo from "../AgentInfo/AgentInfo";
import Modal from 'react-modal';
import { useState } from "react";
const PropertyInfo = ({ info }) => {
  console.log("all info ", info)
  const [showData, setShowData] = useState(false);
  const closeModal = () => {
    setShowData(false);
  };
  return (

    <div className='flex flex-row justify-between gap-2'>
      <div className="flex items-center gap-2">
        <FaLocationDot />{info?.location}
      </div>

      <div className='
                flex 
                flex-row 
                items-center 
                gap-4 
                font-light
                text-neutral-500
              '
      >
        <div>
        <div>
      <button onClick={() => setShowData(true)} style={{ background: '#4CAF50', color: 'white', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>Show Neighborhood Data</button>

      <Modal
        isOpen={showData}
        onRequestClose={closeModal}
        contentLabel="Neighborhood Data Modal"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            maxWidth: '400px', // Adjust the width as needed
          },
        }}
      >
        <div style={{ padding: '20px', textAlign: 'center' }}>
         
          <div style={{ marginBottom: '10px' }}>
            <h3>School:</h3>
            <p>School Name: {info?.neighborhoodData.schools[0].name}, Rating: {info?.neighborhoodData.schools[0].rating}</p>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <h3>Crime Rate:</h3>
            <p>Type: {info?.neighborhoodData.crimeRates[0].type}, Rate: {info?.neighborhoodData.crimeRates[0].rate}</p>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <h3>Amenity:</h3>
            <p>Park Name: {info?.neighborhoodData.amenities[0].name}, Description: {info?.neighborhoodData.amenities[0].description}</p>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <h3>Hospital:</h3>
            <p>Hospital Name: {info?.neighborhoodData.hospitals[0].name}, Rating: {info?.neighborhoodData.hospitals[0].rating}</p>
          </div>
          <button onClick={closeModal} style={{ background: 'red', color: 'white', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>
            Close
          </button>
        </div>
      </Modal>
    </div>
        </div>
        <div className="flex items-center gap-2"><FaBed />{info?.bedrooms} rooms</div>
        <div className="flex items-center gap-2"><FaBath />{info?.bathrooms} bathrooms</div>
        <div className="flex items-center gap-2">< FaVectorSquare />{info?.sqfit} sqfit</div>
      </div>
      <AgentInfo agentInfo={info} />
    </div>







  );
};

export default PropertyInfo;