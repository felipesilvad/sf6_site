import React, { useState, useEffect } from 'react';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, gql } from '@apollo/client';
import MatchesListItem from '../Matches/MatchesListItem';
import {Container} from 'react-bootstrap';

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

function PlayersVsMatch({selectedPlayer1,selectedPlayer2,matches}) {
  const [player1ID, setPlayer1ID] = useState([])
  const [player2ID, setPlayer2ID] = useState([])

  const addPlayersMatch = (player1,player2,page) => {
    try {
      client.query({
        query: gql`query Sets {
          player(id: ${player1}) {
            id
            sets(perPage: 70, page: ${page}, filters: {
              playerIds: [${player1}, ${player2}],
            }) {
              nodes {
                id
                event {
                  videogame {id}
                }
                slots {
                  entrant {
                    participants{player{id}}
                  }
                }
              }
            }
          }
        }`
      }).then((result) => {
        setPlayersMatches(oldPlayerMatches => [...oldPlayerMatches,result.data.player.sets.nodes])
      })
    }  catch (error) {
      console.error(error);
    }    
  }

  const getPlayersMatch = (player1_slug, player2_slug) => {
    var player1 = ''
    var player2 = ''

    client.query({
      query: gql`query User($slug: String!) {
        user(slug: $slug) {
          player {
            id
          }
        }
      }`,variables: {
        "slug": String(player1_slug)
      },
    })
    .then((result) => {
      player1 = result.data.user.player.id
      setPlayer1ID(result.data.user.player.id)

      client.query({
        query: gql`query User($slug: String!) {
          user(slug: $slug) {
            player {
              id
            }
          }
        }`,variables: {
          "slug": String(player2_slug)
        },
      })
      .then((result) => {
        player2 = result.data.user.player.id
        setPlayer2ID(result.data.user.player.id)
        
        for (let i = 0; i < 21; i++) {
          addPlayersMatch(player1,player2,i)
          console.log('added page ', i);
        }
      })
    })
  }

  function filterVodPlayers(match) {
    // if ((match.Player1_id === selectedPlayer1 || match.Player2_id === selectedPlayer1)&&(match.Player1_id === selectedPlayer2 || match.Player2_id === selectedPlayer2)) {
    //   return true
    // }
    if ((match.Player1_id === selectedPlayer1 || match.Player2_id === selectedPlayer1)) {
      return true
    }
  }

  const [playersMatches, setPlayersMatches] = useState([])
  const [playersVods, setPlayersVods] = useState([])
  
  useEffect (() => {
    // setPlayersMatches([])
    // if (selectedPlayer1.length>0&&selectedPlayer2.length>0) {
    //   getPlayersMatch(selectedPlayer1,selectedPlayer2)
    // }
    setPlayersVods(matches.filter(filterVodPlayers))
  }, [selectedPlayer1,selectedPlayer2])

  function filterGames(set) {
    if (set.event.videogame.id === 43868) {
      return true
    }
  }

  function filterSetPlayers(set) {
    const P1 = set.slots[0].entrant.participants[0].player.id
    const P2 = set.slots[1].entrant.participants[0].player.id

    if ((P1 === player1ID || P2 === player1ID)&&(P1 === player2ID || P2 === player2ID)) {
      return true
    }
  }
  
  if (selectedPlayer1.length>0) {
    return (
      <Container>
        <hr className='mt-2' />
        <h5 className='ardela txt-shadow mt-2 text-center'>VODS</h5>
        {/* {console.log("playersMatches",playersMatches.flat(1).filter(filterGames).filter(filterSetPlayers))} */}
        {playersVods.map((match) => (
          <MatchesListItem match={match} />
        ))}
      </Container>
    );
  }
}

export default PlayersVsMatch;