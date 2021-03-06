import {List, Map, fromJS} from 'immutable';
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
	    const initVoteState = fromJS([
		{ item: 'a', score: 0 },
		{ item: 'b', score: 0 }
	    ]);

	    const newVoteState = vote(initVoteState, 'b');

	    expect(newVoteState).to.equal(fromJS([
		{ item: 'a', score: 0 },
		{ item: 'b', score: 1 }
	    ]));
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

	it('declares winner if last entrie', () => {
	    const initAppState = Map({
		entries: List.of(),
		vote: List.of(
		    Map({ item: 'a', score: 3 }),
		    Map({ item: 'b', score: 2 })
		)
	    });

	    const newAppState = endVote(initAppState);

	    expect(newAppState.get('winner')).to.equal('a');
	});

    });
});
