function process(state, action) {


  if (action.type !== "ADD_DATA") {return state}

  if (action.data.command === "dongle_status") {
    console.log("dongle:", action.data.data.dongle_id)
    return {
      ...state,
      [action.data.data.dongle_id]: {
        online: action.data.data.online,
        last_seen: action.data.data.time,
        dongle_id: action.data.data.dongle_id
      }
    }
  } else {
    return state;
  }


}





const Reducer = (state, action) => {
  console.log("input", state, action)
  switch (action.type) {
    case 'ADD_DATA':
      return process(state, action) 
    default:
      return state;
  }
};

export default Reducer;