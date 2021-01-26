import React from 'react'
import Jumbotron from './components/jumbotron/jumbotron.component'
import JumboData from '../src/fixtures/jumbo.json';

function App() {
  return (
    <Jumbotron.Container>
      {
        JumboData.map(({ title, subTitle, image, alt, direction, id }) => {
          return (
            <Jumbotron key={id} direction={direction} >
              <Jumbotron.Pane>
                <Jumbotron.Title>{title}</Jumbotron.Title>
                <Jumbotron.SubTitle>{subTitle}</Jumbotron.SubTitle>
              </Jumbotron.Pane>
              <Jumbotron.Pane>
                <Jumbotron.Image src={image} alt={alt} />
              </Jumbotron.Pane>
            </Jumbotron>
          )
        })
      }
    </Jumbotron.Container>
  );
}

export default App;
