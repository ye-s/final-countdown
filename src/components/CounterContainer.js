import React, { Component } from 'react';
import MeasureUnit from './MeasureUnit';
import { defineMessages, injectIntl } from 'react-intl';

import style from 'styled-components';

const CounterWrapper = style.div`
    display: inline-block
    padding: 10px;
    margin: 0 auto;
    min-width: 500px;
    max-width: 800px;
`
const HeaderWrapper = style.div`
    display: inline-block
`

const CounterHeader = style.p`
    margin-left: 20px;
    text-align: left;
    letter-spacing: 5px;
`

const messages = defineMessages({
    'start': {
        id: 'counter.start',
        defaultMessage: 'STARTS IN',
    },
    'seconds': {
        id: 'counter.seconds',
        defaultMessage: 'SECONDS',
    },
    'minutes': {
        id: 'counter.minutes',
        defaultMessage: 'MINUTES',
    },
    'hours': {
        id: 'counter.hours',
        defaultMessage: 'HOURS',
    },
    'days': {
        id: 'counter.days',
        defaultMessage: 'DAYS',
    },
    'months': {
        id: 'counter.months',
        defaultMessage: 'MONTHS',
    },
    'years': {
        id: 'counter.years',
        defaultMessage: 'YEARS',
    }
  });

class CounterContainer extends Component {
    state = { 
        timeLeft: {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        },
        isMonthSelected: false,
        isYearSelected: false
    };

    componentDidMount() {
        //updates states every second with new value
        this.intervalID = setInterval(
          () => this.updateTime(),
          1000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.finalTime !== this.props.finalTime) {
            this.setState({
                finalTime: nextProps.finalTime
            });
        }
        if(nextProps.isMonthSelected !== this.props.isMonthSelected) {
            this.setState({
                isMonthSelected: nextProps.isMonthSelected
            });
        }
        if(nextProps.isYearSelected !== this.props.isYearSelected) {
            this.setState({
                isYearSelected: nextProps.isYearSelected
            });
        }
    }

    updateTime() {
        const newCurrentTime = new Date();
        this.setState({
            currentTime: newCurrentTime,
            timeLeft: this.calculateTimeTillFinish(newCurrentTime)
        });
    }

    // calculates time to finish for all time measure units
    calculateTimeTillFinish(currentTime) {
        const finalTime = Date.parse(this.props.finalTime || this.state.finalTime);
        const timeLeft = {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        const secondsInMinute = 60;
        const minutesInHour = 60;
        const secondsInHour = secondsInMinute * minutesInHour;
        const secondsInDay = secondsInMinute * minutesInHour * 24;
        const daysInYear = 365.25;
        let timeDiff = 0;

        if ((finalTime - currentTime) > 0) {
            timeDiff = (finalTime - currentTime) / 1000;
        } else {
            return timeLeft;
        }

        // checks if timeDiff is more than one unit (year, day etc.), if no unit = 0 
        if (timeDiff >= (daysInYear * secondsInDay)) {
            timeLeft.years = Math.floor(timeDiff / (daysInYear * secondsInDay));
            // if year is not selected, we need to calculate total months
            if (this.state.isYearSelected) {
                timeDiff -= timeLeft.years * daysInYear * secondsInDay;
            }
        }

        if (timeDiff >= (daysInYear * secondsInDay / 12)) {
            timeLeft.months = Math.floor(timeDiff / (daysInYear * secondsInDay / 12));
            // if months is not selected, we need to calculate total days
            if (this.state.isMonthSelected) {
                timeDiff -= timeLeft.months * (daysInYear * secondsInDay / 12);
            }
        }

        // if month is applied fix days to be no more than 30
        if (timeDiff >= secondsInDay) {
            timeLeft.days = Math.floor(timeDiff / secondsInDay);
            timeDiff -= timeLeft.days * secondsInDay;
        }

        if (timeDiff >= secondsInHour) {
            timeLeft.hours = Math.floor(timeDiff / secondsInHour);
            timeDiff -= timeLeft.hours * secondsInHour;
        }

        if (timeDiff >= secondsInMinute) {
            timeLeft.minutes = Math.floor(timeDiff / secondsInMinute);
            timeDiff -= timeLeft.minutes * secondsInMinute;
        }

        timeLeft.seconds = Math.trunc(timeDiff);

        return timeLeft;
    }
    
    showAdditionalUnit(unit) {
        if (unit === 'month') {
            return 
        }
    }

    render() {
        const { years, months, days, hours, minutes, seconds } = this.state.timeLeft;
        const formatMessage = this.props.intl.formatMessage;
        const startMessage = formatMessage(messages.start);
        const secondsMessage = formatMessage(messages.seconds, {currentSeconds:seconds});
        const minutesMessage = formatMessage(messages.minutes, {currentMinutes:minutes});
        const hoursMessage = formatMessage(messages.hours, {currentHours:hours});
        const daysMessage = formatMessage(messages.days, {currentDays:days});
        const monthsMessage = formatMessage(messages.months, {currentMonths:months});
        const yearsMessage = formatMessage(messages.years, {currentYears:years});


        return (
            <CounterWrapper>
                <CounterHeader>{startMessage}</CounterHeader>
                { this.state.isYearSelected 
                    ? <MeasureUnit
                        unitType={yearsMessage}
                        unitValue={years}
                    />
                    : null
                }
                { this.state.isMonthSelected 
                    ? <MeasureUnit
                        unitType={monthsMessage}
                        unitValue={months}
                    />
                    : null
                }

                <MeasureUnit
                    unitType={daysMessage}
                    unitValue={days}
                />
                <MeasureUnit
                    unitType={hoursMessage}
                    unitValue={hours}
                />
                <MeasureUnit
                    unitType={minutesMessage}
                    unitValue={minutes}
                />
                <MeasureUnit
                    unitType={secondsMessage}
                    unitValue={seconds}
                />
            </CounterWrapper>
        )
    }
}
export default injectIntl(CounterContainer);