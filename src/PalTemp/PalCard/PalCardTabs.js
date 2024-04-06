import React from 'react';
import { Image } from 'react-bootstrap';
import PalCardTabsStats from './PalCardTabsStats';
import PalCardTabsWork from './PalCardTabsWork';
import PalCardTabsPSkill from './PalCardTabsPSkill';

function PalCardTabs({pal, cardTab, setCardTab}) {

  if (pal) {
    return (
      <div className='pct__bg'>
        <div className='tab-select'>
          <div className={`tab-select-option ${(cardTab===1)&&('active')}`} onClick={() => setCardTab(1)}>Stats</div>
          <div className={`tab-select-option ${(cardTab===2)&&('active')}`} onClick={() => setCardTab(2)}>Speed</div>
          <div className={`tab-select-option ${(cardTab===3)&&('active')}`} onClick={() => setCardTab(3)}>Work</div>
          <div className={`tab-select-option ${(cardTab===4)&&('active')}`} onClick={() => setCardTab(4)}>Skill</div>
        </div>
        {(cardTab===1)&&(
          <PalCardTabsWork work={pal.work} />
          )}
        {(cardTab===2)&&(
          <PalCardTabsStats stats={pal.main_stats} />
          )}
        {(cardTab===3)&&(
          <PalCardTabsStats stats={pal.speed} />
        )}
        {(cardTab===4)&&(
          <PalCardTabsPSkill skill={pal.partner_skill} />
        )}
      </div>
    );
  }
}

export default PalCardTabs;