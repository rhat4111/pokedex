import React, { useEffect, useState } from "react";
import ProgressBar from "components/ProgressBar";
import Methods from "utils/Methods";
import Constants from "utils/Constants";
import PlusIcon from "assets/images/plus.png";
import classes from "assets/scss/PokeDetailModal.module.scss";

const PokeDetailModal = (props) => {
  const [abilities, setAbilities] = useState([]);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    let arr = [];
    props.data.abilities.map((ability) => {
      arr.push(Methods.toCapitalizeCase(ability.ability.name));
    });
    setAbilities(arr);
  }, []);

  const handleAdd = (e, data) => {
    e.stopPropagation();
    props.handleAddToTeam(data);
  };

  const handleClick = (id) => {
    let clonedTabs = JSON.parse(JSON.stringify(tabs));
    if (clonedTabs.includes(id)) {
      clonedTabs.splice(clonedTabs.indexOf(id), 1);
    } else {
      clonedTabs.push(id);
    }
    setTabs(clonedTabs);
  };

  const navs = [
    {
      id: "about",
      name: "About",
    },
    {
      id: "stats",
      name: "Stats",
    },
    {
      id: "evolution",
      name: "Evolution",
    },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.backdrop} onClick={() => props.handleClose()} />
      <div className={classes.modal}>
        <div className={classes.header}>
          <span>#{`000${props.data.id}`.slice(-3)}</span>
          <img
            src={PlusIcon}
            onClick={(e) => handleAdd(e, props.data)}
            className={classes.addButton}
            alt=":( Not Found"
          />
        </div>
        <div className={classes.body}>
          <p className={classes.name}>
            {Methods.toCapitalizeCase(props.data.name)}
          </p>
          <img
            src={props.data.sprites.other.dream_world.front_default}
            alt=":( Not Found"
          />
          <div>
            {props.data.types.map((type) => {
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
        <div className={classes.footer}>
          <ul className={classes.nav}>
            {navs.map((nav) => {
              return (
                <li key={nav.id} onClick={() => handleClick(nav.id)}>
                  {nav.name}
                </li>
              );
            })}
          </ul>
          {tabs.includes("about") && (
            <div>
              <div>
                <div>Height</div>
                <div>{props.data.height / 10 + " m"}</div>
              </div>
              <div>
                <div>Weight</div>
                <div>{props.data.weight / 10 + " kg"}</div>
              </div>
              <div>
                <div>Abilities</div>
                <div>{abilities.join(", ")}</div>
              </div>
            </div>
          )}
          {tabs.includes("stats") && (
            <div>
              {props.data.stats.map((state, index) => {
                return (
                  <div key={index}>
                    <div>
                      {state.stat.name
                        .split(" ")
                        .map((str) => Methods.toCapitalizeCase(str))
                        .join(" ")}
                    </div>
                    <div>
                      <ProgressBar value={state.base_stat} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {tabs.includes("evolution") && <div></div>}
        </div>
      </div>
    </div>
  );
};

export default PokeDetailModal;
