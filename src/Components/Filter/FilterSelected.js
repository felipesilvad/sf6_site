import React from 'react';
import {Button} from 'react-bootstrap';
import FilterHeadChar from './FilterHeadChar';
import FilterHeadCntrl from './FilterHeadCntrl';
import {BiSearchAlt,BiSolidTrash} from 'react-icons/bi'
import FilterHeadPlayer from './FilterHeadPlayer';
import FilterHeadTourney from './FilterHeadTourney';

function FilterSelected({char1,char2,reloadFilterChar1,reloadFilterChar2,openModal,
  reloadFilterCntrl1,reloadFilterCntrl2,cntrl1,cntrl2,clearFilters,
  reloadFilterPlayer1,reloadFilterPlayer2,player1,player2,
  reloadFilterTourney, tourney
}) {

  return (
    <div className='filter-select d-flex my-1' >
      <Button className="add-filter-button ardela px-2"
      onClick={() => openModal()}>
        <BiSearchAlt />
      </Button>
      <Button className="add-filter-button ardela clear-filter-button px-2"
      onClick={() => clearFilters()}>
        <BiSolidTrash />
      </Button>
      <div className='d-flex flex-wrap align-self-center' >
        {cntrl1&&(
          <FilterHeadCntrl cntrl={cntrl1} reloadFilter={reloadFilterCntrl1} />
        )}
        {char1&&(
          <FilterHeadChar id={char1} reloadFilter={reloadFilterChar1} />
        )}
        {cntrl2&&(
          <FilterHeadCntrl cntrl={cntrl2} reloadFilter={reloadFilterCntrl2} />
        )}
        {char2&&(
          <FilterHeadChar id={char2} reloadFilter={reloadFilterChar2} />
        )}
        {player1&&(
          <FilterHeadPlayer id={player1} reloadFilter={reloadFilterPlayer1} />
        )}
        {player2&&(
          <FilterHeadPlayer id={player2} reloadFilter={reloadFilterPlayer2} />
        )}
        {tourney&&(
          <FilterHeadTourney id={tourney} reloadFilter={reloadFilterTourney} />
        )}
      </div>
    </div>
  );
}

export default FilterSelected;