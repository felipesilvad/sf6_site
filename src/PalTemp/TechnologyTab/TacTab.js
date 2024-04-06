import React, { useState, useEffect, useRef } from 'react';
import { query, doc, onSnapshot, collection, where} from "firebase/firestore"; 
import db from '../../firebase';
import {Container} from 'react-bootstrap';
import TacTabLv from './TacTabLv';

function TacTab() {
  const [technologyTab, setTechnologyTab] = useState([])
  const [structures, setStructures] = useState([])
  const [items, setItems] = useState([])

  useEffect (() => {
    onSnapshot(query(doc(db, `/dbs/Pal`)), (doc) => {
      setTechnologyTab(doc.data().TechnologyTab)
    });
    onSnapshot(query(collection(db, `/dbs/Pal/structures`), where('unlock_lv', '!=', null)), (snapshot) => {
      setStructures(snapshot.docs.map(doc => ({...doc.data(), id: doc.id, type2: "Structures"})))
    });
    onSnapshot(query(collection(db, `/dbs/Pal/items`), where('unlock_lv', '!=', null)), (snapshot) => {
      setItems(snapshot.docs.map(doc => ({...doc.data(), id: doc.id, type2: "Items"})))
    });
  }, [])

  const rangeArray = Array.from({ length: 50 }, (_, index) => index);

  console.log(structures.length)

  return (
    <Container className='new-container'>
      <div className='tec__list'>
        {rangeArray.map((index) => (
          <TacTabLv items={technologyTab.filter(item => parseInt(item.lv) === (index+1))} lv={index+1}
          structures={structures} itemsAll={items} />
        ))}
      </div>
    </Container>
  )
  
}

export default TacTab;