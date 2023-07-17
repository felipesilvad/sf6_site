import React from 'react';
import {useLocation,Link} from "react-router-dom";

function StatsNav() {
  const location = useLocation();
  const path = location.pathname
  return (
    <div>
      <h6 className='text-uppercase text-red'>Stats From Tournaments Matches Only</h6>
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
    </div>
  );
  
}
export default StatsNav;
