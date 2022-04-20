import React, { useState } from "react";
import { useSelector } from "react-redux";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
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

  const [status, setStatus] = useState();

  if (!appointment) return <p></p>

  console.log(appointment);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          <Typography sx={{ borderBottom: '1px solid black' }} id="modal-modal-title" variant="h6" component="h2">
            {appointment.title}
          </Typography>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Open</MenuItem>
              <MenuItem value={20}>Closed</MenuItem>
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
