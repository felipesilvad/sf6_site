import React from 'react';
import { Image } from 'react-bootstrap';

function PalType({pal}) {
  const getTypeImg = (type) => {
    return `https://firebasestorage.googleapis.com/v0/b/nether-3311f.appspot.com/o/Pal%2Ftypes%2F${type}_white_icon.png?alt=media&token=41b8469a-827a-4b77-be1b-be66c75f9070`
  }
  
  if (pal) {
    return (
      <>
        <div className={`${pal.type1.toLowerCase()}_type type-div`}>
          <Image className='type-img' src={getTypeImg(pal.type1)} />
          <div className='type-txt'>{pal.type1}</div>
        </div>
        {pal.type2&&(
          <div className={`${pal.type2.toLowerCase()}_type type-div`}>
            <Image className='type-img' src={getTypeImg(pal.type2)} />
            <div className='type-txt'>{pal.type2}</div>
          </div>
        )}
      </>
    );
  }
}

export default PalType;