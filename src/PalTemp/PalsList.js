import React, { useState, useEffect, useRef } from 'react';
import { query, collection, onSnapshot} from "firebase/firestore"; 
import db from '../firebase';
import {Container,Row,Col} from 'react-bootstrap';
import PalCard from './PalCard/PalCard';
import { LuRectangleHorizontal, LuRectangleVertical } from "react-icons/lu";
import { CiViewTable } from "react-icons/ci";

function PalsList() {
  const windowWidth = useRef(window.innerWidth);
  const [view, setView] = useState(1)

  const [pals, setPals] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/dbs/Pal/pals`)), (snapshot) => {
      setPals(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])



  const [cardTab, setCardTab] = useState(1)

  return (
    <Container className='new-container'>
      {(windowWidth.current < 768) ? (
        // MOBILE ONLY

        <div className=''>
          {pals&&(pals.map(pal => (
            <PalCard pal={pal} />
          )))}
        </div>

      ) : (
        // DESKTOP
        <Row>

          <Col xs={2} className='filter__bg'>
            <div className='filter__div'>
              <h5 className='filter__label'>View Type</h5>
              <div className='filter__btn' onClick={() => setView(1)}>
                <LuRectangleVertical className='filter__icon' />
                Detailed
              </div>
              <div className='filter__btn' onClick={() => setView(2)}>
                <LuRectangleHorizontal className='filter__icon' />
                Compact
              </div>
              <div className='filter__btn' onClick={() => setView(3)}>
                <CiViewTable className='filter__icon' />
                Table
              </div>
            </div>
          </Col>
          
          <Col>
            {(view===1)&&(
              <div className='d-flex flex-wrap'>
                {pals&&(pals.map(pal => (
                  <PalCard pal={pal} desktop={true}
                  cardTab={cardTab} setCardTab={setCardTab} />
                )))}
              </div>
            )}
            {(view===2)&&(
              <div className='d-flex flex-wrap'>
                {pals&&(pals.map(pal => (
                  <PalCard pal={pal} desktop={false} />
                )))}
              </div>
            )}
          </Col>
        </Row>

      )}
      
    </Container>
  )
  
}

export default PalsList;