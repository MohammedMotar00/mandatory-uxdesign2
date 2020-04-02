import React, { Component } from 'react'

import axios from 'axios';

import '../css/game.css';

import { Button, Modal } from 'react-bootstrap';

class Game extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      gameStarted: false,
      quizz: [],

      answered: [],
      rightAnswers: [],
      correctAnswers: '',
      updatedCorrectAnswers: '',

      show: false,
      playedGames: 0,

      checked: false
    }
  }

  // Funkationen som sätter igång mitt spel :)
  startGame = () => {
    this.setState({ gameStarted: true });
    this.setState({ show: false });

    this.setState({ quizz: [] });
    this.setState({ answered: [] });
    this.setState({ rightAnswers: [] });

    let gamesPlayed = JSON.parse(localStorage.getItem("gamesPlayed"));

    if (gamesPlayed !== null) {
      if (gamesPlayed === 0) {
        localStorage.setItem("gamesPlayed", JSON.stringify(1));
      }
      else if (gamesPlayed >= 1) {
        let playedTimes = JSON.parse(localStorage.getItem("gamesPlayed"));
        let updatePlayedTimes = playedTimes += 1;
        localStorage.setItem("gamesPlayed", JSON.stringify(updatePlayedTimes));
      }
    }
    else {
      localStorage.setItem("gamesPlayed", JSON.stringify(1));
    }

    axios('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(res => {
      res.data.results.map(q => {
        // Här skapar jag en variable som kommer innehålla frågor och alla svar och rätt svar
        const newQuestion = {
          question: q.question
        };

        // i denna variabeln så kopierar jag o sparar alla fel svar
        const answerChoises = [ ...q.incorrect_answers ];

        // här i Math.floor(Math.random() * 3) + 1; så gör jag så att riktiga svaret kommer blandas med mina svar, så inte riktiga svaret hanmar alltid först eller hanmar alltid sist!
        newQuestion.answer = Math.floor(Math.random() * 3) + 1;
        // här sparar jag riktiga svaret men kommer inte renderas ut, utan används senare för att kunna checka ifall den radio button jag har checkat in stämmer med riktiga svaret eller inte
        newQuestion.realAnswer = q.correct_answer;

        answerChoises.splice(
          newQuestion.answer -1,
          0,
          q.correct_answer
        );

        // i denna forEach() så skapar jag en choice metod beroende på hur många svar jag har, och här är de alla mina svar, både rätt o fel, och kallar de för choice
        answerChoises.forEach((choice, index) => {
          newQuestion['choice' + (index + 1)] = choice;
        });

        let myQuizzArr = this.state.quizz;
        myQuizzArr.push(newQuestion);

        this.setState({ quizz: myQuizzArr });
      })
    })
  }

  // Denna funktionen används i modal, och den funkar när jag ska klicka på Return to main!
  closeGame = () => {
    this.setState({ gameStarted: false });
    this.setState({ show: false });
    this.setState({ quizz: [] });
    this.setState({ answered: [] });
    this.setState({ rightAnswers: [] });
  }

  handleModal = () => {
    this.setState({ show: !this.state.show });

    this.setState({ openDialog: true });

    let allAnswers = this.state.answered;
    let allrightAnswers = this.state.rightAnswers;

    let answers = 0;

    for (let i = 0; i < allAnswers.length; i++) {
      if (allrightAnswers[i] === allAnswers[i]) {
        console.log('right answer');
        answers++
      } else {
        console.log('false answer');
      }
    }

    let highScore = JSON.parse(localStorage.getItem("highscore"));

    if (highScore !== null) {
      if (highScore === 0) {
        localStorage.setItem("highscore", JSON.stringify(answers));
      } else if (highScore >= 1) {
        let updateScore = JSON.parse(localStorage.getItem("highscore"));
        let updated = updateScore + answers;
        localStorage.setItem("highscore", JSON.stringify(updated));
      }
    }
    else {
      localStorage.setItem("highscore", JSON.stringify(answers));
    }

    this.setState({ correctAnswers: answers });
  }

  onChange = (svar, myChoice, e) => {
    let myAnswers = this.state.answered;
    myAnswers.push(myChoice);
    this.setState({ answered: myAnswers });

    let myRightAnswers = this.state.rightAnswers;
    myRightAnswers.push(svar);
    this.setState({ rightAnswers: myRightAnswers });
  }

  render() {
    const { gameStarted, quizz, correctAnswers, show } = this.state;

    let hideBtn = 'show-start-btn';
    let showModalBox = '';

    if (gameStarted) {
      hideBtn = 'hide-start-btn';
      showModalBox = '';
    } else {
      hideBtn = 'show-start-btn';
      showModalBox = 'modalBtn';
    }

    return (
      <>
      <button className={hideBtn} onClick={this.startGame}>Start Game</button>
        {quizz.map(x => {
          const entities = {
            '&#039;': "'",
            '&quot;': '"',
            '&ldquo;': '“',
            '&rdquo;': '”',
            "&ntilde;": "ñ",
            "&eacute;": "é",
            "&amp;": "&" ,
            "&uuml;": "ü"
          }

          let svar = x.realAnswer.replace(/&#?\w+;/g, match => entities[match]);
          let questions = x.question.replace(/&#?\w+;/g, match => entities[match]);
          let choice1 = x.choice1.replace(/&#?\w+;/g, match => entities[match]);
          let choice2 = x.choice2.replace(/&#?\w+;/g, match => entities[match]);
          let choice3 = x.choice3.replace(/&#?\w+;/g, match => entities[match]);
          let choice4 = x.choice4.replace(/&#?\w+;/g, match => entities[match]);

          return (
            <>
            <form>
            <p aria-label={`The question is ${questions}`} className="question">{questions}</p>
            <ul aria-label={'list of answers'} className="answer-ul">
              <div aria-label="" className="answers-div">
                <input aria-label={`radio button ${choice1}`} type="radio" id={choice1} className="answers" name="question" value={choice1} onChange={() => this.onChange(svar, choice1)} />
                <label htmlFor={choice1}>{choice1}</label>
              </div>

              <div className="answers-div">
                <input aria-label={`radio button ${choice2}`} type="radio" id={choice2} className="answers" name="question" value={choice2} onChange={() => this.onChange(svar, choice2)} />
                <label htmlFor={choice2}>{choice2}</label>
              </div>

              <div className="answers-div">
                <input aria-label={`radio button ${choice3}`} type="radio" id={choice3} className="answers" name="question" value={choice3} onChange={() => this.onChange(svar, choice3)} />
                <label htmlFor={choice3}>{choice3}</label>
              </div>

              <div className="answers-div">
                <input aria-label={`radio button ${choice4}`} type="radio" id={choice4} className="answers" name="question" value={choice4} onChange={() => this.onChange(svar, choice4)} />
                <label htmlFor={choice4}>{choice4}</label>
              </div>
            </ul>
            </form>
            <hr/>
            </>
          )
        })}
        <div className={showModalBox}>
          <Button aria-label="finish game button" onClick={this.handleModal}>Finish game</Button>
          <Modal show={show} onHide={this.handleModal} backdrop="static">
            <Modal.Header closeButton><h3 tabIndex="0">The game is over</h3></Modal.Header>
            <Modal.Body>
              <h1 tabIndex="0">Your score is:<h3>{correctAnswers} / 10</h3></h1>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.startGame}>Restart Game</Button>
              <Button onClick={this.closeGame}>Return to Main</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    )
  }
}

export default Game
