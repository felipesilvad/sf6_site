import React from 'react';
import { Image } from 'react-bootstrap';

function PalCardTabsWork({work}) {

  const getWorkImg = (key) => {
    return `https://firebasestorage.googleapis.com/v0/b/nether-3311f.appspot.com/o/Pal%2Ftypes%2F${key}_icon.png?alt=media&token=41b8469a-827a-4b77-be1b-be66c75f9070`
  }

  return (
    <div className='d-flex flex-wrap mb-1'>
      {work.map(x => (
        (x.value>0)&&(
          <div className="w-50">
            <div className='work-tab__div'>
              <div className="d-flex align-items-center my-auto w-80">
                <Image className='work-img align-items-center' src={getWorkImg(x.label)} />
                <div className="work-tav__txt">
                  {x.label.replace("_", " ")}
                </div>
              </div>
              <span className="text-end w-20">
                <b className="work-lv">Lv</b><b className='pr-2'>{x.value}</b>
              </span>
            </div>
            <hr className="work-tab__hr" />
          </div>
        )
      ))}
    </div>
  );
}

export default PalCardTabsWork;