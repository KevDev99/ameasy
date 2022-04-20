import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {updateAppointment} from '../features/appointment/appointmentSlice';

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';

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

export const AppointmentModal = ({ handleClose, open }) => {

  const { appointment } = useSelector(
    (state) => state.appointment
  );

  const dispatch = useDispatch();

  if (!appointment) return <p></p>

  const handleStatusChanged = (e) => {
    e.preventDefault();

    const modAppointment = {};
    modAppointment._id = appointment._id;
    modAppointment.status = e.target.value;
    console.log(modAppointment);
    dispatch(updateAppointment(modAppointment));
    handleClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ borderBottom: '1px solid black', display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography  id="modal-modal-title" variant="h6" component="h2">
            {appointment.title}
          </Typography>
          <FormControl disabled={appointment.status === "closed"} variant="outlined" sx={{  width: 120,
            mb: 1,
            backgroundColor: 'white',
             }}>
            <Select
              sx={{height: 30,}}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={appointment.status}
              onChange={handleStatusChanged}
            >
              <MenuItem value={'open'}>Open</MenuItem>
              <MenuItem value={'closed'}>Closed</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Typography sx={{ mt: 2 }}>
          Start: {`${new Date(appointment.start).toLocaleDateString()} ${new Date(appointment.start).toLocaleTimeString()}`}
        </Typography>

        <Typography sx={{ mt: 2 }}>
          End: {`${new Date(appointment.end).toLocaleDateString()} ${new Date(appointment.end).toLocaleTimeString()}`}
        </Typography>
      </Box>
    </Modal>
  );
};

export default AppointmentModal;
