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
      label={label}
      value={value}
      onChange={handleDateChange}
      disabled={disabled}
      dateAdapter={AdapterDayjs}
    />
  );
};

export default MyDatePicker;
