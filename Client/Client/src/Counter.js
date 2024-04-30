// // Counter.js
// import React, { useContext, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import CounterContext from './CounterContext';

// const Counter = () => {
//   const { state, dispatch } = useContext(CounterContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCounter = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/counter');
//         dispatch({ type: 'SET_MAIN', count: response.data.count });
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchCounter();
//   }, [dispatch]);

//   const incrementMainCounter = useCallback(async () => {
//     try {
//       await axios.post('http://localhost:5000/api/counter/increment');
//       dispatch({ type: 'INCREMENT_MAIN' });
//     } catch (err) {
//       console.error(err);
//     }
//   }, [dispatch]);

//   const decrementMainCounter = useCallback(async () => {
//     try {
//       await axios.post('http://localhost:5000/api/counter/decrement');
//       dispatch({ type: 'DECREMENT_MAIN' });
//     } catch (err) {
//       console.error(err);
//     }
//   }, [dispatch]);

//   return (
//     <div>
//       <h2>Main Counter</h2>
//       <p>Count: {state.mainCounter}</p>
//       <button onClick={incrementMainCounter}>Increment Main Counter</button>
//       <button onClick={decrementMainCounter}>Decrement Main Counter</button>
//       <button onClick={() => navigate('/')}>Go to Home</button>
//     </div>
//   );
// };

// export default Counter;
// Counter.js
import React, { useContext, useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CounterContext from './CounterContext';

const Counter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();
  const [myCounter, setMyCounter] = useState(0); // State to store MyCounter count

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/counter');
        dispatch({ type: 'SET_MAIN', count: response.data.count });
      } catch (err) {
        console.error(err);
      }
    };

    const fetchMyCounter = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/mycounter');
        setMyCounter(response.data.count); // Set MyCounter count
      } catch (err) {
        console.error(err);
      }
    };

    fetchCounter();
    fetchMyCounter();
  }, [dispatch]);

  const incrementMainCounter = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/api/counter/increment');
      dispatch({ type: 'INCREMENT_MAIN' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const decrementMainCounter = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/api/counter/decrement');
      dispatch({ type: 'DECREMENT_MAIN' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Main Counter</h2>
      <p>Count: {state.mainCounter}</p>
      <h2>My Counter</h2>
      <p>Count: {myCounter}</p> {/* Display MyCounter count */}
      <button onClick={incrementMainCounter}>Increment Main Counter</button>
      <button onClick={decrementMainCounter}>Decrement Main Counter</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default Counter;
