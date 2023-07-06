import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';
import db from '../firebase';
import { useNavigate } from "react-router-dom";

function HomeComponent() {
  const [matches, setMatches] = useState([])

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  const navigate = useNavigate();

  useEffect (() => {
    onSnapshot(query(collection(db, `/sets`)), (snapshot) => {
      setMatches(snapshot.docs.map(doc => (doc.id)))
    });
  }, [])

  useEffect (() => {
    if (shuffle(matches)[0]) {
      navigate(`/vods/${shuffle(matches)[0]}`)
    }
  }, [matches, navigate])


  if (matches) {
    return (
      <></>
    )
  }
}

export default HomeComponent;