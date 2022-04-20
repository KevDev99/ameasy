import React, { useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import { useDispatch } from "react-redux";

import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

import {
  createAppointment,
} from "../features/appointment/appointmentSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const AddAppointmentModal = ({ open, handleClose, handleOpen }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState("10:00");

  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState("11:00");

  const dispatch = useDispatch();

  const combineDateAndTime = (date, time) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Jan is 0, dec is 11
    const day = date.getDate();
    const dateString = '' + year + '-' + month + '-' + day;
    const combined = new Date(dateString + ' ' + time);

    return combined;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const title = data.get("title");
    const start = combineDateAndTime(startDate, startTime);
    const end = combineDateAndTime(endDate, endTime);

    if(!title || title.trim() === "")
      return alert("Please enter a valid title!")

    if(end <= start) 
      return alert('The end date cannot be behind or equal the start date!')

    const appointmentData = {
      start,
      end,
      title,
    };

    dispatch(createAppointment(appointmentData));
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Appointment
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
          />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: 2 }}>Start</Typography>
            <DatePicker
              className={"form-control"}
              minDate={new Date()}
              clearIcon={false}
              onChange={setStartDate}
              value={startDate}
            />
            <TimePicker
              className={"form-control"}
              onChange={setStartTime}
              clearIcon={false}
              value={startTime}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: 3 }}>End</Typography>
            <DatePicker
              className={"form-control"}
              minDate={startDate}
              clearIcon={false}
              onChange={setEndDate}
              value={endDate}
            />

            <TimePicker
              className={"form-control"}
              onChange={setEndTime}
              clearIcon={false}
              value={endTime}
            />
          </Box>

          <Button
            type="submit"
            color="success"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddAppointmentModal;
