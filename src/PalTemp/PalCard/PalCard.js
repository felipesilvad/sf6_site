import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { query, collection, onSnapshot, where} from "firebase/firestore"; 
import db from '../../firebase';
import PalWork from '../PalWork';
import PalType from '../PalType';
import PalCardTabs from './PalCardTabs';

function PalCardMobile({pal, desktop, cardTab, setCardTab}) {

  const [item, setItem] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/dbs/Pal/items`), where("for_pal", '==', pal.name)), (snapshot) => {
      setItem(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [pal])

  const img = `https://firebasestorage.googleapis.com/v0/b/nether-3311f.appspot.com/o/Pal%2Fpals%2F${pal.name&&(pal.name.replace(" ", "_"))}_icon.png?alt=media`

  console.log(item)
  if (pal) {
    const mount = pal.partner_skill.tags.filter(tag => tag.includes('mount'))

    return (
      <div className='pcm__card-w'>
        <div className='ardela background-number'>
          {pal.id.replace("B", "")}
        </div>
        <div className='pcm__card'>
          <div className='d-flex justify-content-between'>
            <div className='pcm__main-info'>
              <h5 className='pcm__name'>{pal.name}</h5>
              <div className='d-flex'>
                <PalType pal={pal} />
              </div>
              {(mount.length>0)&&(
                <div className='pskill-tag__div d-flex'>
                  <Image className='pskill-tag__img' src={`https://firebasestorage.googleapis.com/v0/b/nether-3311f.appspot.com/o/Pal%2Ftag-icons%2F${mount[0]}.png?alt=media&token=fc6d60e8-a09e-482f-a8c7-1a19d50369a9`} />
                  {item.length>0&&(
                    <span className="text-end w-20 pskill-tag__lv">
                      <b className="work-lv">Lv</b><b className='pr-2'>{item[0].unlock_lv}</b>
                    </span>
                  )}
                </div>
              )}
              {!desktop&&(
                <PalWork work={pal.work} />
              )}
            </div>
            <Image className='pcm__img' src={img} />
          </div>
        </div>
        {desktop&&(
          <PalCardTabs pal={pal} cardTab={cardTab} setCardTab={setCardTab}  />
        )}
      </div>
    );
  }
}

export default PalCardMobile;