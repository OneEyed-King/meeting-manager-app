import React from 'react'

const EventForm = () => {
  return (
    <div>
        <h1>Name</h1>
        <input type="text" placeholder='Event Name'/>
        <h1>Start TIme</h1>
        <input type="text" placeholder='Start Time'/>
        <h1>End TIme</h1>
        <input type="text" placeholder='End Time'/>
    </div>
  )
}

export default EventForm