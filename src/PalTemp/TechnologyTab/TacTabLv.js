import React from 'react';
import ItemSquare from '../ItemSquare';

function TacTabLv({items, lv, structures, itemsAll}) {
  
  const getItemData = (itemSlug) => {
    const isStructure = structures.filter(item => item.id === itemSlug)
    const isItem = itemsAll.filter(item => item.slug === itemSlug)

    if (isStructure.length > 0) {
      return isStructure[0]
    } else if (isItem.length > 0) {
      return isItem[0]
    } else {
      return null
    }
  }

  return (
    <div key={lv} className='d-flex tec-lv__bg align-items-center'>
      <div>
        <div className='tec-lv__diamond'>
          <div className={`tec-lv__vl ${lv===50&&('tec-lv__vl-last')}`}></div>
          <b className='tec-lv__txt'>{lv}</b>
        </div>
      </div>

      <div className='d-flex flex-wrap align-items-center'>
        {items.map(x => (
          <ItemSquare item={getItemData(x.slug)} />
        ))}
      </div>
    </div>
  )
  
}

export default TacTabLv;