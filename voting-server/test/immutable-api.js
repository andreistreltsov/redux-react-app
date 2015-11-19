import {expect} from 'chai';

describe('immutability examples', () => {
    describe('a number', () => {
	let square = n => n * n;

	it('is immutable', () => {
	    let a = 2;
	    let b = square(a);

	    expect(b).to.equal(4);
	    expect(a).to.equal(2);
	});

    });
});
    
