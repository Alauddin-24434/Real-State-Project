import { useState } from 'react';
import useOwnAgentADData from "../../../hooks/useOwnAgentADDDAta";
import toast from "react-hot-toast";
import axios from "axios";
import UpdatePropertyForm from './UpdatePropertyForm';

const AgentAddedList = () => {
  const { data, isLoading, refetch } = useOwnAgentADData();

  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleUpdateClick = (property) => {
    setUpdateModalOpen(true);
    setSelectedProperty(property);
  };

  const handleUpdateSubmit = async (updatedData) => {
    try {
      // Exclude _id from updatedData
      const { _id , ...dataWithoutId } = updatedData;
      await axios.put(`https://real-state-server-side.vercel.app/houseUpdate/${_id}`, dataWithoutId);
      toast.success('Property updated successfully');
      setUpdateModalOpen(false);
      refetch();
    } catch (error) {
      console.error('Error updating property:', error.message);
      toast.error(error.message);
    }
  };

  const handleUpdateClose = () => {
    setUpdateModalOpen(false);
  };

  const handleDeleteClick = async (propertyId) => {
    try {
      await axios.delete(`https://real-state-server-side.vercel.app/houseDelete/${propertyId}`);
      toast.success('Property deleted successfully');
      refetch();
    } catch (error) {
      console.error('Error deleting property:', error.message);
      toast.error(error.message);
    }
  };

  if (isLoading) return <p className="text-center my-4">Loader...</p>;

  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      <table className="min-w-full bg-gray-100 border border-gray-300 table-fixed">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left bg-gray-200">Image</th>
            <th className="px-6 py-3 text-left bg-gray-200">Title</th>
            <th className="px-6 py-3 text-left bg-gray-200">Location</th>
            <th className="px-6 py-3 text-left bg-gray-200">Agent Name</th>
            <th className="px-6 py-3 text-left bg-gray-200">Agent Image</th>
            <th className="px-6 py-3 text-left bg-gray-200">Price Range</th>
            <th className="px-6 py-3 text-left bg-gray-200">Status</th>
          
            <th className="px-6 py-3 text-left bg-gray-200">Update</th>
            <th className="px-6 py-3 text-left bg-gray-200">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((property) => (
            <tr key={property.id} className="hover:bg-gray-200 transition">
              <td className="px-6 py-4">
                <img className="w-12 h-12 object-cover" src={property.image} alt="Property" />
              </td>
              <td className="px-6 py-4">{property.title.slice(0, 12)}</td>
              <td className="px-6 py-4">{property.location.slice(0, 12)}</td>
              <td className="px-6 py-4">{property.agent.name}</td>
              <td className="px-6 py-4">
                <img className="w-12 h-12 object-cover" src={property.agent.image} alt="Agent" />
              </td>
           
              <td className="px-6 py-4">${property.frange}-${property.trange}</td>
              <td className="px-6 py-4">{property.status}</td>
              <td className="px-6 py-4 space-x-2">
                <button
                  className={`${
                    property?.status === "Rejected" ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
                  } text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue`}
                  onClick={() => handleUpdateClick(property)}
                  disabled={property?.status === "Rejected"}
                >
                  Update
                </button>
              </td>
              <td className="px-6 py-4 space-x-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-red"
                  onClick={() => handleDeleteClick(property._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isUpdateModalOpen && (
        <UpdatePropertyForm
          property={selectedProperty}
          onUpdate={handleUpdateSubmit}
          onClose={handleUpdateClose}
        />
      )}
    </div>
  );
};

export default AgentAddedList;