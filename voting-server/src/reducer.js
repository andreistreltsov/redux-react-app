import {setEntries} from '../src/application';
import {startNewVote} from '../src/application';
import {vote} from '../src/application';
import {endVote} from '../src/application';

export function reduce(state, action){
    switch(action.type){
    case 'SET_ENTRIES':
	return setEntries(state, action.entries);
    case 'START_NEW_VOTE':
	return startNewVote(state);
    case 'VOTE':
	return vote(state, action.item);
    case 'END_VOTE':
	return endVote(state);
    }
    return state;
}
