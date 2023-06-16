import React from "react";
import CloseIcon from "assets/images/cancel.png";
import Methods from "utils/Methods";
import Constants from "utils/Constants";
import classes from "assets/scss/TeamPokes.module.scss";

const TeamPokes = (props) => {
  return (
    <>
      {props.open && (
        <div className={classes.backdrop} onClick={() => props.handleClose()} />
      )}
      <div className={classes.root} style={{ right: props.open ? 0 : -500 }}>
        <img
          src={CloseIcon}
          className={classes.closeButton}
          onClick={() => props.handleClose()}
          alt=":( Not Found"
        />
        <p className={classes.title}>My Team</p>
        <div className={classes.content}>
          {props.data.map((poke) => {
            return (
              <div className={classes.poke} key={poke.id}>
                <div className={classes.header}>
                  <span>#{`000${poke.data.id}`.slice(-3)}</span>
                  <img
                    src={CloseIcon}
                    onClick={() => props.handleDelete(poke.id)}
                    className={classes.addButton}
                    alt=":( Not Found"
                  />
                </div>
                <div className={classes.body}>
                  <span>{Methods.toCapitalizeCase(poke.data.name)}</span>
                  <img
                    src={poke.data.sprites.other.dream_world.front_default}
                    alt=":( Not Found"
                  />
                </div>
                <div className={classes.footer}>
                  {poke.data.types.map((type) => {
                    return (
                      <span
                        key={type.slot}
                        style={{
                          backgroundColor: Constants.colors[type.type.name],
                        }}
                      >
                        {Methods.toCapitalizeCase(type.type.name)}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TeamPokes;
