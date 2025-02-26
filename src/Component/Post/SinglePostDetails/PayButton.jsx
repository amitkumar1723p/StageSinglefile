import React,{useEffect,useState} from 'react';

import {useDispatch, useSelector } from 'react-redux';
import { paymentAction, verifiedPayment } from '../../../Action/userAction';
const REACT_APP_RAZORPAY_KEY_ID=process.env.REACT_APP_RAZORPAY_KEY_ID;

export default function PayButton(
  { PostId, onSuccess }
) {
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch()
  const { medata } = useSelector((state) => state.meDetails);
  const {data}=useSelector((state)=>state.paymentResponse) //paymentAction

  useEffect(() => {
    // Fetch payment data on component mount
    if (medata?.user?._id) {
      dispatch(paymentAction());
    }
  }, [dispatch, medata?.user?._id]);
console.log(data)
  // Function to load the Razorpay SDK script dynamically
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = (err) => reject(new Error("Script load error: " + err));
      document.body.appendChild(script);
    });
  }

  const handlePayment = async () => {
    try {
      // Load Razorpay SDK 
      let res;
      if(medata?.user?._id){
        res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      }else{
        alert("Please login");
        return;
      }
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
  
     // Dispatch action to get payment data if it's not already loaded
     if (!data || !data?.order) {
      if (!loading) {
        setLoading(true);
        dispatch(paymentAction());
      }
      alert('Loading payment details, please try again.');
      return;
    }

  
      // Extract necessary data from the result
      const { amount, id, currency } = data?.order;
  
      // Prepare user data dynamically
      const userData = {
        name: medata?.user?.email || "Default Name", 
        contact: medata?.user?.ContactNumber || "Default Contact",
        userId: medata?.user?._id || "defaultUserId"
      };
  
      // Razorpay payment options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,  // Ensure the env variable is correctly set
        amount: amount, 
        currency: currency,
        name: "Propfuture AI Technologies Pvt. Ltd.",
        description: "Test Transaction",
        image: '/favicon.png',
        order_id: id,  
        handler: async function (response) {
          const { razorpay_payment_id } = response;
  
          if (!razorpay_payment_id) {
            alert("Missing required payment information.");
            return;
          }
  
          // Prepare the data to send to the backend
          const paymentData = { 
            razorpayPaymentId: razorpay_payment_id,
            user: medata?.user._id, 
            PostId // Ensure medata contains user data
          };
  
          try {
            // Send payment success details to the backend
             dispatch(verifiedPayment(paymentData));
            // Success alert or response from backend
            // alert("Payment was successful!");
         if(onSuccess){
          onSuccess("successfully!")
         }
          } catch (error) {
            console.error("Under Process:", error);
            alert("There was an error processing your payment.");
           if( onSuccess){
            onSuccess()
           }
          }
        },
        prefill: userData,  // Prefill user information dynamically
        notes: {
          address: "D-1007, Block-D, Vatika Town Square, Sector 82A, Gurugram-122004, Haryana",
        },
        theme: {
          color: "#037edb",  // Set the theme color
        },
      };
  
      // Open the Razorpay payment modal
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
  
    } catch (error) {
      // Handle errors such as script loading or any unexpected issues
      console.error("Error loading script:", error);
      alert("Error loading Razorpay SDK: " + error.message);
    }
  };
  

  return (
    <>
      <button onClick={handlePayment}>
        Pay Button
      </button>
    </>
  );
}
