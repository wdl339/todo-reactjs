import moment from 'moment';
import React from 'react';
import { formatTimeWithWeekDay } from '../util/time';

const ProgressBar = ({ deadline, dateTime }) => {
    if (deadline){
        const deadlineDate = moment(deadline).subtract(8, 'hours');
        const dateTimeDate = moment(dateTime).subtract(8, 'hours');
        const currentDate = moment();
        const timeDiff = deadlineDate - currentDate;
        const totalDiff = deadlineDate - dateTimeDate;
        let progress = Math.floor((timeDiff / totalDiff) * 100);

        if (progress === 0 && timeDiff > 0) {
            progress = 1;
        }
    
        if (progress > 50 && progress <= 100) {
        return (
            <div className="progress col-12">
                <div className="progress-bar" role="progressbar" style={{ width: `${progress}%`}} aria-valuemin="0" aria-valuemax="100">
                    {formatTimeWithWeekDay(moment(deadline))}
                </div>
            </div>
        );
        } else if(progress > 0 && progress <= 50){
            return (
                <div className="progress col-12">
                    <div className="progress-bar" role="progressbar" style={{ width: `${progress}%`}} aria-valuemin="0" aria-valuemax="100">
                    </div>
                    <p>{formatTimeWithWeekDay(moment(deadline))}</p>
                </div>
            );
        } else {
            return null;
        }
    } else {
        return null;
        }
  };

export default ProgressBar;