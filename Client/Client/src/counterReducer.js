// counterReducer.js

const counterReducer = (state, action) => {
    switch (action.type) {
      case 'SET_MAIN':
        return { ...state, mainCounter: action.count };
      case 'SET_MY':
        return { ...state, myCounter: action.count };
      case 'INCREMENT_MAIN':
        return { ...state, mainCounter: state.mainCounter + 1 };
      case 'DECREMENT_MAIN':
        return { ...state, mainCounter: state.mainCounter - 1 };
      case 'INCREMENT_MY':
        return { ...state, myCounter: state.myCounter + 1 };
      case 'DECREMENT_MY':
        return { ...state, myCounter: state.myCounter - 1 };
      default:
        return state;
    }
  };
  
  export default counterReducer;
  