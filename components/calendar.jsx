import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import styles from '../styles/components/calendar.module.scss';

registerLocale('es', es);

function Calendar({ date, setDate }) {
  const [startDate, setStartDate] = useState(date);

  const filterDays = date => {
    let nonAvailableDays = new Date();
    const today = new Date(date);
    nonAvailableDays.setDate(nonAvailableDays.getDate() + 3);
    const day = date.getDay();

    return day !== 0 && day !== 6 && nonAvailableDays <= today;
  };

  const filterPassedTime = time => {
    let nonAvailableHours = new Date();
    const selectedDate = new Date(time);
    nonAvailableHours.setTime(nonAvailableHours.getTime() + 24 * 3600 * 1000);

    return nonAvailableHours.getTime() < selectedDate.getTime();
  };

  let excludeTimes = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j <= 30; j += 30) {
      excludeTimes.push(setHours(setMinutes(new Date(), j), i));
    }
  }

  for (let i = 12; i < 14; i++) {
    for (let j = 0; j <= 30; j += 30) {
      excludeTimes.push(setHours(setMinutes(new Date(), j), i));
    }
  }

  for (let i = 19; i < 24; i++) {
    for (let j = 0; j <= 30; j += 30) {
      excludeTimes.push(setHours(setMinutes(new Date(), j), i));
    }
  }

  let excludeDates = [];
  excludeTimes.push(setHours(setMinutes(new Date('2022-10-07T15:00'), 0), 15));

  const handleChange = date => {
    setStartDate(date);
    setDate(date);
  };

  return (
    <div>
      <DatePicker
        locale='es'
        placeholderText='Fechas disponibles...'
        selected={startDate}
        onChange={date => handleChange(date)}
        className={styles.calendar}
        filterTime={filterPassedTime}
        filterDate={filterDays}
        dateFormat='dd/MM/yyyy'
        excludeDates={excludeDates}
        fixedHeight
        withPortal
        isClearable
        timeIntervals={60}
      />
      <DatePicker
        excludeTimes={excludeTimes}
        popperPlacement='top-start'
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeFormat='HH:mm'
        dateFormat='hh:mm aa'
        minDate={new Date()}
      />
    </div>
  );
}

export default Calendar;
