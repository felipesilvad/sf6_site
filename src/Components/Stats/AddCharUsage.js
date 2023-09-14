import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import { query, collection, onSnapshot, doc, setDoc} from 'firebase/firestore';
import { Container,Button } from 'react-bootstrap';

function AddCharUsage() {
  const [games,setGames] = useState([]);
  const [matches, setMatches] = useState([])

  const PlayerScore = [
    ["880b0552", 1126],
    ["31a13177", 1113],
    ["5e30e23e", 1065],
    ["3471a2f7", 1049],
    ["1b9e2ed9", 1026],
    ["f2e39b2e", 999],
    ["71b98b1d", 988],
    ["c31246ac", 985],
    ["e8340ce0", 956],
    ["5be8e15c", 951],
    ["bc8ba848", 946],
    ["dba4be00", 934],
    ["2922889f", 910],
    ["a4c7c2d4", 910],
    ["7e1a429f", 901],
    ["15a9ef8f", 897],
    ["f0979e4c", 897],
    ["173c6283", 893],
    ["4cdb0b42", 889],
    ["3e909da2", 887],
    ["5b98b446", 886],
    ["47e6da2a", 880],
    ["6f4013df", 879],
    ["34995388", 874],
    ["c6744150", 873],
    ["dab1e1cc", 872],
    ["717e4094", 871],
    ["0cf9e00c", 865],
    ["9e56356b", 865],
    ["7ef3978a", 864],
    ["594435db", 862],
    ["ca35d13c", 861],
    ["6bfc4c78", 860],
    ["a49671a0", 860],
    ["0132b03e", 856],
    ["d83e268d", 855],
    ["92c9115f", 853],
    ["6872c691", 851],
    ["060d089a", 849],
    ["88d3f20e", 843],
    ["752f7c36", 841],
    ["b1fe7f8b", 841],
    ["9f399abf", 840],
    ["22083e64", 837],
    ["0f97fff3", 836],
    ["2464d654", 832],
    ["2d28adb5", 831],
    ["7ab6240b", 827],
    ["fc65c576", 824],
    ["c69131b6", 824],
    ["b2fd0ecb", 821],
    ["cdcd8b0b", 817],
    ["3f9200bd", 815],
    ["024d9089", 814],
    ["cfdc73f9", 812],
    ["c4da7130", 810],
    ["7b2d35d2", 810],
    ["448d4eb8", 809],
    ["60eb8f41", 809],
    ["ca54df33", 806],
    ["acbbf204", 804],
    ["27053e88", 803],
    ["d41fdd67", 803],
    ["878ca7c4", 795],
    ["2c673138", 793],
    ["faf1813c", 792],
    ["a8c4e9b1", 792],
    ["dd809d94", 792],
    ["351f1c79", 788],
    ["b3bd73c6", 787],
    ["acfa1207", 786],
    ["2a05813f", 786],
    ["9c13eacd", 784],
    ["11b6295e", 783],
    ["19f7a6f9", 782],
    ["bca30581", 777],
    ["1c6daca9", 776],
    ["5e5c39f7", 774],
    ["ca893ae4", 770],
    ["c0c00ff1", 769],
    ["4c3fbf17", 767],
    ["7f5c77be", 765],
    ["e16792d8", 765],
    ["040c92c3", 764],
    ["402d3ac2", 762],
    ["cac46849", 761],
    ["0b55a51c", 760],
    ["69d8d1db", 759],
    ["b9d90e9c", 759],
    ["10669adf", 757],
    ["fd9daa8b", 756],
    ["6eead23d", 755],
    ["2b89825c", 755],
    ["a60e20ce", 752],
    ["9807219d", 751],
    ["56d09252", 750],
    ["ac09a1a3", 750],
    ["20f90017", 749],
    ["c68eeb1f", 749],
    ["50096866", 749],
    ["2c785591", 749],
    ["8375894a", 747],
    ["6c3c6fcd", 746],
    ["6f9ebc42", 742],
    ["cd4f2827", 740],
    ["a56dfea2", 739],
    ["6e6794ee", 737],
    ["73a4603b", 735],
    ["7fde9c94", 735],
    ["fef30fcb", 734],
    ["65fddc69", 734],
    ["c1bbda04", 733],
    ["9f36f82b", 733],
    ["63aeb4b9", 732],
    ["4484e542", 732],
    ["c45f0467", 731],
    ["b5bc6fa9", 730],
    ["d4d20544", 730],
    ["0243d282", 730],
    ["f100de15", 729],
    ["ec195ece", 729],
    ["1d4a9adc", 728],
    ["2ae13d59", 728],
    ["7fe1bc90", 727],
    ["d2e5ffb7", 727],
    ["5e0e43b1", 727],
    ["68bafb21", 725],
    ["17669f23", 723],
    ["ac88efc9", 721],
    ["638dd2af", 716],
    ["5a409de9", 714],
    ["b8cf36ea", 713],
    ["de75428b", 713],
    ["2a300d0b", 713],
    ["60c77e9c", 711],
    ["79fcdc81", 709],
    ["47d47bdd", 709],
    ["72b05db9", 708],
    ["36672e21", 705],
    ["9594efe4", 704],
    ["1ea6a26f", 704],
    ["1e0fb299", 702],
    ["e412566b", 700],
    ["78b37b33", 699],
    ["585f0231", 698],
    ["65734155", 697],
    ["4ebd7cbb", 697],
    ["c7ffde7c", 695],
    ["cb81045c", 694],
    ["99d951ef", 694],
    ["e613bfbb", 694],
    ["8e7ca0d9", 693],
    ["4d5f1698", 693],
    ["3fec3c89", 692],
    ["a0ae924c", 691],
    ["a9eff895", 691],
    ["356d0e24", 691],
    ["eafc4bb5", 689],
    ["a3bace26", 689],
    ["d59da79c", 689],
    ["cadfe3fa", 687],
    ["208b0900", 687],
    ["5209627a", 685],
    ["6dc35395", 684],
    ["5bd1b83f", 683],
    ["155587d1", 683],
    ["0a57659d", 680],
    ["90c33661", 679],
    ["5874ff5d", 678],
    ["97ac09de", 678],
    ["b695685c", 677],
    ["c59550e6", 676],
    ["fe93cbdc", 676],
    ["a9b710c9", 676],
    ["946a3003", 675],
    ["0186079f", 672],
    ["fa8497fe", 672],
    ["0de38c24", 672],
    ["f9f63816", 671],
    ["3a85ce6a", 671],
    ["b55756aa", 671],
    ["14cd904f", 671],
    ["7f5507aa", 671],
    ["432d37ee", 670],
    ["d7e2e9c8", 670],
    ["4735de68", 668],
    ["ac4c5591", 668],
    ["0381b6a8", 667],
    ["7b88d232", 667],
    ["fe7fcd62", 667],
    ["7799f235", 666],
    ["3fe7b0ec", 665],
    ["8fbe08c8", 664],
    ["eda7bcdb", 663],
    ["91c7ee84", 663],
    ["e2d93c91", 663],
    ["e35978d9", 662],
    ["dcd53ca7", 662],
    ["ae2f4ff8", 661],
    ["bb472734", 660],
    ["fdb9a1e6", 660],
    ["fada6833", 660],
    ["980ad764", 660],
    ["b6a8f3f8", 660],
    ["c96fd086", 658],
    ["9557f87d", 658],
    ["b66813f3", 658],
    ["ea92156f", 658],
    ["e6062fc5", 658],
    ["97207e75", 657],
    ["194c5516", 657],
    ["c8535e73", 657],
    ["5fb30f36", 656],
    ["f98f55ba", 656],
    ["3a714c03", 655],
    ["55b7440d", 655],
    ["dfc23dec", 653],
    ["f5f0cb93", 653],
    ["ec4d302b", 652],
    ["3f8c55d4", 652],
    ["112bbf0e", 652],
    ["7c93fee2", 650],
    ["e82c22b1", 650],
    ["d0d6e324", 650],
    ["b8ba2000", 648],
    ["5a1ab519", 647],
    ["b7e06a4d", 647],
    ["64a466f0", 647],
    ["f5521e9c", 646],
    ["88ac3654", 645],
    ["8ef1da84", 643],
    ["adb14e82", 643],
    ["f493c296", 643],
    ["1d3d8bbe", 643],
    ["51adbba6", 643],
    ["2d7a14fd", 642],
    ["fee94c73", 642],
    ["c4dd88da", 642],
    ["5add29c3", 642],
    ["0060c85f", 641],
    ["94352927", 640],
    ["5523863c", 640],
    ["86cbcadc", 640],
    ["24dac227", 638],
    ["9f6a96d8", 638],
    ["8b55a8c8", 638],
    ["1ea974f4", 638],
    ["b4145646", 637],
    ["31438790", 636],
    ["df3e21a4", 635],
    ["ea574546", 635],
    ["e8d3595e", 634],
    ["d638fbfe", 634],
    ["f186c589", 634],
    ["c74df941", 633],
    ["ed89aea2", 633],
    ["d62ba76a", 633],
    ["e271a24f", 631],
    ["65d22ed6", 629],
    ["6f34332a", 629],
    ["657d3bd6", 628],
    ["f7ad80dc", 627],
    ["0a418fb3", 626],
    ["8f4c3f31", 625],
    ["ea7521fe", 625],
    ["7722e0af", 624],
    ["073e0751", 624],
    ["d52c247f", 623],
    ["49bcfb1d", 623],
    ["f5cebc14", 622],
    ["1cf8481c", 622],
    ["89b3e925", 621],
    ["5cc4208a", 621],
    ["044984ba", 620],
    ["bebd6de0", 619],
    ["14653308", 619],
    ["16544efd", 619],
    ["6b245d5a", 619],
    ["3c23010b", 618],
    ["0166f6c7", 618],
    ["0b90daca", 618],
    ["f54fb35f", 618],
    ["01b59b4f", 617],
    ["e406183d", 617],
    ["d3e44396", 617],
    ["bc4f51aa", 617],
    ["f3dc3879", 616],
    ["2bddc578", 616],
    ["1e42afe6", 616],
    ["c599920b", 616],
    ["64b46574", 616],
    ["8a1c1389", 616],
    ["cdf918ef", 615],
    ["29ed8292", 615],
    ["365f794c", 614],
    ["facce731", 613],
    ["bcd87152", 613],
    ["06b9958c", 613],
    ["dbbaa3d0", 612],
    ["5618c995", 612],
  ]

  useEffect (() => {
    onSnapshot(query(collection(db, `/sets`)), (snapshot) => {
      setMatches(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
      snapshot.docs.map(doc => (
        setGames(oldGames => [...oldGames,
          doc.data().games.game1,doc.data().games.game2,doc.data().games.game3,doc.data().games.game4,doc.data().games.game5,
          doc.data().games.game6,doc.data().games.game7,doc.data().games.game8,doc.data().games.game9,doc.data().games.game10
        ])
      ))
    });
  }, [])

  const [chars, setChars] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/chars`)), (snapshot) => {
      setChars(snapshot.docs.map(doc => ({title: doc.data().title, id: doc.id, color:  doc.data().color})))
    });
  }, [])

  const [players, setPlayers] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/players`)), (snapshot) => {
      setPlayers(snapshot.docs.map(doc => (doc.id)))
    });
  }, [])

  const [tournaments, setTournaments] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/tournaments`)), (snapshot) => {
      setTournaments(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  const [patches, setPatches] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/patches`)), (snapshot) => {
      setPatches(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  function filterEmptyGames(game) {
    if (game) { if (Object.keys(game).length !== 0) {
      return true
    } else {return false}} else {return false}
  }

  const getPlayerGames = (char_id) => {
    var playersCount = 0
    players.map((player) => (
      (matches.filter(match => (
        (
          (match.Player1_id === player)
          &&
          ((match.games.game1.charP1 === char_id) ||
          (!! match.games.game2 &&(match.games.game2.charP1 === char_id)) ||
          (!! match.games.game3 &&(match.games.game3.charP1 === char_id)) ||
          (!! match.games.game4 &&(match.games.game4.charP1 === char_id)) ||
          (!! match.games.game5 &&(match.games.game5.charP1 === char_id)) ||
          (!! match.games.game6 &&(match.games.game6.charP1 === char_id)) ||
          (!! match.games.game7 &&(match.games.game7.charP1 === char_id)) ||
          (!! match.games.game8 &&(match.games.game8.charP1 === char_id)) ||
          (!! match.games.game9 &&(match.games.game9.charP1 === char_id)) ||
          (!! match.games.game10 &&(match.games.game10.charP1 === char_id))
          )
        ) || (
          (match.Player2_id === player)
          &&
          ((match.games.game1.charP2 === char_id) ||
          (!! match.games.game2 &&(match.games.game2.charP2 === char_id)) ||
          (!! match.games.game3 &&(match.games.game3.charP2 === char_id)) ||
          (!! match.games.game4 &&(match.games.game4.charP2 === char_id)) ||
          (!! match.games.game5 &&(match.games.game5.charP2 === char_id)) ||
          (!! match.games.game6 &&(match.games.game6.charP2 === char_id)) ||
          (!! match.games.game7 &&(match.games.game7.charP2 === char_id)) ||
          (!! match.games.game8 &&(match.games.game8.charP2 === char_id)) ||
          (!! match.games.game9 &&(match.games.game9.charP2 === char_id)) ||
          (!! match.games.game10 &&(match.games.game10.charP2 === char_id))
          )
        )
      )).length > 0)&&(
        playersCount = playersCount + 1
      )
    ))
    return playersCount
  }

  const getTournamentsFromPatch = (start,end) => {
    console.log(tournaments.filter(tourney => (tourney.startAt >= start && tourney.endAt <= end)))
    return tournaments.filter(tourney => (tourney.startAt >= start && tourney.endAt <= end))

    // patches.map(patch => (patch.end&&(getTournamentsFromPatch(patch.start,patch.end))))
  }

  const getCharWinrate = (char, char2) => {
    const charFilteredGames = games.filter(filterEmptyGames).filter(game => 
      (game.charP1 === char || game.charP2 === char) &&
      (game.charP1 === char2 || game.charP2 === char2)
    )
    const charWins = charFilteredGames.filter(game => 
        game.winner === char || game.winner === char ||
        game.winner === char || game.winner === char ||
        game.winner === char
      ).length
    return {winrate: ((charWins/charFilteredGames.length)*100).toFixed(2), wins: charWins, games:charFilteredGames.length}
  }

  const dataChars =  []
  
  chars.map((char) => (
    dataChars.push({name: char.title, id: char.id,
    Players: getPlayerGames(char.id),
    Games: 
      games.filter(filterEmptyGames).filter(game => game.charP1 === char.id).length
      +
      games.filter(filterEmptyGames).filter(game => game.charP2 === char.id).length
    ,color: char.color,
    WinRate: chars.map((char_2) => (
      getCharWinrate(char.id,char_2.id)
    ))
    })
  ))

  const getCharPercent = (playerChars, char) => {
    var count = {};
    playerChars.forEach(function(i) { count[i] = (count[i]||0) + 1;});
    return Math.round(((count[char]*100)/playerChars.length)* 100) / 100
  }

  const GetPlayerChar = (playerID) => {
    // Getting All games with Player
    const gamesP1 = []
    matches.filter(match => (match.Player1_id === playerID)).map(match => (
      gamesP1.push(
        match.games.game1,match.games.game2,match.games.game3,match.games.game4,match.games.game5,
        match.games.game6,match.games.game7,match.games.game8,match.games.game9,match.games.game10
      )
    ))
    const gamesP2 = []
    matches.filter(match => (match.Player2_id === playerID)).map(match => (
      gamesP2.push(
        match.games.game1,match.games.game2,match.games.game3,match.games.game4,match.games.game5,
        match.games.game6,match.games.game7,match.games.game8,match.games.game9,match.games.game10
      )
    ))
    // Getting Character From Games
    const PlayerChars = []
    gamesP1.filter(filterEmptyGames).map(game => (
      PlayerChars.push(game.charP1)
    ))
    gamesP2.filter(filterEmptyGames).map(game => (
      PlayerChars.push(game.charP2)
    ))
    const uniqPlayerChars = [...new Set(PlayerChars)];
    
    const PlayerCharPercents = []
    uniqPlayerChars.map((char) => (
      PlayerCharPercents.push({char, winrate: getCharPercent(PlayerChars, char)})
    ))

    return PlayerCharPercents
  }

  const AddedPlayersScores = PlayerScore.filter(player => players.includes(player[0]))
  const dataPlayers =  []

  AddedPlayersScores.map((player) => (
    dataPlayers.push({id: player[0], score: player[1],
      charsWinRate: GetPlayerChar(player[0])
    })
  ))

  const totalPlayers = dataChars.reduce((a, b) => +a + +b.Players, 0)
  const totalGames = dataChars.reduce((a, b) => +a + +b.Games, 0)

  const addData = () => {
    dataChars.map(charData => (
      setDoc(doc(db, "data/CharsData/CharsData", charData.id), {
        games: charData.Games,
        player: charData.Players,
        winrate: charData.WinRate,
        color: charData.color,
        id: charData.id,
        name: charData.name
      })
    ))
    dataPlayers.map(playerData => (
      setDoc(doc(db, "data/PlayersData/PlayersData", playerData.id), {
        id: playerData.id,
        charsWinRate: playerData.charsWinRate,
        score: playerData.score
      })
    ))
    setDoc(doc(db, "data", "total"), {
      totalPlayers:totalPlayers,
      totalGames: totalGames,
    });
    
  }



  console.log("dataChars:",dataChars)
  console.log("dataPlayers:",dataPlayers)

  if (dataChars&&dataPlayers) {
    return (
      <Container>
        <Button onClick={() => addData()} >Add</Button>
      </Container>
    );
  }
  
}
export default AddCharUsage;
