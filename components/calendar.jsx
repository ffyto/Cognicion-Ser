import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import styles from '../styles/components/calendar.module.scss';

registerLocale('es', es);

function Calendar() {
  const [startDate, setStartDate] = useState(null);

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

  excludeTimes.push(
    setHours(setMinutes(new Date('September 27, 2022 09:30:00'), 30), 9)
  );

  return (
    <div>
      <DatePicker
        locale='es'
        placeholderText='Seleccione uno de los espacios disponibles...'
        selected={startDate}
        onChange={date => setStartDate(date)}
        className={styles.calendar}
        showTimeSelect
        filterTime={filterPassedTime}
        filterDate={filterDays}
        dateFormat='dd/MM/yyyy h:mm aa'
        excludeTimes={excludeTimes}
      />
    </div>
  );
}

export default Calendar;
