import React, { useState } from 'react';
import Row from './row';
import constants from '../constants/constants';


const Field = () => {
  const [wordArray, setWordArray] = useState([
    {word:'пилот', bulls:[2,4] , cows:[1,2]},
    {word:'пилот', bulls:[2,4] , cows:[1,2]},
    {word:'пилот', bulls:[2,4] , cows:[1,2]},
    {word:'пилот', bulls:[2,4] , cows:[1,2]},
    {word:'пилот', bulls:[2,4] , cows:[1,2]},
    {word:'пилот', bulls:[2,4] , cows:[1,2]}
  ]);

  return (
    <div>
      {wordArray.map((word, index) => (
        <Row key={index} word={word} />
      ))}
    </div>
  );
};

export default Field;