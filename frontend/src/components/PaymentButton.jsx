import React, { useEffect, useState,useContext } from "react";
import { createOrder } from "../services/paymentService";
import { toast,ToastContainer,Bounce } from "react-toastify";
import { AuthContext } from "../firebase/authContext";
import { useNavigate } from "react-router-dom";
const PaymentButton = ({ amount }) => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
const { user } = useContext(AuthContext);
const [aruser,setaruser] = useState(null);
const navigate = useNavigate();

 // getting user 
  useEffect(() => {
    if(user){
     fetch(`http://localhost:8080/user?email=${user.email}`)
     .then((responce) => {
       return responce.json();
     })
     .then((data) => {
       console.log(data);
       setaruser(data[0]);  
     });
    }
   }, [user])
   
  // Dynamically load the Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

  }, []);


 //order for that  
 let OrdersCalling =async(response)=>{
  let responce = await fetch(`http://localhost:8080/orders?userId=${aruser._id}`);
  let result = await responce.json();
  console.log("this is your result ",result);
  navigate("/orders",{state : { 
    order: result,
    response: response
  }});
}
  const handlePayment = async () => {
    if (!razorpayLoaded) {
      toast("Razorpay SDK is still loading. Please wait and try again.");
      return;
    }

    const order = await createOrder(amount);
    if (!order) {
      toast("Failed to create order. Try again.");
      return;
    }
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "Sun Refrigeration",
      description: "Payment for Purchase Service",
      handler: function (response) {
        toast("payment successful"); 
        OrdersCalling(response);
        console.log("this is respoce",esponse);
      },
      prefill: {
        name: aruser.name,
        email: aruser.email,
        contact: aruser.phoneno  ,
      },
      theme: {
        color: "#000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };




  return (
   <>
   <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      
    <button
      onClick={handlePayment}
      className="bg-blue-800 rounded-2xl py-2 px-2 w-full text-white text-xl"
    >
      Pay now
    </button>
   </>
  );
};

export  default PaymentButton;