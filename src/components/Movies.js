import React, { useState } from 'react';
import { BrowserRouter as Switch, Link } from 'react-router-dom'



const Movies = ({ data, clickedInfo }) => {
  const [localData, setLocalData] = useState(data)

  return (
    <div className='App-content'>
      <p className='breadcrumb'><Link to='/'>Home</Link> <span >> Movies</span></p>
      <h2>Popular Movies</h2>
      <div className='grid-container'>
        {
          localData &&
          localData.entries
            .filter(data => data.programType === 'movie')
            .map((m, index) => (
              <div onClick={e => clickedInfo(m)} key={index} className='item'>
                <figure className='grid-item' key={index} >
                  <img alt={m.title} src={m.images.['Poster Art'].url} />
                  <div className='output-text'>{m.title}</div>
                </figure>
              </div>
            ))
        }
      </div>
    </div >
  )
};

export default Movies;