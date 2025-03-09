import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TimeSlotSelector = ({ onSelectTimeSlot }) => {
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 24; hour++) {
      for (let minute of ['00', '10', '20', '30', '40', '50']) {
        const startTime = `${hour}:${minute}`;
        const endMinute = parseInt(minute) + 10;
        const endHour = endMinute >= 60 ? hour + 1 : hour; 
        const formattedEndMinute = endMinute % 60; 
        const endTime = `${endHour}:${formattedEndMinute.toString().padStart(2, '0')}`;
        slots.push({ from: startTime, to: endTime });
      }
    }
    return slots;
  };

  const isTimeSlotPast = (slot) => {
    const now = new Date(); 
    const [startHour, startMinute] = slot.from.split(':');
    const slotTime = new Date();
    slotTime.setHours(parseInt(startHour), parseInt(startMinute), 0, 0); 

    return now > slotTime; 
  };

  return (
    <div className="time-slot-selector">
      <h3>Select Time Slot</h3>
      <div className="time-slots">
        {generateTimeSlots().map((slot, index) => {
          const isPast = isTimeSlotPast(slot); 
          return (
            <button
              key={index}
              className={`btn ${isPast ? 'btn-secondary' : 'btn-outline-primary'} m-1`}
              onClick={() => !isPast && onSelectTimeSlot(slot)} 
              disabled={isPast} 
            >
              {slot.from} - {slot.to}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotSelector;