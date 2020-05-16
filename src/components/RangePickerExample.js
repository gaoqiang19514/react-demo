import React, { Component } from "react";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const DIFF = 7;

class DatePickerExample extends Component {
  state = { dates: [] };

  disabledDate = (currDate) => {
    const [startDate, endDate] = this.state.dates;

    if (!currDate || (!startDate && !endDate)) {
      return false;
    }

    if (startDate) {
      return (
        startDate.diff(currDate, "days") > DIFF ||
        currDate.diff(startDate, "days") > DIFF
      );
    }

    if (endDate) {
      return (
        endDate.diff(currDate, "days") > DIFF ||
        currDate.diff(endDate, "days") > DIFF
      );
    }

    return false;
  };

  onCalendarChange = (dates) => {
    this.setState({ dates: dates || [] });
  };

  render() {
    return (
      <div>
        <RangePicker
          disabledDate={this.disabledDate}
          onCalendarChange={this.onCalendarChange}
        />
      </div>
    );
  }
}

export default DatePickerExample;
