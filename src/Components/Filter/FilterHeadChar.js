import React, {useState, useEffect} from 'react';
import {Image} from 'react-bootstrap';
import db from '../../firebase';
import { doc, onSnapshot} from 'firebase/firestore';
import {MdClose} from 'react-icons/md';

function FilterHeadChar({id, reloadFilter, current}) {
  const [char, setChar] = useState([])
  const img = `https://firebasestorage.googleapis.com/v0/b/sf6-vods.appspot.com/o/Chars%2F${id}_.png?alt=media`

  useEffect(() => {
    onSnapshot(doc(db, "/chars/", id), (doc) => {
      setChar(doc.data());
    });
  }, [id]);

  if (current) {
    return (
      <div className='d-flex filter__bg filter__bg_current mx-1 ' onClick={() => reloadFilter(id)} >
        <div className='char-filter__img-div' >
          <Image className='char-filter__img' src={img} />
        </div>
        <b className='ardela align-self-center mx-1'>{char.title}</b>
      </div>
    );
  } else {
    return (
      <div className='d-flex filter__bg mx-1 ' >
        <div className='char-filter__img-div' >
          <Image className='char-filter__img' src={img} />
        </div>
        <b className='ardela align-self-center mx-1'>{char.title}</b>
        <div className='filter-options-x px-1' onClick={() => reloadFilter('')}>
          <div className='x__margin'>
            <MdClose />
          </div>
        </div>
      </div>
    );
  }

  
}

export default FilterHeadChar;