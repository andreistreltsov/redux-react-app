import {setEntries, startNewVote, vote, endVote, INITIAL_STATE} from '../src/application';

export function reduce(state = INITIAL_STATE, action){
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
