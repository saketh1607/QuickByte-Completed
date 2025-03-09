import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const UPIModal = ({ onClose }) => {
    return (
        <div className="modal" id="upiModal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h3>Scan to Pay</h3>
                <img src="https://globalprimenews.com/wp-content/uploads/2022/08/IMG-20220805-WA0029.jpg" alt="UPI Scanner" />
                <p>Please scan the QR code to complete your payment.</p>
            </div>
        </div>
    );
};

export default UPIModal;