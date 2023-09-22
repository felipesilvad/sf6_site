import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import { query, collection, onSnapshot} from 'firebase/firestore';
import {Container,Image,Table} from 'react-bootstrap';
import MatchUpChartRow from './MatchUpChartRow'
import MatchUpChartRowTotal from './MatchUpChartRowTotal'
import StatsNav from './StatsNav';

const MatchUpChart = () => {
  const [data, setData] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/data/CharsData/CharsData/`)), (snapshot) => {
      setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  const [chars, setChars] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/chars`)), (snapshot) => {
      setChars(snapshot.docs.map(doc => ({title: doc.data().title, id: doc.id, color:  doc.data().color})))
    });
  }, [])


  return (
    <Container>
      <StatsNav />
      <Table  striped bordered hover variant="dark" className='chart-table'>
        <tbody>
          <tr className='border-top-none fixed-table-img-top'>
            <td className="p-0 border-left-none table-top-left"></td>
            <td className="p-0 text-center ardela px-2 ">TOTAL</td>
            {chars.map((char) => (
              <td className="p-0 text-center">
                <div className='table__char-div-h'>
                  <Image className="table__char-img-h match__char-img mc-img-game p-0"
                  src={`https://firebasestorage.googleapis.com/v0/b/sf6-vods.appspot.com/o/Chars%2F${char.id}_.png?alt=media`} /><br />
                </div>
              </td>
            ))}
          </tr>
          {chars.map((char) => (
            <tr>
              <td className="p-0 fixed-table-img-left border-left-none">
                <Image className="match__char-img mc-img-game p-0"
                src={`https://firebasestorage.googleapis.com/v0/b/sf6-vods.appspot.com/o/Chars%2F${char.id}_.png?alt=media`} />
                <b className='table__char-name ardela txt-shadow'>
                  {char.title}
                </b>
              </td>
              <MatchUpChartRowTotal char_id={char.id} data={data} />
              {!! chars &&(chars.map((char2) => (
                (char.id !== char2.id) ? (
                  <MatchUpChartRow data={data} char_id={char.id} char2_id={char2.id} />
                ) : (
                  <td className="p-0 text-center">
                    -
                  </td>
                )
              )))}
            </tr>
          ))}
          </tbody>
      </Table>
    </Container>
  )
}

export default MatchUpChart;