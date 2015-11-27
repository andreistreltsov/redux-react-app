import Server from 'socket.io';
import {createStore} from 'redux';
import reduce from './reducer';

const store = createStore(reduce);
const port = 8090;
const io = new Server().attach(port);

store.subscribe(() => io.emit('state', store.getState.toJS()));

io.on('connection', socket => {
    socket.emit('state', store.getState.toJS());
    socket.on('action', store.dispatch.bind(store));
});

console.log('started server on ' + port);

store.dispatch({ type: 'SET_ENTRIES', entries: require('./entries.json') });
store.dispatch({ type: 'START_NEW_VOTE' });
