import React from 'react';
import {Routes, Route} from 'react-router-dom'
import AddTournament from './Components/Tournaments/AddTournament';
import HeaderComponent from './Components/Header';
import TournamentsList from './Components/Tournaments/TournamentsList';
import TournamentComponent from './Components/Tournaments/Tournament';
import MatchComponent from './Components/Matches/Match';
import MatchUpChart from './Components/Stats/MatchUpChart';
import CharDetail from './Components/Character/CharDetail';
import HomeComponent from './Components/Home';
import CharUsage from './Components/Stats/CharUsage';

function App() {
  return (
    <div className='App'>
      <HeaderComponent />
      <Routes>
        <Route path='/' element={<HomeComponent />} exact/>
        <Route path='/vods' element={<HomeComponent />} exact/>
        <Route path='/vods/:id' element={<MatchComponent />} exact/>
        <Route path='/tournaments' element={<TournamentsList />} exact/>
        <Route path='/tournaments/:id' element={<TournamentComponent />} exact/>
        <Route path='/add_tournament' element={<AddTournament />} exact/>
        <Route path='/stats/matchup-chart' element={<MatchUpChart />} exact/>
        <Route path='/stats/chars-usage' element={<CharUsage />} exact/>
        <Route path='/chars/:id' element={<CharDetail />} exact/>
      </Routes>
    </div>
  );
}

export default App;
