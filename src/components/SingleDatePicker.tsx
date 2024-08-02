import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SingleDatePicker: React.FC<any> = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date: any) => setStartDate(date)}
      />
    </>
  );
};

export default SingleDatePicker;
