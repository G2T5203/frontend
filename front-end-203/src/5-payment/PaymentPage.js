import { useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "@mui/material";
import ProgressBar from "../progress-bar/ProgressBar";
import NavigationBar from "../nav-bar/NavigationBar";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from "./PaymentForm";

const PaymentPage = () => {
    const navigate = useNavigate();

    const handleClickReturn = (e) => {
        navigate("/");
    }
    const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY_HERE');
    return (
        <>
        <div>
        <NavigationBar />
      </div>
      <ProgressBar currentStep={"Payment"} number={4} />
      <Elements stripe={stripePromise}>
      <PaymentForm />
      </Elements>
        </>
        

    );
};

export default PaymentPage;