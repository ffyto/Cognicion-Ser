import React from 'react';
import moment from 'moment';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/components/calendar.module.scss';
import { getAllNonAvailableHours } from '../services/nonAvailableHours';

registerLocale('es', es);

const arrDates = [
  new Date(2022, 8, 30, 8, 15), //Thu May 20 2021 08:15:00
  new Date(2022, 8, 30, 10, 0), //Fri May 20 2021 08:45:00
  new Date(2021, 4, 21, 8, 30), //Sat May 21 2021 08:30:00
  new Date(2021, 4, 21, 9, 0), //Sat May 21 2021 09:00:00
  new Date(9, 0), //Sat May 21 2021 09:00:00
];

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTime: this.props.time,
      selectedDate: this.props.day,
      excludedTimes: [],
    };
  }

  handleSelectedDate = date => {
    const { setDay } = this.props;
    setDay(date);
    this.setState({
      selectedDate: date,
    });
  };

  handleSelectedTime = time => {
    const { setTime } = this.props;
    setTime(time);
    this.setState({
      selectedTime: time,
    });
  };

  getExcludedTimes = date => {
    this.setState({
      excludedTimes: [],
    });

    let arrSpecificDates = [];
    for (let i = 0; i < arrDates.length; i++) {
      if (
        moment(date, moment.ISO_8601).format('YYYY/MM/DD') ===
        moment(arrDates[i], moment.ISO_8601).format('YYYY/MM/DD')
      ) {
        arrSpecificDates.push(moment(arrDates[i], moment.ISO_8601).toObject());
      }
    }

    let arrExcludedTimes = [];

    for (let i = 0; i < arrSpecificDates.length; i++) {
      arrExcludedTimes.push(
        setHours(
          setMinutes(new Date(), arrSpecificDates[i].minutes),
          arrSpecificDates[i].hours
        )
      );
      this.setState({
        excludedTimes: arrExcludedTimes,
      });
    }
  };

  filterDays = date => {
    let nonAvailableDays = new Date();
    const today = new Date(date);
    nonAvailableDays.setDate(nonAvailableDays.getDate() + 3);
    const day = date.getDay();

    return day !== 0 && day !== 6 && nonAvailableDays <= today;
  };

  restartTime = () => {
    this.setState({ selectedTime: null });
  };

  render() {
    const { selectedDate, excludedTimes, selectedTime } = this.state;
    return (
      <div className='container'>
        <DatePicker
          locale='es'
          onBlur={this.restartTime}
          className={styles.calendar}
          selected={selectedDate}
          onChange={this.handleSelectedDate}
          onSelect={this.getExcludedTimes}
          popperPlacement='top-start'
          dateFormat='dd/MM/yyyy'
          minDate={new Date()}
          filterDate={this.filterDays}
          withPortal
          placeholderText='Seleccione una fecha'
        />
        <DatePicker
          className={styles.calendar}
          selected={selectedTime}
          onChange={this.handleSelectedTime}
          excludeTimes={excludedTimes.concat([
            setHours(setMinutes(new Date(), 0), 12),
            setHours(setMinutes(new Date(), 0), 13),
          ])}
          popperPlacement='top-start'
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          timeFormat='HH:mm'
          dateFormat='hh:mm aa'
          minDate={new Date()}
          minTime={setHours(setMinutes(new Date(), 0), 8)}
          maxTime={setHours(setMinutes(new Date(), 0), 18)}
          withPortal
          placeholderText='Seleccione una hora'
        />
      </div>
    );
  }
}
export default Calendar;
