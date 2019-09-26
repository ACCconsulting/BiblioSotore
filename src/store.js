import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import firebase from "firebase/app";
import "firebase/firestore";

//confgurar firestor
const firebaseConfig = {
  apiKey: "AIzaSyAm1B7HQKyxdBy3KQqo5KAsIbi8bzHRZWk",
  authDomain: "gustavo-5b910.firebaseapp.com",
  databaseURL: "https://gustavo-5b910.firebaseio.com",
  projectId: "gustavo-5b910",
  storageBucket: "gustavo-5b910.appspot.com",
  messagingSenderId: "977833420288",
  appId: "1:977833420288:web:e5cadd80ac417067d89ae5"
};

//initializar firebase
firebase.initializeApp(firebaseConfig);

//Configuracion de react-ridux
const rrConfig = {
  userProfile: "user",
  useFirestoreForProfile: true
};
//crear el enhancer  con compose de ridux y firestore
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, firebaseConfig),
  reduxFirestore(firebase)
)(createStore);

//reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

//State inicial
const initialeState = {};

// const store= createStoreWithFirebase(rootReducer,initialeState compose(
//   reactReduxFirebase(firebase),
//   Window.__REDUX_DEVTOOLS_EXTENSION__ & Window.__REDUX_DEVTOOLS_EXTENSION__()
// ))

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStoreWithFirebase(
  rootReducer,
  initialeState,
  composeEnhancers(reactReduxFirebase(firebase))
);

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   rootReducer,
//   initialState,
//   composeEnhancers(applyMiddleware(thunk, ...middleware))
// );

export default store;
