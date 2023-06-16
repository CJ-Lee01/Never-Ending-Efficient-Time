import { Grid, Stack, Image } from "@chakra-ui/react";
import { FC, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventListInfoContext } from "@/app/(User supposed to see if logged in)/calendar/page";

const CalendarGrid: FC = ({ }) => {
  const { events, pageUpdater } = useContext(EventListInfoContext);
  console.log(events)
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        nowIndicator={true}
        editable={false}
        selectable={true}
        selectMirror={true}
        events={events.map(item => {
          return {
            title: item.event_name,
            start: item.start_time,
            end: item.end_time,
          }
        })}
      />
    </div>
  );
};

export default CalendarGrid;
