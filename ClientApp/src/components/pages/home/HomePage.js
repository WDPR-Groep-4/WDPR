import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, alpha } from '@mui/material';
import { red } from '@mui/material/colors';
function HomePage(props) {
  var items = [
    {
      id: 1,
      name: "Soldaat van Oranje",
      description: "Wegens succes verlengd tot 1 mei 2077!",
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
    <Carousel>
      {
        items.map((item, i) => <Item key={item.id} item={item} />)
      }
    </Carousel>
  )
}
function Item(props)
{
  return(
    <Paper>
      <div style={{
         display: 'flex',
          alignItems: 'center',
           backgroundColor: '#DCDCDC',
            justifyContent: 'center'}}>
              <a href="https://www.soldaatvanoranje.nl/">
      <img src={props.item.image}
       alt={props.item.name}
        style={{
           maxHeight :'45vh',}} />
            </a>
                   <h2 style={{position: 'absolute',color:'white' , backgroundColor:'rgba(0,0,0,0.5)', fontSize:'100%' }}>
              {props.item.name}
      </h2>
      <p style={{position: 'absolute', color:'white' , backgroundColor:'rgba(0,0,0,0.5)', fontSize:'70%' }}>
        {props.item.description}
      </p>
      </div>
      <div style={{
        display:'flex',
         justifyContent:'center',
          alignItems:'center',
          flexDirection:'column',
           backgroundColor:red}}  >
      <Button variant='contained'>
        Check it out!
      </Button>
     
      </div>
    </Paper>
  )
}
export default HomePage;
