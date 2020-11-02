export const initialState = {
  // how the data layout looks initially when user is not logged in
  user: null,
};

export const actionTypes = {
  // action dispatched...
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    //   if setuser action is dispatched then ... :
    case actionTypes.SET_USER:
      //  console.log(action);
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
