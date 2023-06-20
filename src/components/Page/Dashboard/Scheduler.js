import React, { useState } from 'react';

function Scheduler({ setIsScheduler}) {
  const [selectedDate, setSelectedDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventName, setEventName] = useState('');
  const [events, setEvents] = useState([]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTitleChange = (e) => {
    setEventTitle(e.target.value);
  };

  const handleNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleAddEvent = () => {
    if (selectedDate && eventTitle && eventName) {
      const newEvent = {
        date: selectedDate,
        title: eventTitle,
        name: eventName,
      };

      setEvents([...events, newEvent]);

      setSelectedDate('');
      setEventTitle('');
      setEventName('');
    }
  };

  return (
    <div>
      <h2>Calendar Scheduler</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={eventName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div>
        <label htmlFor="title">Event Title:</label>
        <input
          type="text"
          id="title"
          value={eventTitle}
          onChange={handleTitleChange}
        />
      </div>

      <button onClick={handleAddEvent}>Add Event</button>
      <button onClick={() => setIsScheduler(false)} className="btn btn-secondary mt-2">Cancel</button>
      <h3>Events:</h3>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <span>{event.name}</span> - <span>{event.date}</span> - <span>{event.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Scheduler;
