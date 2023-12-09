/* eslint-disable react/prop-types */
import  { useState } from 'react';


const UpdatePropertyForm = ({ property, onUpdate, onClose }) => {
  const [updatedData, setUpdatedData] = useState({ ...property });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call onUpdate with updatedData
    onUpdate(updatedData);
    onClose();
  };

  return (
    <div className="bg-red-400 bg-opacity-50 mx-auto max-w-2xl h-auto">
      <form onSubmit={handleSubmit} className="flex p-8 gap-2 flex-col items-center justify-center">
        {/* Property Title */}
        <label htmlFor="propertyTitle">Property Title:</label>
        <input
          type="text"
          id="propertyTitle"
          name="title"
          value={updatedData.title}
          onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
          className="w-full"
        />

        {/* Property Location */}
        <label htmlFor="propertyLocation">Property Location:</label>
        <input
          type="text"
          id="propertyLocation"
          name="location"
          value={updatedData.location}
          onChange={(e) => setUpdatedData({ ...updatedData, location: e.target.value })}
          className="w-full"
        />

        {/* Property Price Range */}
        <label htmlFor="fromPriceRange">From Price Range:</label>
        <input
          type="text"
          id="fromPriceRange"
          name="frange"
          value={updatedData.frange}
          onChange={(e) => setUpdatedData({ ...updatedData, frange: e.target.value })}
          className="w-full"
        />
        <label htmlFor="toPriceRange">To Price Range:</label>
        <input
          type="text"
          id="toPriceRange"
          name="trange"
          value={updatedData.trange}
          onChange={(e) => setUpdatedData({ ...updatedData, trange: e.target.value })}
          className="w-full"
        />

        {/* Description */}
        <label htmlFor="propertyDescription">Description:</label>
        <input
          type="text"
          id="propertyDescription"
          name="description"
          value={updatedData.description}
          onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue mr-2"
        >
          Update
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded focus:outline-none focus:shadow-outline-gray"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdatePropertyForm;
