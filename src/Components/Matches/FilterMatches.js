import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import { query, collection, onSnapshot} from 'firebase/firestore';
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
  const controlOptions = [
    { value: '', label: 'Any' },
    { value: 'Classic', label: 'Classic' },
    { value: 'Modern', label: 'Modern' },
  ]

  return (
    <div>
      {/* <h3 className='ardela'>Filter</h3> */}
      <hr className='my-3' />
      <div>
        <Select 
          options={charOptions} onChange={e => reloadFilterChar1(e.value)}
          className="Selector" isSearchable placeholder="Character 1"
        />
        <div className='d-flex justify-content-center'>
          <label className='ardela'>VS</label>
        </div>
        <Select 
          options={charOptions} onChange={e => reloadFilterChar1(e.value)}
          className="Selector" isSearchable placeholder="Character 2"
        />
      </div>
      {/* <div>
        <label className='ardela text-center'>Character 2</label>
        <Select 
          options={charOptions} onChange={e => reloadFilterChar2(e.value)}
          className="Selector" isSearchable
        />
      </div> */}
    </div>
  )
}

export default FilterMatches;