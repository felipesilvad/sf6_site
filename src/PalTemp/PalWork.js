import React from 'react';
import { Image } from 'react-bootstrap';

function PalWork({work}) {
  const getWorkImg = (work) => {
    return `https://firebasestorage.googleapis.com/v0/b/nether-3311f.appspot.com/o/Pal%2Ftypes%2F${work}_icon.png?alt=media&token=41b8469a-827a-4b77-be1b-be66c75f9070`
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  if (work) {
    return (
      <div className='d-flex flex-wrap'>
        {work.map(x => (
          (x.value>0)&&(
            <div className='work-m__bg'>
              <Image className='work-img' src={getWorkImg(capitalizeFirstLetter(x.label))} />
              <b className='mr-1'>{x.value}</b>
            </div>
          )
        ))}
      </div>
    );
  }
}

export default PalWork;