import { useState } from "react";
import PropTypes from "prop-types";

import soundOn from "../../img/sound-on.svg";
import soundOff from "../../img/no-sound.svg";

export const ButtonSound = ({ audioRef }) => {
  const [sound, setSound] = useState(false);

  console.log(typeof audioRef);
  const buttonSoundLogic = () => {
    if (sound) {
      setSound(false);
      return (audioRef.current.volume = 0);
    }

    if (sound === false) {
      audioRef.current.load();
      audioRef.current.play();
      setSound(true);
      return (audioRef.current.volume = 1);
    }
  };

  const buttonSoundImg = () =>
    sound === false ? (
      <img src={soundOff} alt="soundOff" />
    ) : (
      <img src={soundOn} alt="soundOn" />
    );

  return (
    <button className={"button_sound"} onClick={() => buttonSoundLogic()}>
      {buttonSoundImg()}
    </button>
  );
};

ButtonSound.prototype = {
  audioRef: PropTypes.object.isRequired,
};
