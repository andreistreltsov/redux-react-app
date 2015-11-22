import {List, Map} from 'immutable';

export function setEntries(appState, entries){
    return appState.set('entries', entries);
}

export function startNewVote(appState){
    const entries = appState.get('entries');

    return appState.merge({
	entries: entries.skip(2),
	vote: entries.take(2).map(e => Map({ item: e, score: 0 }))
    });
}
