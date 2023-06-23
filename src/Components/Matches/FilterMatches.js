import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import { query, collection, onSnapshot} from 'firebase/firestore';
import {Link} from 'react-router-dom';
import {Container,Image,Table} from 'react-bootstrap';
import Select from 'react-select'

const FilterMatches = ({reloadFilterChar1,reloadFilterChar2}) => {
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

  return (
    <div>
      <h3>Filter</h3>
      <div>
        <label>Character 1</label>
        <Select 
          options={charOptions} onChange={e => reloadFilterChar1(e.value)}
          className="Selector" isSearchable
        />
      </div>
      <div>
        <label>Character 2</label>
        <Select 
          options={charOptions} onChange={e => reloadFilterChar2(e.value)}
          className="Selector" isSearchable
        />
      </div>
    </div>
  )
}

export default FilterMatches;