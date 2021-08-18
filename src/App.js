import React, { useState, useEffect } from 'react'
import './App.css'
import { Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
// import firebase from './firebase';
import logo from './logo.png';
import data from './data/sample.json'
import Movies from './components/Movies'
import Series from './components/Series'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function getModalStyle() {
  return {
    overflow: 'scroll',
    width: '50%',
    top: '53%',
    left: '47%',
    transform: 'translate(-46%, -53%)',
    position: 'absolute',
    height: 'auto',
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [modal, setModal] = useState(false)
  const [fact, setFact] = useState('')
  const [modalData, setModalData] = useState({})
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getYearFactFetch = async () => {
      if (modalData.releaseYear === undefined) {
        modalData.releaseYear = '2021'
      }
      let number = await modalData.releaseYear;
      console.log(number)
      setIsLoading(true);
      // fetch returns a promise
      fetch('http://numbersapi.com/' + number + '/year')
        .then(response => response.text())
        .then(data => {
          if (number !== '') {
            setFact(data)
            setIsLoading(false);
          }
        })
        .catch(err => console.log(err));
    }
    getYearFactFetch()
  }, [modalData])


  const handleOpen = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };


  const clickedInfo = (date) => {
    return (
      handleOpen(),
      setModalData(date)
    )
  }

  const modalBody = (
    <div style={modalStyle} className={classes.paper} >
      <div>
        <img className='modalImage' alt={modalData.title} src={modalData.images && modalData.images.['Poster Art'].url} />
        <h4>{modalData.title}</h4>
        <p>{modalData.releaseYear}</p>
        <h4>Plot Summary</h4>
        <p>{modalData.description}</p>
        <h4>Fun facts on the dates of this release</h4>
        {isLoading ? (
          <p>Loading ...</p>
        ) : (<div>{fact}</div>)}
      </div>
    </div >
  )

  return (
    <Router className='main'>
      <Header logo={logo} />
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/movies'>
          <Movies
            data={data}
            clickedInfo={clickedInfo}
          />
        </Route>
        <Route path='/series'>
          <Series
            data={data}
            clickedInfo={clickedInfo}
          />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
