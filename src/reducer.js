export const initialState = {
  // how the data layout looks initially when user is not logged in
  user: null,
  uid: null,
  togglerState: 1,
  photoURL: "",
};

export const actionTypes = {
  // action dispatched...
  SET_USER: "SET_USER",
  SET_SESSION: "SET_SESSION",
  SET_TOGGLER: "SET_TOGGLER",
};

const reducer = (state, action) => {
  //console.log(action);
  switch (action.type) {
    //   if setuser action is dispatched then ... :
    case actionTypes.SET_USER:
      //  console.log(action);
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_SESSION:
      localStorage.setItem("uid", action.uid);
      localStorage.setItem("displayName", action.displayName);
      localStorage.setItem("photoURL", action.photoURL);
      console.log("session added to storage");
      return {
        ...state,
        uid: action.uid,
        displayName: action.displayName,
        photoURL: action.photoURL,
      };
    case actionTypes.SET_TOGGLER:
      return {
        ...state,
        togglerState: action.togglerState,
      };

    default:
      return state;
  }
};

export default reducer;
