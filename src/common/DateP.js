import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useDispatch} from 'react-redux';
import Button from './mini/Button';
import {useQuery} from '../utills/hooks/useQuery';
import moment from 'moment';

const DateP = ({id,defaultStart,defaultEnd}) => {
    const {query, setQuery} = useQuery();
    const {q, startDate, endDate} = query;


    const [date, setDate] = useState({
        startDateCurrent: startDate ? new Date(startDate) : defaultStart,
        endDateCurrent: endDate ? new Date(endDate) : defaultEnd,
    });


    const {startDateCurrent, endDateCurrent} = date;


    const [active, setActive] = useState(false);



    console.log(startDate, "start")
    useEffect(() => {
        setDate({
            startDateCurrent: startDate ? new Date(startDate) : defaultStart,
            endDateCurrent: endDate ? new Date(endDate) : defaultEnd,
        });
    }, [startDate, endDate]);




    return (
        <div className="date">
            <DatePicker
                showYearDropdown
                yearDropdownItemNumber={15} // Кол-во лет в списке
                scrollableYearDropdown
                selected={startDateCurrent}
                onChange={(dateVal) => {
                    setDate(prev => ({...prev, startDateCurrent: dateVal}));
                    setActive(true);
                }}
                dateFormat="dd-MM-yyyy"
                onKeyDown={e => e.preventDefault()}
            />
            <div className="start-end"><h1>-</h1></div>
            <DatePicker
                showYearDropdown
                yearDropdownItemNumber={15} // Кол-во лет в списке
                scrollableYearDropdown
                selected={endDateCurrent}
                onChange={(dateVal) => {
                    setDate(prev => ({...prev, endDateCurrent: dateVal}));
                    setActive(true);
                }}
                dateFormat="dd-MM-yyyy"
                onKeyDown={e => e.preventDefault()}
            />
            <div className="date-button">
                <Button
                    onClick={() => {
                        const start = moment(startDateCurrent).format('YYYY-MM-DD');
                        const end = moment(endDateCurrent).format('YYYY-MM-DD');
                        setQuery({q: 'statistics', startDate: start, endDate: end})
                        setActive(false)
                    }
                    }
                    className={active ? 'active-d' : 'active-button-d'}
                >
                    Confirm
                </Button>
            </div>
        </div>
    );
};

export default DateP;
