import PropTypes from "prop-types";

import tomatoIcon from "../../img/tomato.webp";

export const YourTomatoes = ({ tomatoes }) => {
  const isTomato = (numTomatoes, id) =>
    numTomatoes - 1 >= id ? { width: "65px", height: "65px" } : {};

  return (
    <div className="tomatoes">
      <h2>
        Your <br />
        tomat
        <br />
        oes :
      </h2>

      <div className="tomato">
        <img
          src={tomatoIcon}
          alt="tomato"
          className="tomato_img"
          style={isTomato(tomatoes, 1)}
        />
      </div>
      <div className="tomato">
        <img
          src={tomatoIcon}
          alt="tomato"
          className="tomato_img"
          style={isTomato(tomatoes, 2)}
        />
      </div>
      <div className="tomato">
        <img
          src={tomatoIcon}
          alt="tomato"
          className="tomato_img"
          style={isTomato(tomatoes, 3)}
        />
      </div>
      <div className="tomato">
        <img
          src={tomatoIcon}
          alt="tomato"
          className="tomato_img"
          style={isTomato(tomatoes, 4)}
        />
      </div>
    </div>
  );
};

YourTomatoes.propTypes = {
  tomatoes: PropTypes.number.isRequired,
};
