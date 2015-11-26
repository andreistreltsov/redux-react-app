import {createStore} from 'redux';
import {reduce} from './reducer';

export default function makeStore(){
    return createStore(reduce);
}
