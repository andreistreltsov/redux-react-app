import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['a', 'c'];

ReactDOM.render(
  <Voting pair={pair} hasVoted="a" winner="" />,
  document.getElementById('app')
);
