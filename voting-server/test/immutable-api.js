import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability examples', () => {
    describe('a number', () => {
	const square = n => n * n;

	it('is immutable', () => {
	    const a = 2;
	    const b = square(a);

	    expect(b).to.equal(4);
	    expect(a).to.equal(2);
	});
    });

    describe('a list', () => {
	const addToList = (list, item) => list.push(item);

	it('is immutable', () => {
	    const listA = List.of(1, 2, 3);
	    const listB = addToList(listA, 4);

	    expect(listB).to.equal(List.of(1,2,3,4));
	    expect(listA).to.equal(List.of(1,2,3));
	});
    });

    describe('a map', () => {
	const addItemToMapKey = (map, key, item) => map.set(key, map.get(key).push(item))

	it('is immutable', () => {
	    const mapA = Map({
		items: List.of(1, 2, 3)
	    });

	    const mapB = addItemToMapKey(mapA, 'items', 4);

	    expect(mapB).to.equal(Map({
		items: List.of(1, 2, 3, 4)
	    }));
	    
	    expect(mapA).to.equal(Map({
		items: List.of(1, 2, 3)
	    }));
	});
    });

    describe('a map', () => {
	const addItemToMapKey = (map, key, item) => map.update(key, items => items.push(item))

	it('updates the key', () => {
	    const mapA = Map({
		items: List.of(1, 2, 3)
	    });

	    const mapB = addItemToMapKey(mapA, 'items', 4);

	    expect(mapB).to.equal(Map({
		items: List.of(1, 2, 3, 4)
	    }));
	    
	    expect(mapA).to.equal(Map({
		items: List.of(1, 2, 3)
	    }));
	});
    });

});
    
