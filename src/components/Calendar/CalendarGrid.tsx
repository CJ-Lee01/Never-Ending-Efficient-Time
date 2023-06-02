import { Grid, Stack, Image } from "@chakra-ui/react";
import { FC } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const CalendarGrid: FC = ({}) => {
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
        editable={true}
        selectable={true}
        selectMirror={true}
        initialEvents={[{ title: "nice event", start: new Date() }]}
      />
    </div>
  );
};

export default CalendarGrid;
