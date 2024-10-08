import React, { useState, useEffect, useCallback } from 'react';
import Row from './row';
import Win from './win';
import Loose from './loose';
import Noword from './noword';
import constants from '../constants/constants';
import RussianKeyboard from '../table/russianKeyboard';
import UpperNav from '../table/upperNav.js'
import { useGameContext } from './gameContext.js';


//const axios = require('axios');
 
const Field = () => {
  const [KEYWORD, setKEYWORD] = useState('');
  const [GAMESTATUS, setGAMESTATUS] = useState('new');

	const initialWordArray = Array.from({ length: constants.ATTEMPTS }, (i, ind) => {
		return {
		  word: Array.from({ length: constants.LETTERS }, () => ''),
		  cows: [],
		  bulls: [],
		  status: ind === 0 ? "current" : "clear"
		};
	  });

	const initGameStatus ='ON'
	const [wordArray, setWordArray] = useState({
		ATTEMPTS: initialWordArray,
		KEYWORD: KEYWORD,
		GAME: initGameStatus,
		MISTAKE:false
	});

	useEffect(() => {
		if (!wordArray.KEYWORD || wordArray.GAME === 'new') {
		  getWord();
		}
	  }, [wordArray.GAME, wordArray.KEYWORD]);
	
	  const getWord = () => {
		const newKeyword = getRandomIndex ()
		console.log('Word is: ' + newKeyword);
		setKEYWORD(newKeyword)
		setWordArray((prev) => ({ ...prev, KEYWORD: newKeyword, GAME: 'ON' }));
	};


	const getRandomIndex = ()=> {
			
		let usedIndexes = JSON.parse(localStorage.getItem('used')) || []; 
		let random;
	
		do {
			random = Math.floor(Math.random() * constants.WORDS.length); 
		} while (usedIndexes.includes(random)); 
		
		usedIndexes.push(random);
		localStorage.setItem('used', JSON.stringify(usedIndexes)); 
		return constants.WORDS[random].toUpperCase();; 
	}

	const handleWordArrayClick = (action , keyPressed = '') => {
		console.log ('handleWordArrayClick '+ action)
		if (action === 'new') {
			console.log ("***New")
			setWordArray({ ATTEMPTS: initialWordArray, KEYWORD: KEYWORD, GAME: initGameStatus });
			getWord()
			
		} else if (action === 'addLetter') {
			console.log ("***Add letter")
			const updatedWordArray = { ...wordArray };

			if  (updatedWordArray.GAME === 'WIN') {return;
			} else{
				const emptyWordIndex = updatedWordArray.ATTEMPTS.findIndex(
					(word) => word.status === 'current'
				);
					if (emptyWordIndex !== -1) {
					const emptyLetterIndex = updatedWordArray.ATTEMPTS[emptyWordIndex].word.findIndex(
						(letter) => letter === ''
					);
	
					if (emptyLetterIndex === constants.LETTERS) return;
	
					if (emptyLetterIndex !== -1) {
						updatedWordArray.ATTEMPTS[emptyWordIndex].word[emptyLetterIndex] = keyPressed;
						setWordArray(updatedWordArray);
					}
				}
			}
		} else if (action === 'deleteLetter') {
			console.log('***delete letter')
			const updatedWordArray = { ...wordArray };
			const emptyWordIndex = updatedWordArray.ATTEMPTS.findIndex(
				(word) => word.status === 'current'
			);

			if (emptyWordIndex !== -1) {
				const emptyLetterIndex = updatedWordArray.ATTEMPTS[emptyWordIndex].word.findIndex(
					(letter) => letter === ''
				);

				if (emptyLetterIndex !== -1) {
					updatedWordArray.ATTEMPTS[emptyWordIndex].word[emptyLetterIndex - 1] = '';
					setWordArray(updatedWordArray);
				} else {
					updatedWordArray.ATTEMPTS[emptyWordIndex].word[constants.LETTERS - 1] = '';
				}
				setWordArray(updatedWordArray);
			}

		} else if (action === 'submit') {

			console.log("***submit")
			const updatedWordArray = { ...wordArray };
			const emptyWordIndex = updatedWordArray.ATTEMPTS.findIndex(
				(word) => word.status === 'current'
			);

			if ( updatedWordArray.ATTEMPTS[emptyWordIndex].word.includes('') ) {
				console.log ("Empty letters")
				return
			}
 			let check = updatedWordArray.ATTEMPTS[emptyWordIndex].word.join('').toLowerCase()
			//const url = `${constants.URL}/check_word/${check}`;
			//console.log (url)
			/*axios
			.get(url)
			.then((response) => {*/
 				if ( constants.WORDS.indexOf(check) !== -1) {
					let bulls=''
					if (emptyWordIndex !== -1 && updatedWordArray.GAME === "ON") {
						bulls = getBulls(updatedWordArray.ATTEMPTS[emptyWordIndex].word) 
						updatedWordArray.ATTEMPTS[emptyWordIndex] = {
							word: updatedWordArray.ATTEMPTS[emptyWordIndex].word,
							cows: getCows(updatedWordArray.ATTEMPTS[emptyWordIndex].word),
							bulls: bulls,
							status: 'used'
						};
		
						if (emptyWordIndex < constants.ATTEMPTS - 1 && updatedWordArray.GAME === "ON") {
							updatedWordArray.ATTEMPTS[emptyWordIndex + 1] = {
								word: Array.from({ length: constants.LETTERS }, () => ''),
								cows: [],
								bulls: [],
								status: 'current'
							};
						}
						if (bulls.length  ===  5 ) {

							let updAttempts = gameData.attempts
							updAttempts[Number(emptyWordIndex)]+=1

							 setGameData({
								games: gameData.games+1,
								wins: gameData.wins+1,
								winChain: gameData.winChain+1,
								attempts: updAttempts
							  });
							  updatedWordArray.GAME = 'WIN'

						 } else if ( updatedWordArray.ATTEMPTS[constants.ATTEMPTS-1].status === 'used' ) {
							setGameData({
								games: gameData.games+1,
								wins: gameData.wins,
								winChain: 0,
								attempts: gameData.attempts
							  });
							updatedWordArray.GAME = 'LOOSE'
						}
					}	
					setWordArray(updatedWordArray);			
				} else {
					updatedWordArray.ATTEMPTS[emptyWordIndex].word=Array.from({ length: constants.LETTERS }, () => '')
					updatedWordArray.MISTAKE=true
				}
				console.log (updatedWordArray);
				setWordArray(updatedWordArray);			
				
			/*})
			.catch((error) => {
				console.log (error)			
			});*/
		} else if (action === 'noMistake') {
			const updatedWordArray = { ...wordArray };
			updatedWordArray.MISTAKE=false
			setWordArray(updatedWordArray);			

		}  else if (action === 'clue') {
			const updatedWordArray = { ...wordArray };
			updatedWordArray.MISTAKE=false
			setWordArray(updatedWordArray);			
		}
	};

	const getCows = (word) => {
		let res = []
 		word.map((letter, ind) => {
			if (wordArray.KEYWORD.includes(letter.toUpperCase())) {
				res.push(ind)
			}
		})
		return res;
	};

	const getBulls = (word) => {
		let res = []
		word.map((letter, ind) => {
			if (wordArray.KEYWORD[ind] === letter.toUpperCase()) {
				res.push(ind)
			}
		})
		return res;
	};

    const handleKeyPress = useCallback(
		(event) => {
		  const keyPressed = event.key.toLowerCase();
		  console.log (keyPressed)
		  if (/^[а-яё]$/.test(keyPressed) && wordArray.GAME !== 'WIN') {
 			handleWordArrayClick('addLetter', keyPressed.toUpperCase())

		  } else if (keyPressed === "delete" || keyPressed === "backspace") {
 			handleWordArrayClick('deleteLetter', keyPressed)

		  } else if (keyPressed === "enter") {
 			handleWordArrayClick('submit')
		  } else if ( (/^[a-z\.,\[\]\';]$/.test(keyPressed) && wordArray.GAME !== 'WIN')) {
			let rusPressed =constants.qwertyMap[keyPressed.toLowerCase()] 
			handleWordArrayClick('addLetter', rusPressed.toUpperCase())
		  } 
		},[wordArray]
	  );
	  
	useEffect(() => {
	window.addEventListener('keydown', handleKeyPress);
	return () => {
		window.removeEventListener('keydown', handleKeyPress);
	};
	}); 

	const { gameData, setGameData } = useGameContext(); 

	  

	return (
		<div id="field">
			<UpperNav handleWordArrayClick={handleWordArrayClick}/>
			{wordArray.ATTEMPTS.map((word, index) => (
				<Row key={index} word={word} />
			))}
			<div className='mt-2'>
			<RussianKeyboard wordArray={wordArray}  handleWordArrayClick={handleWordArrayClick} />
			<Win wordArray={wordArray} handleWordArrayClick={handleWordArrayClick}/>
			<Loose wordArray={wordArray} handleWordArrayClick={handleWordArrayClick}/>
			<Noword wordArray={wordArray} handleWordArrayClick={handleWordArrayClick}/>


			</div>			
		</div>
	);
};

export default Field;
