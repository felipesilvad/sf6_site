import React, { useState } from 'react';
import { doc, setDoc} from "firebase/firestore"; 
import db from '../../firebase';
import { Form, Container, Button} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, gql } from '@apollo/client';

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
  const [loading, setLoading] = useState()
  
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
    });

  }

  return (
    <Container>
      <Form className='mt-4-none-xs' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-muted">Slug</Form.Label>
          <Form.Control onChange={(e) => setSlug(e.target.value)} type="text" placeholder="e-mail ou CPF" />
        </Form.Group>
        <Button className='button' onClick={fetchData} variant="primary" type="submit">
          {loading && <Spinner animation="border" disabled={loading} role="status"><span className="visually-hidden">Loading...</span></Spinner>}
          Entrar
        </Button>
      </Form>  
    </Container>
);
}

export default AddTournament;