import React, { useState, useEffect } from 'react';
import { doc, setDoc} from "firebase/firestore"; 
import db from '../../firebase';
import { storage } from '../../firebase';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, gql } from '@apollo/client';
import Select from 'react-select'
import Spinner from 'react-bootstrap/Spinner';
import { Form, Container, Button, Image} from 'react-bootstrap';

const httpLink = new HttpLink({ uri: 'https://api.start.gg/gql/alpha' });
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({ headers: {
    authorization: "Bearer 80593c014450f43b6c9328f668170c95"
  }}));
  return forward(operation);
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

function AddTournament() {
  const [slug, setSlug] = useState()
  const [tourneySerie, setTourneySerie] = useState()
  const [loading, setLoading] = useState()

  const [tournamentSeries, setTournamentSeries] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/tournamentSeries`)), (snapshot) => {
      setTournamentSeries(snapshot.docs.map(doc => ({label: doc.data().title, value: doc.id, img: doc.data().img})))
    });
  }, [])

  const tournamentSeriesOptions = [
    ...tournamentSeries,
  ]

  const fetchData = () =>{
    setLoading(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    client.query({
      query: gql`query ($tourneySlug: String!) {
        tournament(slug: $tourneySlug) {
          id
          name
          countryCode
          addrState
          city
          startAt
          endAt
          numAttendees
          events {
            id
            name
            slug
            phaseGroups {
              id
            }
          }
        }
      }`,variables: {
        "tourneySlug": slug
      },
    })
    .then((result) => {
      const tData = result.data.tournament
      setDoc(doc(db, "tournaments", String(tData.id)), {
        name: tData.name,
        serie: tourneySerie.value,
        slug:slug,
        countryCode: tData.countryCode,
        addrState: tData.addrState,
        city: tData.city,
        startAt: tData.startAt,
        endAt: tData.endAt,
        numAttendees: tData.numAttendees,
        event_id: tData.events[0].id,
        event_name: tData.events[0].name,
        event_slug: tData.events[0].slug,
        event_phaseGroups: tData.events[0].phaseGroups
      });
      console.log(tData.name," added")
      setLoading(false)
    });
  }

  const [seriesTitle, setSeriesTitle] = useState()
  const [seriesImg, setSeriesImg] = useState()
  const [color, setColor] = useState('#FEFEFE')
  const [color2, setColor2] = useState('')
  const [txtColor, setTxtColor] = useState('#000000')
  const [loadingSeries, setLoadingSeries] = useState()
  var slugify = require('slugify')

  const onChangeImg = e => {
    const file = e.target.files[0]
    if (!file) return;
    const slug = slugify(seriesTitle)
    const storageRef = ref(storage, `Tournaments/${slug}.png`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL)
          setSeriesImg(downloadURL)
        });
      }
    );
  };

  const uploadSeries = (e) => {
    setLoadingSeries(true)
    e.preventDefault()
    const slug = slugify(seriesTitle)
    setDoc(doc(db, "tournamentSeries", slug), {
      slug: slug,
      title: seriesTitle,
      img: seriesImg,
      color:color,
      color2:color2,
      txtColor:txtColor,
    });
    setLoadingSeries(false)
    console.log(seriesTitle," Added")
  }

  return (
    <Container>
      <Form className='mt-4-none-xs' onSubmit={handleSubmit}>
        <h2 className='ardela'>Add Tournament</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Slug</Form.Label>
          <Form.Control onChange={(e) => setSlug(e.target.value)} type="text" placeholder="SLUG" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Series</Form.Label>
          <Select
            onChange={e => setTourneySerie(e)}
            className="Selector" isSearchable 
            options={tournamentSeriesOptions}
          />
        </Form.Group>
        <Button className='button' onClick={fetchData} variant="primary" type="submit">
          {loading && <Spinner animation="border" disabled={loading} role="status"><span className="visually-hidden">Loading...</span></Spinner>}
          Add
        </Button>
      </Form>  

      <Form className='mt-4-none-xs' onSubmit={uploadSeries}>
        <h2 className='ardela'>Add Tournament Series</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control onChange={(e) => setSeriesTitle(e.target.value)} type="text" placeholder="Title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <label className="form-label">Image</label>
          <input type="file" onChange={onChangeImg} className="form-control" id="customFile" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>BG Color 1</Form.Label>
          <Form.Control onChange={(e) => setColor(e.target.value)} type="text" placeholder="#FEFEFE" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>BG Color 2</Form.Label>
          <Form.Control onChange={(e) => setColor2(e.target.value)} type="text" placeholder="none" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Txt Color</Form.Label>
          <Form.Control onChange={(e) => setTxtColor(e.target.value)} type="text" placeholder="#000000" />
        </Form.Group>
        <div className='p-2 mb-1 d-flex align-items-center rounded' 
          style={(color2 === "") ? ({backgroundColor: color}) : ({backgroundImage: `linear-gradient(to right, ${color}, ${color2})`})}>
          <>
            <Image className='toruney-img mr-1' src={seriesImg} />
            <h5 className='tourney-title mb-0' style={{color: txtColor}}>{seriesTitle} Tournament Example</h5>
          </>
        </div>
        <Button className='button' variant="primary" type="submit">
          {loadingSeries && <Spinner className='loadingSeries' animation="border" disabled={loadingSeries} role="status"><span className="visually-hidden">Loading...</span></Spinner>}
          Add
        </Button>
      </Form>

    </Container>
);
}

export default AddTournament;