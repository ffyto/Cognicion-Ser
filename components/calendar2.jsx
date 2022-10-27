import React from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/components/calendar.module.scss';
import { getAllNonAvailableHours } from '../services/nonAvailableHours';

registerLocale('es', es);

const filterDays = date => {
  const nonAvailableDays = new Date();
  const today = new Date(date);
  nonAvailableDays.setDate(nonAvailableDays.getDate() + 3);
  const day = date.getDay();

  return day !== 0 && day !== 6 && nonAvailableDays <= today;
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const { time, day } = this.props;
    this.state = {
      selectedTime: time,
      selectedDate: day,
      excludedTimes: [],
      arrDates: [],
    };
  }

  componentDidMount() {
    const exclude = [];

    const fetchData = async () => {
      const nonAvailableHours = await getAllNonAvailableHours();
      nonAvailableHours.forEach(nonAvailableHour => {
        const year = parseInt(nonAvailableHour.day.split('/')[2], 10);
        const month = parseInt(nonAvailableHour.day.split('/')[1], 10);
        const day = parseInt(nonAvailableHour.day.split('/')[0], 10);
        const hour = parseInt(nonAvailableHour.hour.split(':')[0], 10);
        const minute = parseInt(nonAvailableHour.hour.split(':')[1], 10);
        exclude.push(new Date(year, month - 1, day, hour, minute));
      });
    };
    fetchData();
    this.setState({
      arrDates: exclude,
    });
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
    const { arrDates } = this.state;
    const arrSpecificDates = [];
    for (let i = 0; i < arrDates.length; i += 1) {
      if (
        moment(date, moment.ISO_8601).format('YYYY/MM/DD') ===
        moment(arrDates[i], moment.ISO_8601).format('YYYY/MM/DD')
      ) {
        arrSpecificDates.push(moment(arrDates[i], moment.ISO_8601).toObject());
      }
    }

    const arrExcludedTimes = [];

    for (let i = 0; i < arrSpecificDates.length; i += 1) {
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
          filterDate={filterDays}
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
          placeholderText='Seleccione una hora'
        />
      </div>
    );
  }
}

Calendar.propTypes = {
  time: PropTypes.instanceOf(Date),
  day: PropTypes.instanceOf(Date),
  setDay: PropTypes.func,
  setTime: PropTypes.func,
};
Calendar.defaultProps = {
  time: null,
  day: null,
  setDay: () => null,
  setTime: () => null,
};

export default Calendar;
