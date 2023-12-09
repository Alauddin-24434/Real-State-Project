/* eslint-disable react/prop-types */

import Modal from 'react-modal';

const FullReviewModal = ({ isOpen, closeModal, review }) => {
    const { reviewUser, reviewText, title, } = review;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Full Review Modal"
        >
            <div>
                <h2>{title}</h2>
                <p>{reviewUser?.name}</p>
                <p>{reviewText}</p>
               
                <button onClick={closeModal}>Close</button>
            </div>
        </Modal>
    );
};

export default FullReviewModal;
