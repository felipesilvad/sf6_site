import React from 'react';
import {Image} from 'react-bootstrap';

function ItemSquare({item}) {

  if (item) {
    return (
      <div key={item.id} className='item-square__div'>
        <div className='item-square__type'>
          {item.type2}
        </div>
        <div className='d-flex justify-content-center'>
          <Image className="item-square__img mx-auto"
          src={`https://firebasestorage.googleapis.com/v0/b/nether-3311f.appspot.com/o/Pal%2Fitems%2F${
            (item.type2 === "Items")?(
              item.img_id.replace("/images/items/", "")
            ) : (
              item.img_id
            )
          }.webp?alt=media`} />
        </div>
        <div className='item-square-title__div d-flex justify-content-center align-items-center'>
          <b className='item-square-title__txt'>{item.title}</b>
        </div>
      </div>
    )
  }
}

export default ItemSquare;