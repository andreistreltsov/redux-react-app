import Server from 'socket.io';
import {createStore} from 'redux';
import reduce from './reducer';

export const store = createStore(reduce);
const port = 8090;
const io = new Server().attach(port);
console.log('started server on ' + port);
