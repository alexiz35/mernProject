import reducerPage, {rootReducer} from './reducer'
import {legacy_createStore as createStore} from 'redux'

const mainStore = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default mainStore;

