import React, { useState } from 'react';
import { useGameContext } from './gameContext.js';
import constants from '../constants/constants';


const UpperNav = ({ handleWordArrayClick }) => {
    const [showQuestionPanel, setShowQuestionPanel] = useState(false);
    const [showStatisticPanel, setShowStatisticPanel] = useState(false);
    const { gameData, setGameData } = useGameContext(); 

     const clearStatistic = () => {
       setGameData({
        games: 0,
        wins: 0,
        winChain: 0,
        attempts: Array(constants.ATTEMPTS).fill(0)
      });
    };

    const handleIconClick = (value) => {
        if (value === 'question') {
            setShowQuestionPanel(!showQuestionPanel);
            setShowStatisticPanel(false);
        } else if (value === 'statistic') {
            setShowStatisticPanel(!showStatisticPanel);
            setShowQuestionPanel(false);
        }
    };

    return (
        <div id="upperNav" className='mb-2'>
            <div className='d-flex align-items-center justify-content-between w-100'>
                <div className='mx-2' onClick={() => handleIconClick('question')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                    </svg>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className="btn btn-secondary m-4" onClick={() => handleWordArrayClick('new')}>Рестарт</div>
                </div>
                <div className='mx-2' onClick={() => handleIconClick('statistic')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"/>
                    </svg>
                </div>
            </div>

            {showQuestionPanel && (
                <div className={`side-panel-question side-panel ${showQuestionPanel ? 'show' : ''}`}>
                    <div className="side-panel-content">
                        <h2>Как играть ?</h2>
                        <p>У вас шесть попыток чтобы угадать слово</p>
                        <p>Если буква встречается в загаданном слове</p>
                        <p>она будет подсвечена розовым на клавиатуре и на поле</p>
                        <p>Если буква встречается в слове </p>
                        <p>и стоит на том же месте в занаданном слове</p>
                        <p>она будет подсвечена зелёным</p>
                        <button onClick={() => setShowQuestionPanel(false)}>Закрыть</button>
                    </div>
                </div>
            )}

            {showStatisticPanel && (
                <div className={`side-panel-statistic side-panel ${showStatisticPanel ? 'show' : ''}`}>
                    <div className="side-panel-content">
                        <h2>Статистика игр</h2>
                        <p>Сыграно игр:{gameData.games}</p>
                        <p>Количество побед:{gameData.wins}</p>
                        <p>Текущая серия побед:{gameData.winChain}</p>
                        {
                            gameData.attempts.map((element,ind) => (
                                <p key={ind}>Отгадано с {ind+1} попытки:{element}</p>
                            ))
                        }
                        <div className ="d-flex justify-content-between">
                            <button onClick={() => clearStatistic()}>Обнулить</button>
                            <button onClick={() => setShowStatisticPanel(false)}>Закрыть</button>
                        </div>                       
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpperNav;
