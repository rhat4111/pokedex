import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  where,
} from "firebase/firestore";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import PokeCard from "components/PokeCard";
import TeamPokes from "components/TeamPokes";
import PokeDetailModal from "components/PokeDetailModal";
import Logo from "assets/images/logo.png";
import LoadingImage from "assets/images/loading.gif";
import EyeIcon from "assets/images/eye.png";
import classes from "assets/scss/App.module.scss";

const App = () => {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [pokes, setPokes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedPoke, setSelectedPoke] = useState();
  const [teamPokes, setTeamPokes] = useState([]);

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);

  useEffect(async () => {
    axios.get("https://pokeapi.co/api/v2/pokemon/?limit=151").then((res) => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      const pokesPromise = res.data.results.map((item) =>
        axios.get(item.url).then((response) => response.data)
      );
      Promise.all(pokesPromise).then((results) => {
        setPokes(results);
      });
    });

    getDocs(collection(db, "pokes")).then((res) => {
      let arr = [];
      res.forEach((doc) => {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${doc.data().poke_id}`)
          .then((res) => {
            arr.push({ id: doc.id, data: res.data });
          });
      });
      setTeamPokes(arr);
    });
  }, []);

  const handleClose = () => {
    setSelectedPoke(null);
    setOpen(false);
  };

  const handleSelectPoke = (data) => {
    setOpen(true);
    setSelectedPoke(data);
  };

  const handleAddToTeam = (data) => {
    if (teamPokes.length < 6) {
      addDoc(collection(db, "pokes"), {
        poke_id: data.id,
      }).then((res) => {
        let clonedTeamPokes = JSON.parse(JSON.stringify(teamPokes));
        clonedTeamPokes.push({ id: res.id, data });
        setTeamPokes(clonedTeamPokes);
        addToast('"Pokémon added to the team successfully"', {
          appearance: "success",
        });
      });
    } else {
      alert("Pokémon team consists of max 6 members");
    }
  };

  const handleOpenSidebar = () => {
    document.body.style.overflow = "hidden";
    setOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    document.body.style.overflow = "auto";
    setOpenSidebar(false);
  };

  const handleDelete = (id) => {
    deleteDoc(doc(db, "pokes", id)).then((res) => {
      let clonedTeamPokes = JSON.parse(JSON.stringify(teamPokes));
      let index;
      clonedTeamPokes.map((poke, ind) => {
        if (poke.id === id) {
          index = ind;
        }
      });
      clonedTeamPokes.splice(index, 1);
      setTeamPokes(clonedTeamPokes);
    });
  };

  return (
    <>
      <div className={classes.root}>
        <img src={Logo} className={classes.logo} alt=":( Not Found" />
        {isLoading ? (
          <div>
            <p>Loading...</p>
            <img src={LoadingImage} alt=":( Not Found" />
          </div>
        ) : (
          <div>
            <button
              className={classes.showButton}
              onClick={() => handleOpenSidebar()}
            >
              <img src={EyeIcon} alt=":( Not Found" />
            </button>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search Pokémon by name or by using the National Pokédex Number..."
            />
            <div className={classes.content}>
              {pokes
                ?.filter(
                  (poke) =>
                    poke.name.toLowerCase().includes(keyword.toLowerCase()) ||
                    String(poke.id).includes(keyword)
                )
                .map((poke) => {
                  return (
                    <PokeCard
                      key={poke.id}
                      {...poke}
                      handleClick={handleSelectPoke}
                      handleAddToTeam={handleAddToTeam}
                    />
                  );
                })}
            </div>
          </div>
        )}
      </div>
      {open && (
        <PokeDetailModal
          open={open}
          handleClose={handleClose}
          data={selectedPoke}
          handleAddToTeam={handleAddToTeam}
        />
      )}
      <TeamPokes
        open={openSidebar}
        data={teamPokes}
        handleClose={() => handleCloseSidebar()}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default App;
