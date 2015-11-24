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

    return appState.merge({
	vote: vote.update(
	    vote.findIndex(x => x.get('item') === itemToVoteFor),
	    itemScore => itemScore.update('score', x => x + 1))
    });
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
