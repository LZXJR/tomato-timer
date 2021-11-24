import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

export const Deduction = ({
  plusNull,
  timerTimeOptions,
  tomatoes,
  changeTomatoes,
  userBrowser,
}) => {
  let workMinutes = timerTimeOptions.workMinutes;
  let workSeconds = timerTimeOptions.workSeconds;
  let breakMinutes = timerTimeOptions.breakMinutes;
  let breakSeconds = timerTimeOptions.breakSeconds;
  let bigBreakMinutes = timerTimeOptions.bigBreakMinutes;
  let bigBreakSeconds = timerTimeOptions.bigBreakSeconds;

  const [minutes, setMinutes] = useState(workMinutes);
  const [seconds, setSeconds] = useState(workSeconds);
  const [workStatus, setWorkStatus] = useState(true);

  const calculationPixelsForAnimation = (minutes, seconds) =>
    253 / (minutes * 60 + seconds);

  const calculationPixelsForAnimationMemo = useMemo(
    () => calculationPixelsForAnimation(workMinutes, workSeconds),
    [workMinutes, workSeconds]
  );

  const timeLineAnimation = () =>
    setTimeLinePixels((pixels) => (pixels += pixelsForAnimation));

  const [timeLinePixels, setTimeLinePixels] = useState(0);
  const [pixelsForAnimation, setPixelsForAnimation] = useState(
    calculationPixelsForAnimationMemo
  );

  const deductionOfTime = () => {
    if (userBrowser !== "Safari") timeLineAnimation();
    setSeconds((seconds) => {
      if (seconds - 1 < 0) {
        setMinutes((state) => --state);
        return 59;
      }
      return seconds - 1;
    });
  };

  useEffect(() => {
    const setTimeoutDeduction = setTimeout(deductionOfTime, 982);
    return () => clearTimeout(setTimeoutDeduction);
  }, [deductionOfTime]);

  if (minutes - 1 < 0 && seconds - 1 < 0) {
    setTimeLinePixels(0);
    if (workStatus) {
      changeTomatoes(() => {
        if (tomatoes === 4) {
          setPixelsForAnimation(
            calculationPixelsForAnimation(bigBreakMinutes, bigBreakSeconds)
          );

          setMinutes(bigBreakMinutes);
          setSeconds(bigBreakSeconds);
          setWorkStatus(false);
          return tomatoes + 1;
        } else {
          setPixelsForAnimation(
            calculationPixelsForAnimation(breakMinutes, breakSeconds)
          );

          setMinutes(breakMinutes);
          setSeconds(breakSeconds);
          setWorkStatus(false);

          return tomatoes + 1;
        }
      });
    }

    if (workStatus === false) {
      if (tomatoes === 5) changeTomatoes(1);
      setPixelsForAnimation(calculationPixelsForAnimationMemo);

      setMinutes(workMinutes);
      setSeconds(workSeconds);
      setWorkStatus(true);
    }
  }

  return (
    <div className="deduction flex_center">
      <div className="deduction_timeline_form flex_center">
        <div
          className="deduction_timeline flex_center"
          style={{ transform: `translateY(${timeLinePixels}px)` }}
        ></div>
        <div className="deduction_form flex_center">
          <p>{plusNull(minutes)}</p>
          <p>:</p>
          <p>{plusNull(seconds)}</p>
        </div>
      </div>
    </div>
  );
};

Deduction.propTypes = {
  plusNull: PropTypes.func.isRequired,
  timerTimeOptions: PropTypes.object.isRequired,
  tomatoes: PropTypes.number.isRequired,
  changeTomatoes: PropTypes.func.isRequired,
  userBrowser: PropTypes.string,
};
