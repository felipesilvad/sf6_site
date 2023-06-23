import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import { query, collection, onSnapshot} from 'firebase/firestore';
import {Container,Image,Table} from 'react-bootstrap';
import MatchUpChartRow from './MatchUpChartRow'
import MatchUpChartRowTotal from './MatchUpChartRowTotal'

const MatchUpChart = () => {
  const [games,setGames] = useState([]);

  useEffect (() => {
    onSnapshot(query(collection(db, `/sets`)), (snapshot) => {
      snapshot.docs.map(doc => (
        setGames(oldGames => [...oldGames,doc.data().games.game1,doc.data().games.game2,doc.data().games.game3,doc.data().games.game4,doc.data().games.game5] )
      ))
    });
  }, [])

  const [chars, setChars] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/chars`)), (snapshot) => {
      setChars(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  function filterEmptyGames(game) {
    if (game.winner) {
      return true
    } else {return false}
  }

  return (
    <Container>
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
              <MatchUpChartRowTotal char_id={char.id} games={games.filter(filterEmptyGames)} />
              {!! chars &&(chars.map((char2) => (
                (char.id !== char2.id) ? (
                  <MatchUpChartRow games={games.filter(filterEmptyGames)} char_id={char.id} char2_id={char2.id} />
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