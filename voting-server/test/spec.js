import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries} from '../src/application';
import {startNewVote} from '../src/application';
import {vote} from '../src/application';
import {endVote} from '../src/application';

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
	    const initAppState = Map({
		entries: List.of('a', 'b', 'c')
	    });

	    const newAppState = startNewVote(initAppState);

	    expect(newAppState).to.equal(Map({
		entries: List.of('c'),
		vote: List.of(
		    Map({ item: 'a', score: 0 }),
		    Map({ item: 'b', score: 0 })
		)
	    }));
	});
    });

    describe('vote', () => {
	it('increments score of item', () => {
	    const initAppState = Map({
		vote: List.of(
		    Map({ item: 'a', score: 0 }),
		    Map({ item: 'b', score: 0 })
		)
	    });

	    const newAppState = vote(initAppState, 'b');

	    expect(newAppState).to.equal(Map({
		vote: List.of(
		    Map({ item: 'a', score: 0 }),
		    Map({ item: 'b', score: 1 })
		)
	    }));
	});
    });

    describe('end vote', () => {
	it('puts winner back to entries', () => {
	    const initAppState = Map({
		entries: List.of('c'),
		vote: List.of(
		    Map({ item: 'a', score: 1 }),
		    Map({ item: 'b', score: 2 })
		)
	    });

	    const newAppState = endVote(initAppState);

	    expect(newAppState.get('entries')).to.equal(List.of('c','b'));
	});

	it('puts both back to entries if tie', () => {
	    const initAppState = Map({
		entries: List.of('c'),
		vote: List.of(
		    Map({ item: 'a', score: 2 }),
		    Map({ item: 'b', score: 2 })
		)
	    });

	    const newAppState = endVote(initAppState);

	    expect(newAppState.get('entries')).to.equal(List.of('c', 'a', 'b'));
	});

    });
});
