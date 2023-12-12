/* eslint-disable react/prop-types */
import { FaBed, FaBath, FaLocationDot, FaVectorSquare } from "react-icons/fa6";
import { FcRating } from "react-icons/fc";
import { FaSchool } from "react-icons/fa6";
import { FaHospitalAlt } from "react-icons/fa";
import AgentInfo from "../AgentInfo/AgentInfo";
import { PiParkBold } from "react-icons/pi";
import Modal from 'react-modal';
import { useState } from "react";
const PropertyInfo = ({ info }) => {
  console.log("all info ", info)
  const [showDataNeighbour, setShowDataNeighbour] = useState(false);
  const closeModalNeighbur = () => {
    setShowDataNeighbour(false);
  };
  const [showDataEcho, setShowDataEcho] = useState(false);
  const closeModalEcho = () => {
    setShowDataEcho(false);
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={() => setShowDataNeighbour(true)} style={{ background: 'teal', color: 'white', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>Show Area Feature</button>

            <Modal
              isOpen={showDataNeighbour}
              onRequestClose={closeModalNeighbur}
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
                  maxWidth: '600px', // Adjust the width as needed
                },
              }}
            >
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2 style={{ color: 'teal', borderBottom: '2px solid teal', paddingBottom: '10px' }}>This place Data</h2>

                <div className="flex flex-row items-center shadow-md p-4 gap-4" style={{ marginBottom: '10px' }}>
                  <h3>School Info:</h3>
                  <div>
                    <p className="flex flex-row gap-2 items-center">{info?.neighborhoodData.schools[0].name}<FaSchool /></p>
                    <p className="flex flex-row gap-2 items-center">Rating {info?.neighborhoodData.schools[0].rating} <FcRating /></p>
                  </div>
                </div>
                <div className="flex flex-row items-center shadow-md p-4 gap-4" style={{ marginBottom: '10px' }}>

                  <h3>Crime Rate:</h3>
                  <div>
                  <p className="flex flex-row gap-2 items-center">{info?.neighborhoodData.crimeRates[0].type} </p>
                  <p className="flex flex-row gap-2 items-center">Rate: {info?.neighborhoodData.crimeRates[0].rate}</p>
                  </div>
                </div>
                <div className="flex flex-row items-center shadow-md p-4 gap-4" style={{ marginBottom: '10px' }}>
                  <h3>Opportunity:</h3>
                  <div>
                  <p className="flex flex-row gap-2 items-center" >{info?.neighborhoodData.amenities[0].name}< PiParkBold/></p>
                  <p className="flex flex-row gap-2 items-center">Description: {info?.neighborhoodData.amenities[0].description}</p>
                  </div>
                
                </div>
                <div  className="flex flex-row items-center shadow-md p-4 gap-4" style={{ marginBottom: '10px' }}>
                  <h3>Hospital:</h3>
                  <div>
                  <p className="flex flex-row gap-2 items-center">{info?.neighborhoodData.hospitals[0].name}<FaHospitalAlt /> </p>
                  <p className="flex flex-row gap-2 items-center">Rating: {info?.neighborhoodData.hospitals[0].rating}<FcRating /></p>
                  </div>
                
                </div>
                <button onClick={closeModalNeighbur} style={{ background: 'red', color: 'white', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>
                  Close
                </button>
              </div>
            </Modal>
          </div>


        </div>
        {/* echo friendly */}
        <div>
          <button onClick={() => setShowDataEcho(true)} style={{ background: '#4CAF50', color: 'white', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>Echo Certificate</button>

          <Modal
            isOpen={showDataEcho}
            onRequestClose={closeModalEcho}
            contentLabel="Eco-Friendly Certification Modal"
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
                width: '70%', // Adjust the width as needed
                maxHeight: '80vh', // Adjust the height as needed
                overflowY: 'auto',
              },
            }}
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h2 style={{ color: '#4CAF50' }}>Eco-Friendly Certification</h2>
              <p style={{ color: '#333', marginBottom: '20px' }}>
                This property has been certified as eco-friendly and sustainable, meeting high environmental standards.
              </p>

              <ul style={{ listStyleType: 'none', padding: '0' }}>
                <li><strong>Energy Efficiency:</strong> High</li>
                <li><strong>Sustainable Materials:</strong>Steel, Copar, Glass</li>
                <li><strong>Eco-Friendly Features:</strong> Solar panels, rainwater harvesting</li>
              </ul>

              <button
                onClick={closeModalEcho}
                style={{ background: 'red', color: 'white', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
              >
                Close
              </button>
            </div>
          </Modal>
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