import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useDispatch,useSelector } from "react-redux";

/** Custom components */
import AppointmentModal from "./AppointmentModal";

import { useEffect } from 'react';
import { fetchAppointments } from '../features/appointment/appointmentSlice';


export const Calendar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();


  const { appointments, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.appointment
  );

  useEffect(() => {
    dispatch(fetchAppointments());
  }, []);

  const handleDateClick = (info) => {
    alert("Event: " + info.event.title);
  };

  const handleNewAppointment = () => {
    handleOpen();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!appointments) {
    return <p>No appointments found.</p>;
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        eventClick={handleDateClick}
        headerToolbar={{
          left: "title",
          right: "addAppointmentBtn today prev next",
        }}
        customButtons={{
          addAppointmentBtn: {
            text: "New",
            click: handleNewAppointment,
          },
        }}
        events={appointments}
      />
      <AppointmentModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </>
  );
};
