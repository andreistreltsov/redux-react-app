import {List, Map, fromJS} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(appState, entries){
    return appState.set('entries', List(entries));
}

export function startNewVote(appState){
    const entries = appState.get('entries');

    return appState.merge({
	entries: entries.skip(2),
	vote: entries.take(2).map(e => Map({ item: e, score: 0 }))
    });
}

export function vote(voteState, itemToVoteFor){
    return voteState.update(
	voteState.findIndex(x => x.get('item') === itemToVoteFor),
	itemScore => itemScore.update('score', x => x + 1));
}

export function endVote(appState){
    function winners() {
	const votedItems = appState.get('vote');
	const topScore = votedItems.maxBy(item => item.get('score')).get('score');
	return votedItems.filter(item => item.get('score') === topScore).map(i => i.get('item'));
    }

    const remainingEntries = appState.get('entries').concat(winners());

    const canDelareWinner = remainingEntries.size === 1;

    if (canDelareWinner){
	return appState
	    .set('winner', remainingEntries.first())
	    .set('entries', List())
	    .set('vote', List());

    }

    return appState.set('entries', remainingEntries);
}
