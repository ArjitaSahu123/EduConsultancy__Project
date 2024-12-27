import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom'; 

const Success = () => {
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };

    return () => {
      window.onpopstate = null;
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful</h1>
        <p className="text-lg text-gray-600 mb-4">Thank you! Your payment has been processed successfully.</p>
        <p className="text-lg text-gray-600 mb-4">Order Status: <span className="font-semibold text-green-600">COMPLETED</span></p>
        <p className="text-gray-600 mb-6">You will receive a confirmation email shortly.</p>
        <a href="/home" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Go to Homepage</a>
      </div>
    </div>
  );
};

export default Success;
