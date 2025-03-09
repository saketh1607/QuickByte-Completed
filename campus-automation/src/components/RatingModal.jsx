import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const RatingModal = ({ selectedItem, onClose, onSubmit }) => {
    const [rating, setRating] = useState(1);
    const [feedback, setFeedback] = useState('');

    const handleSubmit = () => {
        onSubmit(rating, feedback);
        onClose();
    };

    return (
        <div className="modal" style={{ display: selectedItem ? 'flex' : 'none' }}>
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>Rate and Give Feedback</h2>
                <div id="rating">
                    <label htmlFor="ratingStars">Rating (1-5):</label>
                    <select id="ratingStars" value={rating} onChange={(e) => setRating(e.target.value)}>
                        {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
                    </select>
                </div>
                <textarea id="feedback" placeholder="Write your feedback here..." value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>
                <button onClick={handleSubmit}>Submit Feedback</button>
            </div>
        </div>
    );
};

export default RatingModal;