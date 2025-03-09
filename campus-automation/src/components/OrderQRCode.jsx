
import React from 'react';
import QRCode from 'react-qr-code';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderQRCode = ({ orderId }) => {
  if (!orderId) {
    return (
      <div className="alert alert-danger mt-4" role="alert">
        Error: No order ID provided!
      </div>
    );
  }

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body text-center">
        <h3 className="card-title mb-4">Your Order QR Code</h3>
        
        <div className="qr-code-container bg-light p-3 rounded mb-4">
          <QRCode 
            value={orderId}
            size={256}
            bgColor="#ffffff"
            fgColor="#2c3e50"
            level="H"
            aria-label={`QR Code for Order ID: ${orderId}`}
          />
        </div>

        <div className="order-details">
          <p className="text-monospace font-weight-bold mb-2">
            Order ID: <span className="text-primary">{orderId}</span>
          </p>
          <small className="text-muted">
            Present this QR code at the counter to collect your order
          </small>
        </div>

        <button 
          className="btn btn-primary mt-4"
          onClick={() => window.print()}
        >
          Print QR Code
        </button>
      </div>
    </div>
  );
};

export default OrderQRCode;