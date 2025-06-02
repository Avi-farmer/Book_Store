import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider'; // To get logged-in user ID
import { useLocation, useNavigate } from 'react-router-dom'; // To get book details if passed via state

const PaymentPage = () => {
  const [authUser] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Attempt to get book details from location state
  const bookToPurchase = location.state?.book || null;

  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [addressDetails, setAddressDetails] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '', // UI only
    expiryDate: '', // UI only
    cvc: '',        // UI only
    cardholderName: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (authUser?.user) {
      setCustomerDetails(prev => ({
        ...prev,
        name: prev.name || authUser.user.fullname || '',
        email: prev.email || authUser.user.email || '',
      }));
    }
     if (!bookToPurchase) {
      // console.warn("No book details found in location state. User might need to select a book first.");
      // Optionally, you could redirect or show a more prominent message here.
    }
  }, [authUser, bookToPurchase]);


  const handleCustomerChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddressDetails({ ...addressDetails, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    if (!bookToPurchase || !bookToPurchase._id) {
        setError("No book selected for purchase. Please go back and select a book.");
        setIsLoading(false);
        return;
    }

    const orderPayload = {
      userId: authUser?.user?._id || null,
      customerDetails,
      addressDetails,
      paymentDetails: {
        cardholderName: paymentDetails.cardholderName,
        method: "Card",
      },
      items: [
        {
          bookId: bookToPurchase._id,
          quantity: 1,
        },
      ],
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/order`, orderPayload);
      setSuccessMessage(`Order placed successfully! Order ID: ${response.data.order._id}`);
      // navigate(`/order-confirmation/${response.data.order._id}`);
    } catch (err) {
      console.error('Error submitting order:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || 'Failed to submit order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-700 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-slate-800";
  const roundedTopClass = "rounded-t-md";
  const roundedBottomClass = "rounded-b-md";
  const roundedNoneClass = "rounded-none";


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-800 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Complete Your Purchase
          </h2>
          {bookToPurchase && <p className="text-center text-sm text-gray-600 dark:text-slate-400">Purchasing: {bookToPurchase.name || `Book ID: ${bookToPurchase._id}`}</p>}
        </div>
        <form className="mt-8 space-y-6 bg-white dark:bg-slate-900 p-8 md:p-10 rounded-xl shadow-2xl" onSubmit={handleSubmit}>
          {error && <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 border border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700">{error}</div>}
          {successMessage && <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700 border border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700">{successMessage}</div>}

          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* Left Column: Customer and Address Details */}
            <div className="md:w-1/2 space-y-6">
              {/* Customer Details */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Customer Details</h3>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="name" className="sr-only">Full Name</label>
                    <input id="name" name="name" type="text" autoComplete="name" required className={`${inputClass} ${roundedTopClass}`} placeholder="Full Name" value={customerDetails.name} onChange={handleCustomerChange} />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input id="email" name="email" type="email" autoComplete="email" required className={`${inputClass} ${roundedNoneClass}`} placeholder="Email address" value={customerDetails.email} onChange={handleCustomerChange} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">Phone Number</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" required className={`${inputClass} ${roundedBottomClass}`} placeholder="Phone Number" value={customerDetails.phone} onChange={handleCustomerChange} />
                  </div>
                </div>
              </section>

              {/* Address Details */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Shipping Address</h3>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="address1" className="sr-only">Address Line 1</label>
                    <input id="address1" name="address1" type="text" autoComplete="shipping address-line1" required className={`${inputClass} ${roundedTopClass}`} placeholder="Address Line 1" value={addressDetails.address1} onChange={handleAddressChange} />
                  </div>
                  <div>
                    <label htmlFor="address2" className="sr-only">Address Line 2</label>
                    <input id="address2" name="address2" type="text" autoComplete="shipping address-line2" className={`${inputClass} ${roundedNoneClass}`} placeholder="Address Line 2 (Optional)" value={addressDetails.address2} onChange={handleAddressChange} />
                  </div>
                  <div>
                    <label htmlFor="city" className="sr-only">City</label>
                    <input id="city" name="city" type="text" autoComplete="shipping locality" required className={`${inputClass} ${roundedNoneClass}`} placeholder="City" value={addressDetails.city} onChange={handleAddressChange} />
                  </div>
                  <div className="flex -space-x-px">
                    <div className="w-1/2">
                      <label htmlFor="state" className="sr-only">State / Province</label>
                      <input id="state" name="state" type="text" autoComplete="shipping region" required className={`${inputClass} ${roundedNoneClass}`} placeholder="State / Province" value={addressDetails.state} onChange={handleAddressChange} />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="zip" className="sr-only">ZIP / Postal Code</label>
                      <input id="zip" name="zip" type="text" autoComplete="shipping postal-code" required className={`${inputClass} ${roundedBottomClass}`} placeholder="ZIP / Postal Code" value={addressDetails.zip} onChange={handleAddressChange} />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Payment Details */}
            <div className="md:w-1/2 space-y-6 mt-8 md:mt-0">
              <section>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Payment Information</h3>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="cardNumber" className="sr-only">Card number</label>
                    <input id="cardNumber" name="cardNumber" type="text" autoComplete="cc-number" required className={`${inputClass} ${roundedTopClass}`} placeholder="Card number" value={paymentDetails.cardNumber} onChange={handlePaymentChange} />
                  </div>
                  <div className="flex -space-x-px">
                    <div className="w-1/2">
                      <label htmlFor="expiryDate" className="sr-only">Expiry date</label>
                      <input id="expiryDate" name="expiryDate" type="text" autoComplete="cc-exp" required className={`${inputClass} ${roundedNoneClass}`} placeholder="MM/YY" value={paymentDetails.expiryDate} onChange={handlePaymentChange} />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="cvc" className="sr-only">CVC</label>
                      <input id="cvc" name="cvc" type="text" autoComplete="cc-csc" required className={`${inputClass} ${roundedNoneClass}`} placeholder="CVC" value={paymentDetails.cvc} onChange={handlePaymentChange} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cardholderName" className="sr-only">Cardholder name</label>
                    <input id="cardholderName" name="cardholderName" type="text" autoComplete="cc-name" required className={`${inputClass} ${roundedBottomClass}`} placeholder="Cardholder name" value={paymentDetails.cardholderName} onChange={handlePaymentChange} />
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading || !bookToPurchase || !bookToPurchase._id}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Confirm and Pay'}
            </button>
          </div>
        </form>
        {!bookToPurchase && <p className="mt-4 text-center text-sm text-red-500 dark:text-red-400">No item selected for purchase. Please select an item first.</p>}
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-slate-400">
          Your payment is secure and encrypted.
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;