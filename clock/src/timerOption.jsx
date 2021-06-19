const TimerOption = ({ handleIncrease, handleDecrease, title, count }) => {
  return (
    <div className="clock_option-setting">
      <span className="clock_option-label">{title}</span>
      <div className="clock_option-controls">
        <i className="btn fas fa-arrow-up" onClick={handleIncrease}></i>
        <span className="clock_option-setting--minutes">{count}</span>
        <i className="btn fas fa-arrow-down" onClick={handleDecrease}></i>
      </div>
    </div>
  );
};

export default TimerOption;
