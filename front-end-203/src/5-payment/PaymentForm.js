import React from "react";
import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { Button, Box, TextField, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";


  

function PaymentForm() {

    const [hasText, setHasText] = useState(false);

  const handleTextChange = (e) => {
    setHasText(e.target.value !== '');
  };

const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "black",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        backgroundColor: "white",
        "::placeholder": {
          color: "grey",
        },
      },
      invalid: {
        color: "red",
        iconColor: "red",
      },
    },
  };

  const customTheme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Border color when hovered
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Border color when focused
              borderWidth: "1px"
            },
          },
          notchedOutline: {
            borderColor: "white", // Default border color
          },
          input: {
            color: "black", // This will change the input text color to white
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          outlined: {
            color: "grey", // Label color
            "&.Mui-focused": {
              color: "grey", // Label color when input is focused
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: "black",
          },
        },
      },
    },
  });
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log(paymentMethod);
      setError(null); // Clear any errors if payment method is created successfully
    }
  };

  return (
    <Box padding={5} bgcolor="#223662" width="400px" borderRadius={"1rem"} marginLeft={"12rem"} marginTop={"4rem"} marginBottom={"4rem"}>
        <Typography variant="h5" color={"white"} sx={{fontFamily: "Merriweather Sans"}}>
        Payment Method
      </Typography>
      <Typography variant="body2" color={"white"} sx={{fontFamily: "Merriweather Sans", marginY: "0.75rem"}}>
        Select a payment method below. WingIt processes your payment securely
        with end-to-end encryption.
      </Typography>
      <Button 
        sx={{
          borderColor: '#FF9B00',
          borderWidth: '2px',
          padding: '10px 30px', 
          backgroundColor: 'darkOrange',
          fontFamily: "Merriweather Sans",
          color: "white",
          textTransform: "none",
          '&:hover': {
            backgroundColor: '#FF9B00',  // replace with your desired color
          }
        }}
      >
        Credit card
      </Button>
      
      <Typography variant="h6" color={"white"} marginY={2} sx={{fontFamily: "Merriweather Sans", marginTop: "1.5rem"}}>
        Credit card details
      </Typography>

      <Box marginBottom={2}>
    <ThemeProvider theme={customTheme}><TextField 
    fullWidth 
    margin="normal" 
    variant="outlined"
    label={!hasText ? "Name on card" : null}
        sx={{ fontFamily: "Merriweather Sans" , backgroundColor: "white", borderRadius: "4px"}}
        onChange={handleTextChange}
    InputLabelProps={{ shrink: false }} 
  /></ThemeProvider>
      
    </Box>

    <Box marginBottom={2}>
      <div style={{ border: '1px solid white', borderRadius: '4px', padding: "1rem", backgroundColor: "white"}}>
        <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
      </div>
    </Box>

    <Box display="flex" justifyContent="space-between" marginBottom={2}>
      <Box width="60%" marginRight={1}>
        <div style={{ border: '1px solid white', borderRadius: '4px', padding: "1rem", backgroundColor: "white"} }>
          <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </Box>
      <Box width="35%">
        <div style={{ border: '1px solid white', borderRadius: '4px', padding: "1rem", backgroundColor: "white"} }>
          <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </Box>
    </Box>
    <Button 
        sx={{
          borderColor: '#FF9B00',
          borderWidth: '2px',
          padding: '10px 30px', 
          backgroundColor: 'darkOrange',
          fontFamily: "Merriweather Sans",
          color: "white",
          textTransform: "none",
          '&:hover': {
            backgroundColor: '#FF9B00',  // replace with your desired color
          }
        }}
      >
        Confirm and pay
      </Button>

    
    </Box>
  );
}

export default PaymentForm;
