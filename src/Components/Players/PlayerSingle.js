import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, query, collection} from "firebase/firestore"; 
import db from '../../firebase';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, gql } from '@apollo/client';
import {countries} from '../../data.ts'
import ReactCountryFlag from "react-country-flag"
import PlayerSingleChar from './PlayerSingleChar';

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

function PlayersSingle({slug, chars, matches}) {
  const [user, setUser] = useState([])
  const [player, setPlayer] = useState([])

  useEffect(() => {
    onSnapshot(doc(db, "/players/", String(slug)), (doc) => {
      setPlayer(doc.data());
    });
  }, [slug]);

  const getFlagCode = (txt) => {
    const theCountry = countries.filter(country => country.name === txt)
    if (theCountry[0]) {
      return theCountry[0].code
    }
  }

  // client.query({
  //   query: gql`query User($slug: String!) {
  //     user(slug: $slug) {
  //       authorizations{type,url}
  //        id
  //       bio
  //       name
  //       birthday
  //       discriminator
  //       genderPronoun
  //       location {
  //         city
  //         country
  //         state
  //         countryId
  //       }
  //       player {
  //         id
  //         gamerTag
  //         user{discriminator}
  //       }
  //     }
  //   }`,variables: {
  //     "slug": slug.slug
  //   },
  // })
  // .then((result) => {
  //   setUser(result.data.user)

  // })

  console.log(matches)

  return (
    <div className='p-single__bg'>
      {player&&(
        <>
          {player.country&&(
            <ReactCountryFlag className='mb-1' countryCode={getFlagCode(player.country)} svg />
          )}
          <b className="mx-1 txt-shadow ardela-nu">{player.gamerTag}</b>
          <hr />
          {player.country&&(
            <label>
              Country: {player.country} <ReactCountryFlag countryCode={getFlagCode(player.country)} svg />
            </label>
          )}
          <br/>
          {player.state&&(
            <label>State: {player.state}</label>
          )}
          <PlayerSingleChar chars={chars} matches={matches} player_id={slug.slug} />
        </>
      )}
    </div>
  );
}

export default PlayersSingle;