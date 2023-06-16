import React from "react";
import PlusIcon from "assets/images/plus.png";
import Methods from "utils/Methods";
import Constants from "utils/Constants";
import classes from "assets/scss/PokeCard.module.scss";

const PokeCard = (props) => {
  const handleClick = (e, data) => {
    e.stopPropagation();
    props.handleAddToTeam(data);
  };
  
  return (
    <div className={classes.root} onClick={() => props.handleClick(props)}>
      <div className={classes.header}>
        <span>#{`000${props.id}`.slice(-3)}</span>
        <img
          src={PlusIcon}
          onClick={(e) => handleClick(e, props)}
          className={classes.addButton}
          alt=":( Not Found"
        />
      </div>
      <div className={classes.body}>
        <span>{Methods.toCapitalizeCase(props.name)}</span>
        <img
          src={props.sprites.other.dream_world.front_default}
          alt=":( Not Found"
        />
      </div>
      <div className={classes.footer}>
        {props.types.map((type) => {
          return (
            <span
              key={type.slot}
              style={{ backgroundColor: Constants.colors[type.type.name] }}
            >
              {Methods.toCapitalizeCase(type.type.name)}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PokeCard;
