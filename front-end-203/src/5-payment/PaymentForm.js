import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, Box, TextField, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";

const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "white",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
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
            },
          },
          notchedOutline: {
            borderColor: "white", // Default border color
          },
          input: {
            color: "white", // This will change the input text color to white
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          outlined: {
            color: "grey", // Label color
            "&.Mui-focused": {
              color: "white", // Label color when input is focused
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: "white", // This will change the input text color to white for all input variants
          },
        },
      },
    },
  });
  

function PaymentForm() {
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
    <Box padding={5} bgcolor="#223662" width="400px" borderRadius={"0.75rem"}>
      <Typography variant="h6" color={"white"}>
        Payment method
      </Typography>
      <Typography variant="body2" color={"white"}>
        Select a payment method below. WingIt processes your payment securely
        with end-to-end encryption.
      </Typography>
      <Typography variant="subtitle1" color={"white"} marginY={2}>
        Credit card details
      </Typography>

      <Box marginBottom={2}>
    <ThemeProvider theme={customTheme}><TextField fullWidth margin="normal" variant="outlined" label="Name on card" /></ThemeProvider>
      
    </Box>

    <Box marginBottom={2}>
      <div style={{ border: '1px solid white', padding: '8px', borderRadius: '4px'}}>
        <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
      </div>
    </Box>

    <Box display="flex" justifyContent="space-between" marginBottom={2}>
      <Box width="60%" marginRight={1}>
        <div style={{ border: '1px solid white', padding: '8px', borderRadius: '4px' }}>
          <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </Box>
      <Box width="35%">
        <div style={{ border: '1px solid white', padding: '8px', borderRadius: '4px' }}>
          <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </Box>
    </Box>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: "16px" }}
      >
        Confirm and pay
      </Button>
    </Box>
  );
}

export default PaymentForm;
