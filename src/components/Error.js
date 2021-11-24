import PropTypes from "prop-types";

export const Error = ({ errorTitle, errorText }) => {
  return (
    <div className="error_bg">
      <div className="error_form">
        <h2>{errorTitle}</h2>
        <hr />
        <p>{errorText}</p>
      </div>
    </div>
  );
};

Error.propTypes = {
  errorTitle: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
};
