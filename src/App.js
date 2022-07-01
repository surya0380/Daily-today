import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  const [progress, setProgress] = useState(0);


  const setNewProgress = (progress) => {
    setProgress(progress)
  }

    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={setNewProgress} key="general" pageSize={8} country="in" category="general" />} />
            <Route exact path="/business" element={<News setProgress={setNewProgress} key="business" pageSize={8} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={setNewProgress} key="entertainment" pageSize={8} country="in" category="entertainment" />} />
            <Route exact path="/general" element={<News setProgress={setNewProgress} key="general" pageSize={8} country="in" category="general" />} />
            <Route exact path="/health" element={<News setProgress={setNewProgress} key="health" pageSize={8} country="in" category="health" />} />
            <Route exact path="/science" element={<News setProgress={setNewProgress} key="science" pageSize={8} country="in" category="science" />} />
            <Route exact path="/sports" element={<News setProgress={setNewProgress} key="sports" pageSize={8} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={setNewProgress} key="technology" pageSize={8} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
}

export default App

