import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import { query, collection, onSnapshot} from 'firebase/firestore';
import db from '../../firebase';
import {Image} from 'react-bootstrap';

function FilterSelectModal({showModal,closeModal,
  reloadFilterChar1,reloadFilterChar2,char1,char2,
  reloadFilterCntrl1,reloadFilterCntrl2,cntrl1,cntrl2,
  reloadFilterPlayer1,reloadFilterPlayer2,player1,player2
}) {
  const [chars, setChars] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/chars`)), (snapshot) => {
      setChars(snapshot.docs.map(doc => ({label: doc.data().title, value: doc.id})))
    });
  }, [])
  const charOptions = [
    { value: '', label: 'Any' },
    ...chars
  ]

  const getCurrentChar = (char1) => {
    const currentChar = charOptions.filter(function(char) {
      return char.value === char1;
    });
    return {label: currentChar[0].label, value: char1}
  }

  const [players, setPlayers] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/players`)), (snapshot) => {
      setPlayers(snapshot.docs.map(doc => ({label: doc.data().gamerTag, value: doc.id})))
    });
  }, [])
  const playerOptions = [
    { value: '', label: 'Any' },
    ...players
  ]

  const getCurrentPlayer = (playerVar) => {
    const currentPlayer = playerOptions.filter(function(player) {
      return player.value === playerVar;
    });
    return {label: currentPlayer[0].label, value: playerVar}
  }

  return (
    <Modal show={showModal} onHide={() => closeModal()}>
      <Modal.Header closeButton>
        <Modal.Title><b className='ardela'>FILTER VODS</b></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className='ardela'>Characters</h4>
        <div className='d-flex'>
          <div className={`cntrl-select ${(cntrl1 === "Classic")&&("cntrl-select-active")}`}
            onClick={(cntrl1 === "Classic")?
            (() => reloadFilterCntrl1('')):
            (() => reloadFilterCntrl1('Classic'))}
          >
            <Image src={require(`../../Assets/img/logo-Classic.png`)}
            className={`cntrl-select__img`} />
          </div>
          <div className={`cntrl-select ${(cntrl1 === "Modern")&&("cntrl-select-active")}`}
            onClick={(cntrl1 === "Modern")?
            (() => reloadFilterCntrl1('')):
            (() => reloadFilterCntrl1('Modern'))}
          >
            <Image src={require(`../../Assets/img/logo-Modern.png`)}
            className={`cntrl-select__img`} />
          </div>
          <Select 
            options={charOptions} onChange={e => reloadFilterChar1(e.value)}
            className="Selector ardela w-100" isSearchable placeholder="Character 1"
            defaultValue={getCurrentChar(char1)}
          />
        </div>
        
        <div className='d-flex justify-content-center'>
          <label className='ardela'>VS</label>
        </div>

        <div className='d-flex'>
          <div className={`cntrl-select ${(cntrl2 === "Classic")&&("cntrl-select-active")}`}
            onClick={(cntrl2 === "Classic")?
            (() => reloadFilterCntrl2('')):
            (() => reloadFilterCntrl2('Classic'))}
          >
            <Image src={require(`../../Assets/img/logo-Classic.png`)}
            className={`cntrl-select__img`} />
          </div>
          <div className={`cntrl-select ${(cntrl2 === "Modern")&&("cntrl-select-active")}`}
            onClick={(cntrl2 === "Modern")?
            (() => reloadFilterCntrl2('')):
            (() => reloadFilterCntrl2('Modern'))}
          >
            <Image src={require(`../../Assets/img/logo-Modern.png`)}
            className={`cntrl-select__img`} />
          </div>
          <Select 
            options={charOptions} onChange={e => reloadFilterChar2(e.value)}
            className="Selector ardela w-100" isSearchable placeholder="Character 2"
            defaultValue={getCurrentChar(char2)}
          />
        </div>

        <h4 className='ardela mt-3'>Players</h4>
        <Select 
          options={playerOptions} onChange={e => reloadFilterPlayer1(e.value)}
          className="Selector w-100" isSearchable placeholder="Player 1"
          // defaultValue={getCurrentPlayer(player1)}
        />
        <div className='d-flex justify-content-center'>
          <label className='ardela'>VS</label>
        </div>
        <Select 
          options={playerOptions} onChange={e => reloadFilterPlayer2(e.value)}
          className="Selector w-100" isSearchable placeholder="Player 2"
          // defaultValue={getCurrentPlayer(player2)}
        />
      </Modal.Body>
    </Modal>
  );
}

export default FilterSelectModal;