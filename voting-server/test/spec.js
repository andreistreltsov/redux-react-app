import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries} from '../src/application';
import {startNewVote} from '../src/application';

describe('application logic', () => {
    describe('setEntries', () => {
	it('replaces entries', () => {
	    const initialAppState = Map();
	    const entriesToSet = List.of('a','b');
	    const newAppState = setEntries(initialAppState, entriesToSet);

	    expect(newAppState).to.equal(Map({
		entries: List.of('a','b')
	    }));
	});
    });

    describe('startNewVote', () => {
	it('moves two entries to vote', () => {
	    const appState = Map({
		entries: List.of('a', 'b', 'c')
	    });

	    const newAppState = startNewVote(appState);

	    expect(newAppState).to.equal(Map({
		entries: List.of('c'),
		vote: List.of(
		    Map({ item: 'a', score: 0 }),
		    Map({ item: 'b', score: 0 })
		)
	    }));
	});
    });
});
