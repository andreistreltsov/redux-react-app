import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries} from '../src/application';

describe('application logic', () => {
    describe('setEntries', () => {
	it('replaces entries', () => {
	    let initialAppState = Map();
	    let entriesToSet = List.of('a','b');
	    let newAppState = setEntries(initialAppState, entriesToSet);

	    expect(newAppState).to.equal(Map({
		entries: List.of('a','b')
	    }));
	});
    });
});
