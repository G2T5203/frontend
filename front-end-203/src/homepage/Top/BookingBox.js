import React from "react";
import { Box, Paper, TextField, Button, Grid, Container } from "@mui/material";
import PickerBox from "./Picker";
import DatePickerContainer from "./DatePickerContainer";

const CompactForm = () => {
  return (
    <Container disableGutters={true}>
      <Paper elevation={0} sx={{ padding: 1, width: "420px" }}>
        <Grid container rowSpacing={1} columnSpacing={2}>
          {/* Row 1: 3 Item Pickers */}
          <Grid item xs={4}>
            <PickerBox name={"Trip"} options={[1, 3, 2, 4]} />
          </Grid>
          <Grid item xs={4}>
            <PickerBox name={"No. Guest"} options={[1, 2, 3, 4]} />
          </Grid>
          <Grid item xs={4}>
            <PickerBox
              name={"Class"}
              options={["Economy", "Business", "First"]}
            />
          </Grid>

          {/* Row 2: 2 Text Inputs */}
          <Grid item xs={6}>
            <TextField label="Flying from" variant="outlined" size="small" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Flying to" variant="outlined" size="small" />
          </Grid>

          {/* Row 3: 2 Input Boxes and Submit Button */}
          <Grid item xs={6}>
            {" "}
            {/* <TextField label="Departure" variant="outlined" size="small" /> */}
            <DatePickerContainer />
            {/* TO DO DATE PICKERS */}
          </Grid>
          <Grid item xs={6}>
            {/* <TextField label="Return" variant="outlined" size="small" /> */}
            <DatePickerContainer />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Search Flights
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CompactForm;
