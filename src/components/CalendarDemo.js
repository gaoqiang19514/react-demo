import React, { Component } from "react";
import { Calendar } from "antd";
import styled from "styled-components";

const CalendarContainer = styled.div`
  .ant-fullcalendar {
    overflow: auto;
  }
  .ant-fullcalendar-table {
    height: auto;
    thead {
      display: none;
    }
    .ant-fullcalendar-tbody {
      display: flex;
    }
    .ant-fullcalendar-last-month-cell {
      display: none;
    }
    .ant-fullcalendar-next-month-btn-day {
      display: none;
    }
  }
`;

class CalendarDemo extends Component {
  render() {
    return (
      <CalendarContainer>
        <Calendar fullscreen={false} />
      </CalendarContainer>
    );
  }
}

export default CalendarDemo;
