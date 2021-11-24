import React, { useState } from "react";
import PropTypes from "prop-types";

import arrow from "../../img/upload.svg";

export const Time = ({
  timerTimeOptions,
  changeTimerTimeOptions,
  namesOfUnitsOfTime,
  title,
  plusNull,
  unitOfTime,
  changeUnitOfTime,
  styleTimerTimeOptions,
  namesStylesUnitsOfTime,
  changeStyleTimerTimeOptions,
  resetStylesForDial,
}) => {
  const [intervalForHold, setIntervalForHold] = useState();
  const [timeOutForHold, setTimeOutForHold] = useState();
  const [hold, setHold] = useState(false);

  const [unitOfTimeMinute, unitOfTimeSecond] = namesOfUnitsOfTime;
  const [styleUnitOfTimeMinute, styleUnitOfTimeSecond] = namesStylesUnitsOfTime;

  let minutes = timerTimeOptions[unitOfTimeMinute];
  let seconds = timerTimeOptions[unitOfTimeSecond];

  let stylesForMinutes = styleTimerTimeOptions[styleUnitOfTimeMinute];
  let stylesForSeconds = styleTimerTimeOptions[styleUnitOfTimeSecond];

  if (seconds > 60) changeTimerTimeOptions(unitOfTimeSecond, 0);
  if (minutes > 60) changeTimerTimeOptions(unitOfTimeMinute, 0);
  if (seconds < 0) changeTimerTimeOptions(unitOfTimeSecond, 60);
  if (minutes < 0) changeTimerTimeOptions(unitOfTimeMinute, 60);

  const arrowButtonClick = (button) => {
    if (button === "up") {
      if (unitOfTime === "minutes")
        return changeTimerTimeOptions(unitOfTimeMinute, ++minutes);
      else if (unitOfTime === "seconds")
        return changeTimerTimeOptions(unitOfTimeSecond, ++seconds);
      else {
        unitOfTimeMinutesByDefault();
        changeTimerTimeOptions(unitOfTimeMinute, ++minutes);
        return;
      }
    }
    if (button === "down") {
      if (unitOfTime === "minutes")
        return changeTimerTimeOptions(unitOfTimeMinute, --minutes);
      else if (unitOfTime === "seconds")
        return changeTimerTimeOptions(unitOfTimeSecond, --seconds);
      else {
        unitOfTimeMinutesByDefault();
        changeTimerTimeOptions(unitOfTimeMinute, --minutes);
        return;
      }
    }
  };

  const unitOfTimeMinutesByDefault = () => {
    changeUnitOfTime("minutes");
    changeStyleTimerTimeOptions(styleUnitOfTimeSecond, {});
    changeStyleTimerTimeOptions(styleUnitOfTimeMinute, {
      backgroundColor: "white",
    });
  };

  const arrowButtonHold = (button, ev) => {
    if (button === "up") {
      if (unitOfTime === "minutes") {
        if (ev === "onMouseDown") {
          setIntervalForHold(
            setInterval(
              () => changeTimerTimeOptions(unitOfTimeMinute, ++minutes),
              150
            )
          );
          return setHold(true);
        }
        if (ev === "onMouseUp") {
          clearInterval(intervalForHold);
          return setHold(false);
        }
      }

      if (unitOfTime === "seconds") {
        if (ev === "onMouseDown") {
          setIntervalForHold(
            setInterval(
              () => changeTimerTimeOptions(unitOfTimeSecond, ++seconds),
              150
            )
          );
          return setHold(true);
        }
        if (ev === "onMouseUp") {
          clearInterval(intervalForHold);
          return setHold(false);
        }
      }
    }

    if (button === "down") {
      if (unitOfTime === "minutes") {
        if (ev === "onMouseDown") {
          setIntervalForHold(
            setInterval(
              () => changeTimerTimeOptions(unitOfTimeMinute, --minutes),
              150
            )
          );
          return setHold(true);
        }
        if (ev === "onMouseUp") {
          clearInterval(intervalForHold);
          return setHold(false);
        }
      }

      if (unitOfTime === "seconds") {
        if (ev === "onMouseDown") {
          setIntervalForHold(
            setInterval(
              () => changeTimerTimeOptions(unitOfTimeSecond, --seconds),
              150
            )
          );
          return setHold(true);
        }
        if (ev === "onMouseUp") {
          clearInterval(intervalForHold);
          return setHold(false);
        }
      }
    }
  };

  return (
    <div className="component_time" onMouseEnter={resetStylesForDial}>
      <h2>{title}</h2>
      <button
        data-direction="up"
        className="work_time_button"
        onClick={(event) => {
          arrowButtonClick(event.target.dataset.direction);
        }}
        onMouseDown={(event) => {
          setTimeOutForHold(
            setTimeout(() => {
              arrowButtonHold(event.target.dataset.direction, "onMouseDown");
            }, 200)
          );
        }}
        onMouseUp={(event) => {
          clearTimeout(timeOutForHold);
          if (hold)
            arrowButtonHold(event.target.dataset.direction, "onMouseUp");
        }}
      >
        <img src={arrow} alt="tomato" className="arrow" data-direction="up" />
      </button>

      <div className="time">
        <button
          className="button minutes"
          style={stylesForMinutes}
          onClick={() => {
            changeUnitOfTime("minutes");
            changeStyleTimerTimeOptions(styleUnitOfTimeSecond, {});
            changeStyleTimerTimeOptions(styleUnitOfTimeMinute, {
              backgroundColor: "white",
            });
          }}
        >
          <p>{plusNull(minutes)}</p>
        </button>

        <p className="time_colon"> : </p>
        <button
          style={stylesForSeconds}
          className="button seconds"
          onClick={() => {
            changeUnitOfTime("seconds");
            changeStyleTimerTimeOptions(styleUnitOfTimeMinute, {});
            changeStyleTimerTimeOptions(styleUnitOfTimeSecond, {
              backgroundColor: "white",
            });
          }}
        >
          <p>{plusNull(seconds)}</p>
        </button>
      </div>
      <button
        className="work_time_button"
        data-direction="down"
        onClick={(event) => {
          arrowButtonClick(event.target.dataset.direction);
        }}
        onMouseDown={(event) => {
          setTimeOutForHold(
            setTimeout(() => {
              arrowButtonHold(event.target.dataset.direction, "onMouseDown");
            }, 200)
          );
        }}
        onMouseUp={(event) => {
          clearTimeout(timeOutForHold);
          if (hold)
            arrowButtonHold(event.target.dataset.direction, "onMouseUp");
        }}
      >
        <img
          src={arrow}
          alt="tomato"
          className="arrow down"
          data-direction="down"
        />
      </button>
    </div>
  );
};

Time.propTypes = {
  timerTimeOptions: PropTypes.object.isRequired,
  changeTimerTimeOptions: PropTypes.func.isRequired,
  namesOfUnitsOfTime: PropTypes.array.isRequired,
  title: PropTypes.string,
  plusNull: PropTypes.func,
  unitOfTime: PropTypes.string.isRequired,
  changeUnitOfTime: PropTypes.func.isRequired,
  styleTimerTimeOptions: PropTypes.object,
  namesStylesUnitsOfTime: PropTypes.array,
  changeStyleTimerTimeOptions: PropTypes.func,
  resetStylesForDial: PropTypes.func,
};
