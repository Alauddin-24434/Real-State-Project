/* eslint-disable react/prop-types */
import { useState } from 'react';
import FullReviewModal from './FullReviewModal';
import './ModalStyles.css';

const AllReviewCard = ({ review }) => {
    const { reviewUser, reviewText, title } = review;
    const [showFullText, setShowFullText] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSeeMoreClick = () => {
        setShowFullText(true);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setShowFullText(false);
        setIsModalOpen(false);
    };

    const truncatedText = reviewText?.slice(0, 55);
    const isTextOverflowed = reviewText?.length > 55;

    return (
        <div className="bg-white w-full md:w-64 h-64 m-auto border shadow-md mb-4 rounded-md ">
            <img
                src={reviewUser?.image}
                alt="User"
                className="w-12 mt-4 h-12 rounded-lg object-cover mx-auto mb-4"
            />

            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">{reviewUser?.name}</h3>
                <hr className="my-2 border-t border-gray-300" />
                <p className="text-indigo-300 text-sm">Title: {title}</p>

                <p className="text-gray-800 text-lg">
                    {showFullText ? reviewText : (
                        <>
                            {truncatedText}
                            {isTextOverflowed && (
                                <span className="text-indigo-500 cursor-pointer" onClick={handleSeeMoreClick}>
                                    {' See More'}
                                </span>
                            )}
                        </>
                    )}
                </p>

                <FullReviewModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    review={review}
                />
            </div>
        </div>
    );
};

export default AllReviewCard;
