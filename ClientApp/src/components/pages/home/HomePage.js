import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, alpha } from '@mui/material';
import { red } from '@mui/material/colors';
function HomePage(props) {
  var items = [
    {
      id: 1,
      name: "Soldaat van Oranje",
      description: "Wegens succes verlengd tot 1 mei 2077!Wegens succes verlengd tot 1 mei 2077!Wegens succes verlengd tot 1 mei 2077!Wegens succes verlengd tot 1 mei 2077!Wegens succes verlengd tot 1 mei 2077!Wegens succes verlengd tot 1 mei 2077!Wegens succes verlengd tot 1 mei 2077!Wegens succes verlengd tot 1 mei 2077!Wegens succes verlengd tot 1 mei 2077!Wegens succes verlengd tot 1 mei 2077!",
      image: "https://www.soldaatvanoranje.nl/wp-content/uploads/2018/12/svo_share-3.jpg"
    },
    {
      id: 2,
      name: "Random Name #2",
      description: "Hello World!",
      image: "https://i.ytimg.com/vi/hAsZCTL__lo/maxresdefault.jpg"
    },{
    id: 3,
    name: "Random Name #3",
    description: "Very epic sauce!",
    image: "https://www.soldaatvanoranje.nl/wp-content/uploads/2018/12/svo_share-3.jpg"
    }
  ]
  return (
    <div >
    <Carousel interval={4000}>
      {
        items.map((item, i) => <Item key={item.id} item={item} />)
      }
    </Carousel>
    <div style={{ width: '50%', margin: 'auto' }}>
      <h3>Lorem</h3>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.

Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia.</p>
      <p>More paragraphs</p>
    </div>
    </div>
  )
}
function Item(props) {
    return (
        <div>
      <Paper>
        <div style={{ display: 'flex',
         alignItems: 'center',
          backgroundColor: '#90caf9',
           justifyContent: 'center' }}>
          <a href="https://www.soldaatvanoranje.nl/">
            <img src={props.item.image} alt={props.item.name} style={{ maxHeight: '45vh' }} />
          </a>
          <div style={{ position: 'absolute',
           top: 0,
            left: 0,
             right: 0,
              bottom: 0,
               display: 'flex',
                flexDirection: 'column',
                 alignItems: 'center',
                  justifyContent: 'center',
                   padding: '1em' }}>
            <div style=
            {{backgroundColor: 'rgba(0,0,0,0.5)',
             backgroundClip: 'text',
              position: 'absolute',
               bottom: 0 }}>
              <h2 style=
              {{ color: 'white',
               fontSize: '100%' }}>
                {props.item.name}
              </h2>
              <p style=
              {{ color: 'white',
               fontSize: '70%' }}>
                {props.item.description}
              </p>
            </div>
          </div>
        </div>
        <div style=
        {{ display: 'flex',
         justifyContent: 'center',
          alignItems: 'center',
           flexDirection: 'column',
            backgroundColor: red }}>
        </div>
      </Paper>
      </div>
    );
  }
  
  
  
export default HomePage;
