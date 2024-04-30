// Home.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CounterContext from './CounterContext';

const Home = () => {
  const { state, dispatch } = useContext(CounterContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const mainCounterResponse = await axios.get('http://localhost:5000/api/counter');
        const myCounterResponse = await axios.get('http://localhost:5000/api/mycounter');
        // Dispatch the counter values to update the state
        dispatch({ type: 'SET_MAIN', count: mainCounterResponse.data.count });
        dispatch({ type: 'SET_MY', count: myCounterResponse.data.count });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchCounters();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Main Counter Value: {state.mainCounter}</h1>
      <h1>My Counter Value: {state.myCounter}</h1>
      <Link to="/counter">Counter</Link>
      <Link to="/mycounter">My Counter</Link>
    </div>
  );
};

export default Home;
