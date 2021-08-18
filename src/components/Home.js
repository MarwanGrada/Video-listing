import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'


const Home = () => {

  return (
    <div className='App-content'>
      <h1>Oracle Video listing</h1>
      <h3>Welcome to my challenge result</h3>
      <div className='add-btn-container'>
        <Link className='items' to='/movies'>Movies</Link>
        <Link className='items' to='/series'>Series</Link>
      </div>
    </div>
  )
};

export default Home;