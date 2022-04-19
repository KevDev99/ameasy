import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useSelector } from 'react-redux';

/** Custom components */
import AppointmentModal from './AppointmentModal';

export const Calendar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { appointments, isLoading, isSuccess } = useSelector(
    (state) => state.appointment
  );

  const handleDateClick = (info) => {
    alert('Event: ' + info.event.title);
  }

  const handleNewAppointment = () => {
    handleOpen();
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        eventClick={handleDateClick}
        headerToolbar={{
          left: 'title',
          right: 'addAppointmentBtn today prev next'
        }}
        customButtons={{
          addAppointmentBtn: {
            text: 'New',
            click: handleNewAppointment
          }
        }}
        events={appointments}
      />
      <AppointmentModal open={open} handleClose={handleClose} handleOpen={handleOpen} />
    </>

  )
}
