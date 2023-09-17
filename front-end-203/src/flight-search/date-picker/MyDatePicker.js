import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const MyDatePicker = ({ label, value, onChange, disabled}) => {
  const handleDateChange = (date) => {
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <DatePicker
      disablePast
      label={label}
      value={value}
      onChange={handleDateChange}
      disabled={disabled}
      dateAdapter={AdapterDayjs}
      sx={{
        marginLeft: "10px",
        fontFamily: "Merriweather Sans",
        "& .MuiInputLabel-root": {
          color: disabled ? 'grey' : 'white',
          fontFamily: "Merriweather Sans",
        },
        "& input": {
          color: disabled ? 'grey' : 'white',
          "&::placeholder": {
            color: disabled ? 'grey' : 'white',
          },
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: disabled ? 'grey' : 'white',
          },
          '&:hover fieldset': {
            borderColor: disabled ? 'grey' : 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
          '& .MuiSvgIcon-root': {
            color: disabled ? 'grey' : 'white',
          },
          '&::selection': {
            color: disabled ? 'grey' : 'white',
            background: 'transparent',
          },
        },
      }}
    />
  );
};

export default MyDatePicker;
