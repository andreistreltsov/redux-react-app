import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setEntries, startNewVote, vote, endVote, INITIAL_STATE} from '../src/application';
import {reduce} from '../src/reducer';

describe('reducer', () => {
    it('hadles SET_ENTRIES', () => {
	const initAppState = Map();
	const newAppState = reduce(initAppState, { type: 'SET_ENTRIES', entries: ['a', 'b', 'c']});
	const expectedAppState = setEntries(initAppState, ['a', 'b', 'c']);

	expect(newAppState).to.equal(expectedAppState);
    });

    it('hadles startNewVote', () => {
	const initAppState = fromJS({entries: ['a','b','c']});
	const newAppState = reduce(initAppState, { type: 'START_NEW_VOTE' });
	const expectedAppState = startNewVote(initAppState);

	expect(newAppState).to.equal(expectedAppState);
    });

    it('handles vote', () => {
	const initVoteState = fromJS([
	    {item: 'a', score: 0},
	    {item: 'b', score: 0}]);
	const newAppState = reduce(initVoteState, { type: 'VOTE', item: 'a' });
	const expectedAppState = vote(initVoteState, 'a');

	expect(newAppState).to.equal(expectedAppState);
    });
    
    it('handles endVote', () => {
	const initAppState = fromJS({
	    vote: [
		{item: 'a', score: 1},
		{item: 'b', score: 0}],
	    entries: List()
	});
	const newAppState = reduce(initAppState, { type: 'END_VOTE' });
	const expectedAppState = endVote(initAppState);

	expect(newAppState).to.equal(expectedAppState);
    });

    it('creates initial state', () => {
	const newAppState = reduce(undefined, { type: 'SET_ENTRIES', entries: ['a', 'b', 'c']});
	const expectedAppState = setEntries(INITIAL_STATE, ['a', 'b', 'c']);

	expect(newAppState).to.equal(expectedAppState);
    });

});

