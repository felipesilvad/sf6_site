import React from 'react';
import {Routes, Route} from 'react-router-dom'
import MatchesList from './Components/Matches/MatchesList';
import AddTournament from './Components/Tournaments/AddTournament';
import HeaderComponent from './Components/Header';
import TournamentsList from './Components/Tournaments/TournamentsList';
import TournamentComponent from './Components/Tournaments/Tournament';
import MatchComponent from './Components/Matches/Match';
import MatchUpChart from './Components/Stats/MatchUpChart';

function App() {
  return (
    <div className='App'>
      <HeaderComponent />
      <Routes>
        <Route path='/' element={<MatchesList />} exact/>
        <Route path='/sets/:id' element={<MatchComponent />} exact/>
        <Route path='/tournaments' element={<TournamentsList />} exact/>
        <Route path='/tournaments/:id' element={<TournamentComponent />} exact/>
        <Route path='/add_tournament' element={<AddTournament />} exact/>
        <Route path='/stats/chars' element={<MatchUpChart />} exact/>
      </Routes>
    </div>
  );
}

export default App;
