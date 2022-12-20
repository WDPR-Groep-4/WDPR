import React from 'react'

export default function AgendaItem({item}) {
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      
      const images = importAll(require.context('./plaatjes', false, /\.(png|jpe?g|svg)$/));
      
      

    return (
      <div>
        <img height={200} src={images['soldaat-van-oranje-de.jpg']} />
          <label>
              <img height={200} id="image" src = "./plaatjes/soldaat-van-oranje-de.jpg" alt="soldaat van oranje" />
            {item.name}
          </label>
      </div>
    )
  }
  