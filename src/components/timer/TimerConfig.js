import PropTypes from "prop-types";

import { Time } from "./Time";

export const TimerConfig = ({
  timerTimeOptions,
  changeTimerTimeOptions,
  plusNull,
  unitOfTime,
  changeUnitOfTime,
  styleTimerTimeOptions,
  changeStyleTimerTimeOptions,
  resetStylesForDial,
}) => {
  return (
    <div className="timer_config">
      <Time
        timerTimeOptions={timerTimeOptions}
        changeTimerTimeOptions={changeTimerTimeOptions}
        namesOfUnitsOfTime={["workMinutes", "workSeconds"]}
        title="Work Time"
        plusNull={plusNull}
        unitOfTime={unitOfTime}
        changeUnitOfTime={changeUnitOfTime}
        styleTimerTimeOptions={styleTimerTimeOptions}
        namesStylesUnitsOfTime={["stylesForMinutes", "stylesForSeconds"]}
        changeStyleTimerTimeOptions={changeStyleTimerTimeOptions}
        resetStylesForDial={resetStylesForDial}
      />

      <Time
        timerTimeOptions={timerTimeOptions}
        changeTimerTimeOptions={changeTimerTimeOptions}
        namesOfUnitsOfTime={["breakMinutes", "breakSeconds"]}
        title="Break Time"
        plusNull={plusNull}
        unitOfTime={unitOfTime}
        changeUnitOfTime={changeUnitOfTime}
        styleTimerTimeOptions={styleTimerTimeOptions}
        namesStylesUnitsOfTime={[
          "stylesForMinutesWork",
          "stylesForSecondsWork",
        ]}
        changeStyleTimerTimeOptions={changeStyleTimerTimeOptions}
        resetStylesForDial={resetStylesForDial}
      />
    </div>
  );
};

TimerConfig.propTypes = {
  timerTimeOptions: PropTypes.object.isRequired,
  changeTimerTimeOptions: PropTypes.func.isRequired,
  title: PropTypes.string,
  plusNull: PropTypes.func,
  unitOfTime: PropTypes.string.isRequired,
  changeUnitOfTime: PropTypes.func.isRequired,
  styleTimerTimeOptions: PropTypes.object,
  changeStyleTimerTimeOptions: PropTypes.func,
  resetStylesForDial: PropTypes.func,
};
