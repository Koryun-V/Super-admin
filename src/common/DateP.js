import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {getBuyers, getStatistics} from '../store/actions/statistics';
import {useDispatch} from 'react-redux';
import Button from './mini/Button';
import {useQuery} from '../utills/hooks/useQuery';
import moment from 'moment';

const DateP = ({id}) => {
    const dispatch = useDispatch();
    const {query, setQuery} = useQuery();
    const {q, startDate, endDate} = query;

    const defaultStart = new Date('2025-04-01');
    const defaultEnd = new Date('2025-04-30');
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

    useEffect(() => {
        const start = moment(defaultStart).format('YYYY-MM-DD');
        const end = moment(defaultEnd).format('YYYY-MM-DD');
        if (startDate && endDate) {
            console.log("if")
            dispatch(getStatistics({id, startDate, endDate}));
            dispatch(getBuyers({id, startDate, endDate}));
        }
        else{
            console.log("else")
            dispatch(getStatistics({id, startDate: start, endDate: end}));
            dispatch(getBuyers({id, startDate: start, endDate: end}));
        }

    }, [startDate, endDate]);


    return (
        <div className="date">
            <DatePicker
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
