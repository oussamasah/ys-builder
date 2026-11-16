import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import "./DatePickerSite.css";
import "react-datepicker/dist/react-datepicker.css";

import fr from "date-fns/locale/fr";

registerLocale("fr", fr);
export default function DatePickerSite() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const RangeFr = (update) => {
    setDateRange(update);
  };
  return (
    <div className="dateSite">
      <DatePicker
        locale="fr"
        placeholderText="Date de création"
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
          prevYearButtonDisabled,
          nextYearButtonDisabled,
          increaseYear,
          decreaseYear,
        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={increaseYear} disabled={prevYearButtonDisabled}>
              <i className="fa fa-angle-left" aria-hidden="true"></i>
            </button>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button onClick={decreaseYear} disabled={nextYearButtonDisabled}>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </button>
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <i className="fa fa-angle-left" aria-hidden="true"></i>
            </button>
            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </button>
          </div>
        )}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        dateFormat="dd/MM/yyyy"
        onChange={RangeFr}
        isClearable={true}
      />
    </div>
  );
}
