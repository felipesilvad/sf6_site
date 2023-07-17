import React, { useState, useEffect } from 'react';
import { Image, ProgressBar } from 'react-bootstrap';
import PlayerSingleCharItem from './PlayerSingleCharItem';
import { doc, onSnapshot, query,collection} from 'firebase/firestore';
import db from '../../firebase';

function PlayerSingleChar({gamesP1,gamesP2,player_id}) {
  const [playerChars, setPlayerChars] = useState([])

  useEffect (() => {
    setPlayerChars([])
  }, [player_id])

  useEffect (() => {
    gamesP1.map(game => (
      setPlayerChars(oldPlayerChars => [...oldPlayerChars,game.charP1])
    ))
    gamesP2.map(game => (
      setPlayerChars(oldPlayerChars => [...oldPlayerChars,game.charP2])
    ))
  }, [gamesP1,gamesP2])

  const uniqPlayerChars = [...new Set(playerChars)];

  const getCharPercent = (char) => {
    var count = {};
    playerChars.forEach(function(i) { count[i] = (count[i]||0) + 1;});
    return Math.round(((count[char]*100)/playerChars.length)* 100) / 100
  }

  const [chars, setChars] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/chars`)), (snapshot) => {
      setChars(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  if (playerChars.length !== 0) {
    return (
      <>
        <div className='d-flex w-100'>
          {uniqPlayerChars.map((char, index) =>(
            <div className='d-flex justify-content-center align-items-center' 
            key={index} style={{width: `${getCharPercent(char)}%`, minWidth: "5%"}}>
              <div>
                <div className='player-char-top '>
                  <Image className="player-char-img" src={`https://firebasestorage.googleapis.com/v0/b/sf6-vods.appspot.com/o/Chars%2F${char}_.png?alt=media`} />
                </div>
                <div style={{borderTop: `7px solid ${chars[parseInt(char)-1].color}`}}
                className="arrow-down text-center"></div>
              </div>
            </div>
          ))}
        </div>
        <ProgressBar className={`char-progress-bar bg-odd ardela txt-shadow`}>
          {uniqPlayerChars.map((char, index) =>(
            // <PlayerSingleCharItem index={index} char_id={char} charPercent={getCharPercent(char)} />
            <ProgressBar key={index} style={{backgroundColor: `${chars[parseInt(char)-1].color}`}}
            animated now={getCharPercent(char)} label={`${getCharPercent(char)}%`} />
          ))}
        </ProgressBar>
      </>
    );
  }
}

export default PlayerSingleChar;