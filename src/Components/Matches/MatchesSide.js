import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot, limit, where} from 'firebase/firestore';
import db from '../../firebase';
import MatchesListItem from './MatchesListItem';
import {BsChevronCompactDown} from 'react-icons/bs'
import MatchesSideFilterHead from './MatchesSideFilterHead';
import FilterSelected from '../Filter/FilterSelected';
import FilterSelectModal from '../Filter/FilterSelectModal';

function MatchesSide({videoUrl,tournament_id, current_start_time,currentChar1,currentChar2,id}) {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [matchesN, setMatchesN] = useState(32)
  var queryMatches = []

  useEffect (() => {
    queryMatches = []
  }, [id])

  useEffect (() => {
    onSnapshot(query(collection(db, `/sets`), where("tournament_id","==",tournament_id), limit(matchesN)), (snapshot) => {
      snapshot.docs.map(doc => (queryMatches.push({...doc.data(), id: doc.id})))
    });
    onSnapshot(query(collection(db, `/sets`), where("games.game1.charP1","==",currentChar1), limit(matchesN)), (snapshot) => {
      snapshot.docs.map(doc => (queryMatches.push({...doc.data(), id: doc.id})))
    });
    onSnapshot(query(collection(db, `/sets`), where("games.game1.charP2","==",currentChar2), limit(matchesN)), (snapshot) => {
      snapshot.docs.map(doc => (queryMatches.push({...doc.data(), id: doc.id})))
    });
    setMatches(queryMatches)
    setLoading(false)
  }, [matchesN])

  

  // LOADING
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function loadTime(ms) {
    setLoading(true)
    await sleep(ms)
    setLoading(false)
  }

  // OPEN FILTER MODAL
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  // FILTERS
  const [char1, setChar1] = useState('');
  async function reloadFilterChar1(value) {
    setChar1(false)
    setMatchesN(64)
    closeModal()
    loadTime(200)
    setChar1(value)
  }
  function filterChar1(match) {
    if (char1 === "") {
      return true
    } else {
      if (char1 === char2) {
        return (match.games.game1.charP1 === char2 && match.games.game1.charP2 === char2) ||
        (!! match.games.game2 &&(match.games.game2.charP1 === char2 && match.games.game2.charP2 === char2)) ||
        (!! match.games.game3 &&(match.games.game3.charP1 === char2 && match.games.game3.charP2 === char2)) ||
        (!! match.games.game4 &&(match.games.game4.charP1 === char2 && match.games.game4.charP2 === char2)) ||
        (!! match.games.game5 &&(match.games.game5.charP1 === char2 && match.games.game5.charP2 === char2)) ||
        (!! match.games.game6 &&(match.games.game6.charP1 === char2 && match.games.game6.charP2 === char2)) ||
        (!! match.games.game7 &&(match.games.game7.charP1 === char2 && match.games.game7.charP2 === char2)) ||
        (!! match.games.game8 &&(match.games.game8.charP1 === char2 && match.games.game8.charP2 === char2)) ||
        (!! match.games.game9 &&(match.games.game9.charP1 === char2 && match.games.game9.charP2 === char2)) ||
        (!! match.games.game10 &&(match.games.game10.charP1 === char2 && match.games.game10.charP2 === char2))
      } else {
        return  (match.games.game1.charP1 === char1 || match.games.game1.charP2 === char1) ||
        (!! match.games.game2 &&(match.games.game2.charP1 === char1 || match.games.game2.charP2 === char1)) ||
        (!! match.games.game3 &&(match.games.game3.charP1 === char1 || match.games.game3.charP2 === char1)) ||
        (!! match.games.game4 &&(match.games.game4.charP1 === char1 || match.games.game4.charP2 === char1)) ||
        (!! match.games.game5 &&(match.games.game5.charP1 === char1 || match.games.game5.charP2 === char1)) ||
        (!! match.games.game6 &&(match.games.game6.charP1 === char1 || match.games.game6.charP2 === char1)) ||
        (!! match.games.game7 &&(match.games.game7.charP1 === char1 || match.games.game7.charP2 === char1)) ||
        (!! match.games.game8 &&(match.games.game8.charP1 === char1 || match.games.game8.charP2 === char1)) ||
        (!! match.games.game9 &&(match.games.game9.charP1 === char1 || match.games.game9.charP2 === char1)) ||
        (!! match.games.game10 &&(match.games.game10.charP1 === char1 || match.games.game10.charP2 === char1))
      }
    }
  }

  const [char2, setChar2] = useState('');
  async function reloadFilterChar2(value) {
    setChar2(false)
    setMatchesN(64)
    closeModal()
    loadTime(200)
    setChar2(value)
  }
  function filterChar2(match) {
    if (char2 === "") {
      return true
    } else {
      if (char1 === char2) {
        return (match.games.game1.charP1 === char2 && match.games.game1.charP2 === char2) ||
        (!! match.games.game2 &&(match.games.game2.charP1 === char2 && match.games.game2.charP2 === char2)) ||
        (!! match.games.game3 &&(match.games.game3.charP1 === char2 && match.games.game3.charP2 === char2)) ||
        (!! match.games.game4 &&(match.games.game4.charP1 === char2 && match.games.game4.charP2 === char2)) ||
        (!! match.games.game5 &&(match.games.game5.charP1 === char2 && match.games.game5.charP2 === char2)) ||
        (!! match.games.game6 &&(match.games.game6.charP1 === char2 && match.games.game6.charP2 === char2)) ||
        (!! match.games.game7 &&(match.games.game7.charP1 === char2 && match.games.game7.charP2 === char2)) ||
        (!! match.games.game8 &&(match.games.game8.charP1 === char2 && match.games.game8.charP2 === char2)) ||
        (!! match.games.game9 &&(match.games.game9.charP1 === char2 && match.games.game9.charP2 === char2)) ||
        (!! match.games.game10 &&(match.games.game10.charP1 === char2 && match.games.game10.charP2 === char2))
      } else {
        return (match.games.game1.charP1 === char2 || match.games.game1.charP2 === char2) ||
        (!! match.games.game2 &&(match.games.game2.charP1 === char2 || match.games.game2.charP2 === char2)) ||
        (!! match.games.game3 &&(match.games.game3.charP1 === char2 || match.games.game3.charP2 === char2)) ||
        (!! match.games.game4 &&(match.games.game4.charP1 === char2 || match.games.game4.charP2 === char2)) ||
        (!! match.games.game5 &&(match.games.game5.charP1 === char2 || match.games.game5.charP2 === char2)) ||
        (!! match.games.game6 &&(match.games.game6.charP1 === char2 || match.games.game6.charP2 === char2)) ||
        (!! match.games.game7 &&(match.games.game7.charP1 === char2 || match.games.game7.charP2 === char2)) ||
        (!! match.games.game8 &&(match.games.game8.charP1 === char2 || match.games.game8.charP2 === char2)) ||
        (!! match.games.game9 &&(match.games.game9.charP1 === char2 || match.games.game9.charP2 === char2)) ||
        (!! match.games.game10 &&(match.games.game10.charP1 === char2 || match.games.game10.charP2 === char2))
      }
    }
  }

  const [cntrl1, setCntrl1] = useState('');
  async function reloadFilterCntrl1(value) {
    setCntrl1(false)
    setMatchesN(64)
    closeModal()
    loadTime(200)
    setCntrl1(value)
  }
  function filterCntrl1(match) {
    if (cntrl1 === "") {
      return true
    } else {
      return (match.games.game1.cP1 === cntrl1) ||
      (!! match.games.game2 &&(match.games.game2.cP1 === cntrl1)) ||
      (!! match.games.game3 &&(match.games.game3.cP1 === cntrl1)) ||
      (!! match.games.game4 &&(match.games.game4.cP1 === cntrl1)) ||
      (!! match.games.game5 &&(match.games.game5.cP1 === cntrl1)) ||
      (!! match.games.game6 &&(match.games.game6.cP1 === cntrl1)) ||
      (!! match.games.game7 &&(match.games.game7.cP1 === cntrl1)) ||
      (!! match.games.game8 &&(match.games.game8.cP1 === cntrl1)) ||
      (!! match.games.game9 &&(match.games.game9.cP1 === cntrl1)) ||
      (!! match.games.game10 &&(match.games.game10.cP1 === cntrl1))
    }
  }

  const [cntrl2, setCntrl2] = useState('');
  async function reloadFilterCntrl2(value) {
    setCntrl2(false)
    setMatchesN(64)
    closeModal()
    loadTime(200)
    setCntrl2(value)
  }
  function filterCntrl2(match) {
    if (cntrl2 === "") {
      return true
    } else {
      return (match.games.game1.cP2 === cntrl2) ||
      (!! match.games.game2 &&(match.games.game2.cP2 === cntrl2)) ||
      (!! match.games.game3 &&(match.games.game3.cP2 === cntrl2)) ||
      (!! match.games.game4 &&(match.games.game4.cP2 === cntrl2)) ||
      (!! match.games.game5 &&(match.games.game5.cP2 === cntrl2)) ||
      (!! match.games.game6 &&(match.games.game6.cP2 === cntrl2)) ||
      (!! match.games.game7 &&(match.games.game7.cP2 === cntrl2)) ||
      (!! match.games.game8 &&(match.games.game8.cP2 === cntrl2)) ||
      (!! match.games.game9 &&(match.games.game9.cP2 === cntrl2)) ||
      (!! match.games.game10 &&(match.games.game10.cP2 === cntrl2))
    }
  }
  
  const [player1, setPlayer1] = useState('')
  async function reloadFilterPlayer1(value) {
    setPlayer1('')
    setMatchesN(64)
    closeModal()
    loadTime(200)
    setPlayer1(value)
  }
  function filterPlayer1(match) {
    if (player1 === "") {
      return true
    } else {
      return (match.Player1_id === player1 || match.Player2_id === player1)
    }
  }

  const [player2, setPlayer2] = useState('')
  async function reloadFilterPlayer2(value) {
    setPlayer2('')
    setMatchesN(64)
    closeModal()
    loadTime(200)
    setPlayer2(value)
  }
  function filterPlayer2(match) {
    if (player2 === "") {
      return true
    } else {
      return (match.Player1_id === player2 || match.Player2_id === player2)
    }
  }

  const [tourney, setTourney] = useState('')
  async function reloadFilterTourney(value) {
    setTourney('')
    setMatchesN(64)
    closeModal()
    loadTime(200)
    setTourney(value)
  }
  function filterTourney(match) {
    if (tourney === "") {
      return true
    } else {
      return (String(match.tournament_id) === tourney)
    }
  }

  const clearFilters = () => {
    reloadFilterChar1('')
    reloadFilterChar2('')
    reloadFilterCntrl1('')
    reloadFilterCntrl2('')
    reloadFilterPlayer1('')
    reloadFilterPlayer2('')
    setTourney('')
  }
  // ALGORITHM
  function shuffle(a, b) {
    return parseInt(parseInt(a.id).toString(16).replace(/\D/g, ''))
    - parseInt(parseInt(b.id).toString(16).replace(/\D/g, ''));
  }

  function nextMatchesFilter(match) {
    const secs = ((parseInt(match.start_h)*3600) + (parseInt(match.start_m)*60) + parseInt(match.start_s))
    if (match.videoUrl === videoUrl) {
      if (secs > current_start_time) {
        return true
      }
    }
  }
  function orderSecs(a, b) {
    return ((parseInt(a.start_h)*3600) + (parseInt(a.start_m)*60) + parseInt(a.start_s))
    - ((parseInt(b.start_h)*3600) + (parseInt(b.start_m)*60) + parseInt(b.start_s))
  }

  function sameTourneyMatches(match) {
    const secs = ((parseInt(match.start_h)*3600) + (parseInt(match.start_m)*60) + parseInt(match.start_s))
    if (match.videoUrl === videoUrl) {
      if (secs < current_start_time) {
        return true
      }
    }
    if (match.videoUrl !== videoUrl && match.tournament_id === tournament_id) {
      return true
    }
  }

  function otherMatches(match) {
    if (match.tournament_id !== tournament_id) {
      return true
    }
  }

  const filteredMatches = matches.filter(filterChar1).filter(filterChar2).filter(filterCntrl1).filter(filterCntrl2).filter(filterPlayer1).filter(filterPlayer2).filter(filterTourney)
  const nextMatches = filteredMatches.filter(nextMatchesFilter).sort(orderSecs)
  const shuffledMatches = nextMatches
        .concat(filteredMatches.filter(sameTourneyMatches))
        .concat(filteredMatches.filter(otherMatches).sort(shuffle))
  // const slicedMatches = shuffledMatches.slice(0, matchesN)
  function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
  }
  const uniqMatches = removeDuplicates(matches)

  return (
    <>
      <MatchesSideFilterHead
        reloadFilterChar1={reloadFilterChar1} reloadFilterChar2={reloadFilterChar2}
        currentChar1={currentChar1} currentChar2={currentChar2}
      />

      <FilterSelected char1={char1} char2={char2} openModal={openModal} 
        reloadFilterChar1={reloadFilterChar1} reloadFilterChar2={reloadFilterChar2}
        cntrl1={cntrl1} cntrl2={cntrl2}
        reloadFilterCntrl1={reloadFilterCntrl1} reloadFilterCntrl2={reloadFilterCntrl2}
        player1={player1} player2={player2}
        reloadFilterPlayer1={reloadFilterPlayer1} reloadFilterPlayer2={reloadFilterPlayer2}
        reloadFilterTourney={reloadFilterTourney} tourney={tourney}
        clearFilters={clearFilters}
      />

      {(loading)?(
        <div className="d-flex justify-content-center loading-matches__div align-self-center">
          <div className="spinner-border align-self-center" role="status">
            <span className="sr-only align-self-center">Loading...</span>
          </div>
        </div>
      ) : (
        <div className='match-list__vh custom-scrollbar'>
          {uniqMatches.map((match) => (
            <MatchesListItem match={match} />
          ))}

          {/* {shuffledMatches.length !== matches.length&&( */}
            <div className='list-load-more d-flex justify-content-center'
            onClick={() => setMatchesN(matchesN+32)} >
              <div className='d-block text-center'>
                <b className='ardela'>Load More</b><br />
                <BsChevronCompactDown className="load-more__icon" />
              </div>
            </div>
          {/* )} */}
        </div>
      )}

      <FilterSelectModal showModal={showModal} closeModal={closeModal} setShowModal={setShowModal}
        reloadFilterChar1={reloadFilterChar1} reloadFilterChar2={reloadFilterChar2} char1={char1} char2={char2}
        reloadFilterCntrl1={reloadFilterCntrl1} reloadFilterCntrl2={reloadFilterCntrl2} cntrl1={cntrl1} cntrl2={cntrl2}
        reloadFilterPlayer1={reloadFilterPlayer1} reloadFilterPlayer2={reloadFilterPlayer2} player1={player1} player2={player2}
        reloadFilterTourney={reloadFilterTourney} tourney={tourney}
      />

    </>
  );
}

export default MatchesSide;