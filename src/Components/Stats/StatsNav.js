import React from 'react';
import {useLocation,Link} from "react-router-dom";

function StatsNav() {
  const location = useLocation();
  const path = location.pathname
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link to="/stats/matchup-chart"
          className={`nav-link ardela p-2 ${(path === "/stats/matchup-chart")&&('active stats-nav-active')}`} 
        >Match Up Chart</Link>
      </li>
      <li className="nav-item">
        <Link to="/stats/chars-usage"
          className={`nav-link ardela p-2 ${(path === "/stats/chars-usage")&&('active stats-nav-active')}`} 
        >Characters Usage</Link>
      </li>
    </ul>
  );
  
}
export default StatsNav;
