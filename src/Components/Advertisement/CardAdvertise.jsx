/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const CardAdvertise = ({ card }) => {
  return (
    <Link to={`/property/${card?._id}`}>
      <div className="relative w-full h-72 cursor-pointer border rounded-lg overflow-hidden">
        <div className='aspect-square relative h-52 w-full'>
          <img
            className='object-cover h-full w-full transition-transform transform hover:scale-110'
            src={card?.image}
            alt='advertiseImg'
          />
         
        </div>
        <div className='p-4'>
          <p className='text-sm font-bold text-gray-800'>{card?.location}</p>
          <p className='text-xs text-gray-600'>
            <span className='text-green-500 font-bold'>${card?.frange}</span> - <span className='text-red-500 font-bold'>${card?.trange}</span>
          </p>
        </div>
       
      </div>
    </Link>
  );
};

export default CardAdvertise;
