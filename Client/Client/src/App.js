
// App.js
import React, { useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CounterContext from './CounterContext';
import counterReducer from './counterReducer';
import Home from './Home';
import Counter from './Counter';
import MyCounter from './MyCounter';
import './styles.css';


const App = () => {
  const [state, dispatch] = useReducer(counterReducer, { mainCounter: 0, myCounter: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/counter">Counter</Link>
              </li>
              <li>
                <Link to="/mycounter">My Counter</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/mycounter" element={<MyCounter />} />
          </Routes>
        </div>
      </Router>
    </CounterContext.Provider>
  );
};

export default App;
