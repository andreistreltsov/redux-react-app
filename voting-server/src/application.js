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

export function vote(appState, itemToVoteFor){
    const vote = appState.get('vote');
    const ii = vote.update(
	vote.findIndex(x => x.get('item') === itemToVoteFor),
	itemScore => itemScore.update('score', x => x + 1));

    return appState.merge({
	vote: vote.update(
	    vote.findIndex(x => x.get('item') === itemToVoteFor),
	    itemScore => itemScore.update('score', x => x + 1))
    });
}
