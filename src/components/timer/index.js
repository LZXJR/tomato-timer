import { useState, useEffect, useRef } from "react";

import { YourTomatoes } from "./YourTomatoes";
import { Time } from "./Time";
import { Deduction } from "./Deduction";
import { TimerConfig } from "../timer/TimerConfig";
import tomatoLeaf from "../../img/leaf.svg";
import { Error } from "../Error";
import { ButtonSound } from "./ButtonSound";

import { detectBrowser } from "../../functions/detectBrowser";

import tomatoSound from "../../sounds/cartoon-bubble-pop-01-.mp3";

export const TomatoTimer = () => {
  const [timerTimeOptions, setTimerTimeOptions] = useState({
    workMinutes: 0,
    workSeconds: 20,
    breakMinutes: 0,
    breakSeconds: 10,
    bigBreakMinutes: 0,
    bigBreakSeconds: 30,
  });
  const [tomatoes, setTomatoes] = useState(1);
  const [unitOfTime, setUnitOfTime] = useState("seconds");

  const [styleTimerTimeOptions, setStyleTimerTimeOptions] = useState({
    stylesForMinutes: {},
    stylesForSeconds: {},
    stylesForMinutesWork: {},
    stylesForSecondsWork: {},
  });

  const [userBrowser, setUserBrowser] = useState(null);

  const [tomatoTimerPage, setTomatoTimerPage] = useState(1);

  const numberOfPages = 3;

  const tomatoAudio = useRef(null);

  const plusNull = (seconds) => (seconds < 10 ? "0" + seconds : seconds);

  const changeTimerTimeOptions = (name, value) => {
    setTimerTimeOptions((options) => {
      return { ...options, [name]: value };
    });
  };

  const changeStyleTimerTimeOptions = (name, value) => {
    setStyleTimerTimeOptions((options) => {
      return { ...options, [name]: value };
    });
  };

  const changeUnitOfTime = (value) => setUnitOfTime(value);

  const changeTomatoes = (value) => setTomatoes(value);

  const resetStylesForDial = (event) => {
    const selectedElementClassName = event.relatedTarget.className;

    if (selectedElementClassName !== "timer_form") {
      changeStyleTimerTimeOptions("stylesForMinutes", {});
      changeStyleTimerTimeOptions("stylesForSeconds", {});
      changeStyleTimerTimeOptions("stylesForMinutesWork", {});
      changeStyleTimerTimeOptions("stylesForSecondsWork", {});
      setUnitOfTime("");
    }
  };

  const nextPage = () => {
    if (tomatoTimerPage + 1 <= numberOfPages)
      setTomatoTimerPage((state) => ++state);
  };

  const pastPage = () => {
    if (tomatoTimerPage - 1 > 0) setTomatoTimerPage((state) => --state);
  };
  const stylesDependOnThePagesButtonOk = () =>
    tomatoTimerPage === numberOfPages ? { opacity: 0 } : { opacity: 1 };

  const stylesDependOnThePagesButtonBack = () =>
    tomatoTimerPage === 1 ? { opacity: 0 } : { opacity: 1 };

  const presenceOfZeroInTheDial = () => {
    switch (tomatoTimerPage) {
      case 1:
        if (
          (timerTimeOptions.breakMinutes > 0 ||
            timerTimeOptions.breakSeconds > 0) &&
          (timerTimeOptions.workMinutes > 0 || timerTimeOptions.workSeconds > 0)
        )
          return false;
        break;
      case 2:
        if (
          timerTimeOptions.bigBreakMinutes > 0 ||
          timerTimeOptions.bigBreakSeconds > 0
        )
          return false;
        break;
      default:
        return null;
    }
  };

  const bigBreakTime = (
    <Time
      timerTimeOptions={timerTimeOptions}
      changeTimerTimeOptions={changeTimerTimeOptions}
      namesOfUnitsOfTime={["bigBreakMinutes", "bigBreakSeconds"]}
      title="Big Break Time"
      plusNull={plusNull}
      unitOfTime={unitOfTime}
      changeUnitOfTime={changeUnitOfTime}
      styleTimerTimeOptions={styleTimerTimeOptions}
      namesStylesUnitsOfTime={["stylesForMinutesWork", "stylesForSecondsWork"]}
      changeStyleTimerTimeOptions={changeStyleTimerTimeOptions}
      resetStylesForDial={resetStylesForDial}
    />
  );

  const pageContent = () => {
    switch (tomatoTimerPage) {
      case 1:
        return (
          <TimerConfig
            timerTimeOptions={timerTimeOptions}
            changeTimerTimeOptions={changeTimerTimeOptions}
            plusNull={plusNull}
            unitOfTime={unitOfTime}
            changeUnitOfTime={changeUnitOfTime}
            styleTimerTimeOptions={styleTimerTimeOptions}
            changeStyleTimerTimeOptions={changeStyleTimerTimeOptions}
            resetStylesForDial={resetStylesForDial}
          />
        );
      case 2:
        return bigBreakTime;
      case 3:
        return (
          <Deduction
            plusNull={plusNull}
            timerTimeOptions={timerTimeOptions}
            tomatoes={tomatoes}
            changeTomatoes={changeTomatoes}
            userBrowser={userBrowser}
          />
        );

      default:
        return (
          <Error
            errorTitle="ERROR !"
            errorText="Page not found! Please refresh page"
          />
        );
    }
  };

  const playAudio = (audio) => {
    audio.current.load();
    audio.current.play();
  };

  const safariSoundFix = () => {
    if (userBrowser === "Safari") return <ButtonSound audioRef={tomatoAudio} />;
  };

  useEffect(() => {
    setUserBrowser(detectBrowser());
  }, []);

  useEffect(() => {
    playAudio(tomatoAudio);
  }, [tomatoes]);

  return (
    <div className="timer_form_bg">
      <audio src={tomatoSound} ref={tomatoAudio} type="audio/mpeg" />
      <div className="timer_form">
        <h1>Tomato method</h1>
        {safariSoundFix()}
        <div className="timer">
          <YourTomatoes tomatoes={tomatoes} />
          {pageContent()}
        </div>
        <button
          style={stylesDependOnThePagesButtonOk()}
          className="timer_form_button"
          onClick={() => {
            if (presenceOfZeroInTheDial() === false) nextPage();
          }}
        >
          <p>ok</p>
          <img src={tomatoLeaf} alt="leaf" onMouseEnter={resetStylesForDial} />
        </button>

        <button
          style={stylesDependOnThePagesButtonBack()}
          className="timer_form_button back"
          onClick={() => {
            if (tomatoTimerPage === numberOfPages) setTomatoes(1);
            pastPage();
          }}
        >
          <p>back</p>
          <img onMouseEnter={resetStylesForDial} src={tomatoLeaf} alt="leaf" />
        </button>
      </div>

      <div className="horizontal_orientation_error">
        <Error
          errorTitle="ERROR !"
          errorText="This application is not optimized for horizontal use. Please change your orientation!"
        />
      </div>
    </div>
  );
};
