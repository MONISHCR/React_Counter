// // MyCounter.js
// import React, { useContext, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import CounterContext from './CounterContext';

// const MyCounter = () => {
//   const { state, dispatch } = useContext(CounterContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMyCounter = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/mycounter');
//         dispatch({ type: 'SET_MY', count: response.data.count });
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchMyCounter();
//   }, [dispatch]);

//   const incrementMyCounter = useCallback(async () => {
//     try {
//       await axios.post('http://localhost:5000/api/mycounter/increment');
//       dispatch({ type: 'INCREMENT_MY' });
//     } catch (err) {
//       console.error(err);
//     }
//   }, [dispatch]);

//   const decrementMyCounter = useCallback(async () => {
//     try {
//       await axios.post('http://localhost:5000/api/mycounter/decrement');
//       dispatch({ type: 'DECREMENT_MY' });
//     } catch (err) {
//       console.error(err);
//     }
//   }, [dispatch]);

//   return (
//     <div>
//       <h2>My Counter</h2>
//       <p>Count: {state.myCounter}</p>
//       <button onClick={incrementMyCounter}>Increment My Counter</button>
//       <button onClick={decrementMyCounter}>Decrement My Counter</button>
//       <button onClick={() => navigate('/')}>Go to Home</button>
//     </div>
//   );
// };

// export default MyCounter;
// MyCounter.js
import React, { useContext, useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CounterContext from './CounterContext';

const MyCounter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();
  const [mainCounter, setMainCounter] = useState(0); // State to store Main Counter count

  useEffect(() => {
    const fetchMyCounter = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/mycounter');
        dispatch({ type: 'SET_MY', count: response.data.count });
      } catch (err) {
        console.error(err);
      }
    };

    const fetchMainCounter = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/counter');
        setMainCounter(response.data.count); // Set Main Counter count
      } catch (err) {
        console.error(err);
      }
    };

    fetchMyCounter();
    fetchMainCounter();
  }, [dispatch]);

  const incrementMyCounter = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/api/mycounter/increment');
      dispatch({ type: 'INCREMENT_MY' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const decrementMyCounter = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/api/mycounter/decrement');
      dispatch({ type: 'DECREMENT_MY' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>My Counter</h2>
      <p>Count: {state.myCounter}</p>
      <h2>Main Counter</h2>
      <p>Count: {mainCounter}</p> {/* Display Main Counter count */}
      <button onClick={incrementMyCounter}>Increment My Counter</button>
      <button onClick={decrementMyCounter}>Decrement My Counter</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default MyCounter;
