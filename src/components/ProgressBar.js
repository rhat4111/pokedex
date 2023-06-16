import React from "react";
import classes from "assets/scss/ProgressBar.module.scss";

const ProgressBar = (props) => {
  return (
    <div className={classes.root}>
      <div style={{ width: `${props.value}%` }}>{props.value}</div>
    </div>
  );
};

export default ProgressBar;
