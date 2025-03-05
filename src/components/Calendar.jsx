import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns';
import { Fragment, useState } from 'react';


const initialMeetings = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2025-02-17T13:00',
    endDatetime: '2025-02-17T14:30',
  },
  // Add more meetings here
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Calendar() {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  const [meetings, setMeetings] = useState(initialMeetings);
  let [newEvent, setNewEvent] = useState({ title: '', startTime: '', endTime: '' });
  let [showForm, setShowForm] = useState(false);


  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
  );

  const handleClick = (day) => {
    setSelectedDay(day)
    setShowForm(true)
    
  }


  const handleAddEvent = () => {
    if (!newEvent.title.trim()) return;

    const newEventObj = {
      id: meetings.length + 1,
      name: newEvent.title,
      imageUrl: 'https://via.placeholder.com/40',
      startDatetime: `${format(selectedDay, 'yyyy-MM-dd')}T${newEvent.startTime}`,
      endDatetime: `${format(selectedDay, 'yyyy-MM-dd')}T${newEvent.endTime}`,
    };

    setMeetings([...meetings, newEventObj]);
    setNewEvent({ title: '', startTime: '', endTime: '' });
    setShowForm(false); // Hide form after adding event
  };


  return (
    <div className="pt-16 max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
      <div className="md:grid md:grid-cols-2 md:divide-x md:divide-rose-300">
        <div className="md:pr-14">
          <div className="flex items-center">
            <h2 className="flex-auto font-semibold text-rose-950">
              {format(firstDayCurrentMonth, 'MMMM yyyy')}
            </h2>
            <button onClick={previousMonth} className="p-1.5 text-rose-950 hover:text-rose-950">
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button onClick={nextMonth} className="p-1.5 text-rose-950 hover:text-rose-950">
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-rose-950">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div key={`${day}-${index}`}>{day}</div> 
            ))}
          </div>
          <div className="grid grid-cols-7 mt-2 text-sm">
            {days.map((day, dayIdx) => (
              <div key={day.toString()} className="py-1.5">
                   <button onClick={() => handleClick(day)} className="mx-auto flex h-8 w-8 items-center justify-center rounded-full hover:bg-rose-500">
                {/* <button onClick={() => setSelectedDay(day)} className="mx-auto flex h-8 w-8 items-center justify-center rounded-full hover:bg-rose-500"> */}
                  <time>{format(day, 'd')}</time>
                </button>
              </div>
            ))}
          </div>
        </div>
        <section className="mt-12 md:mt-0 md:pl-14">
          <h2 className="font-semibold text-gray-900">Schedule for {format(selectedDay, 'MMM dd, yyyy')}</h2>
          <ol className="mt-4 space-y-1 text-sm leading-6 text-rose-950">
            {selectedDayMeetings.length > 0 ? (
              selectedDayMeetings.map((meeting) => <Meeting meeting={meeting} key={meeting.id}  setMeetings={setMeetings}/>)
            ) : (
              <p>No meetings for today.</p>
            )}
          </ol>

           {/* Event Creation Form */}
           {showForm && (
            <div className="mt-5 p-4 w-70 h-65 bg-rose-200 rounded-md opacity-75 border-rose-300 text-rose-950">
              <h3 className="text-lg font-semibold">Add Event</h3>
              <input
                type="text"
                name="title"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="block border p-2 my-2 w-full text-rose-950 hover:bg-rose-500"
              />
              <input
                type="time"
                name="startTime"
                value={newEvent.startTime}
                onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                className="block border p-2 my-2 w-full  hover:bg-rose-500"
              />
              <input
                type="time"
                name="endTime"
                value={newEvent.endTime}
                onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                className="block border p-2 my-2 w-full hover:bg-rose-500"
              />
              <button
                onClick={handleAddEvent}
                className="bg-rose-500 border-rose-300 text-rose-950 px-4 py-2 mb-0.5 rounded-md"
              >
                Add Event
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Meeting({ meeting, setMeetings }) {
  let startDateTime = parseISO(meeting.startDatetime);
  let endDateTime = parseISO(meeting.endDatetime);

  
  const onDelete = (id) =>{
    setMeetings((prevMeeting)=> prevMeeting.filter(meeting => id !== meeting.id))
  }

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl hover:bg-rose-500 bg-rose-200 opacity-75 border-rose-300">
      <img src={meeting.imageUrl} alt="" className="w-10 h-10 rounded-full" />
      <div className="flex-auto">
        <p className="text-rose-950">{meeting.name}</p>
        <p className="mt-0.5">
          <time>{format(startDateTime, 'h:mm a')}</time> - <time>{format(endDateTime, 'h:mm a')}</time>
        </p>
      </div>

      {/* Delete Button with Trash Icon */}
      <button
        onClick={() => onDelete(meeting.id)}  // Function to delete meeting
        className="p-2 text-red-600 hover:text-red-800"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </li>
  );
}
