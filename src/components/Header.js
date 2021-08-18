import React from 'react';


const Header = ({ logo }) => {

  return (
    <div>
      <div className='header'>
        <div className='logo'>
          <img src={logo} alt='logo.png' ></img>
        </div>
        <div><div className='logout-text'>Logout</div></div>
      </div>
    </div>
  )
};

export default Header;