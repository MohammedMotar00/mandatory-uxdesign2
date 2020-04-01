import React, { Component } from 'react'

import axios from 'axios';

import '../css/game.css';

import { Button, Modal } from 'react-bootstrap';

let playedGames = 0;

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

      show: false
    }
  }

  startGame = () => {
    this.setState({ gameStarted: true });
    this.setState({ show: false });

    this.setState({ quizz: [] });
    this.setState({ answered: [] });
    this.setState({ rightAnswers: [] });
    // this.setState({ correctAnswers: '' });

    playedGames++;

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

    // localStorage.setItem('gamesPlayed', JSON.stringify(playedGames));

    axios('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(res => {
      res.data.results.map(q => {
        // console.log(q);

        const newQuestion = {
          question: q.question
        };

        const answerChoises = [ ...q.incorrect_answers ];
        // console.log(answerChoises);

        newQuestion.answer = Math.floor(Math.random() * 3) + 1;
        newQuestion.realAnswer = q.correct_answer;
        // console.log(newQuestion);

        answerChoises.splice(
          newQuestion.answer -1,
          0,
          q.correct_answer
        );
        // console.log(answerChoises);

        answerChoises.forEach((choice, index) => {
          newQuestion['choice' + (index + 1)] = choice;
        });

        // console.log(answerChoises);
        // console.log(newQuestion);

        let myQuizzArr = this.state.quizz;
        myQuizzArr.push(newQuestion);

        this.setState({ quizz: myQuizzArr });
      })
    })
  }

  closeGame = () => {
    this.setState({ gameStarted: false });
    this.setState({ show: false });
    this.setState({ quizz: [] });
    this.setState({ answered: [] });
    this.setState({ rightAnswers: [] });
    // this.setState({ correctAnswers: '' });
  }

  handleModal = () => {
    this.setState({ show: !this.state.show });

    this.setState({ openDialog: true });

    let allAnswers = this.state.answered;
    let allrightAnswers = this.state.rightAnswers;

    let answers = 0;

    for (let i = 0; i < allAnswers.length; i++) {
      // console.log(allAnswers[i]);
      // console.log(i);
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

  componentDidUpdate() {
    let x = this.state.correctAnswers;
    let y = this.state.correctAnswers + x;
    console.log(y);
  }

  onChange = (svar, myChoice) => {

    let myAnswers = this.state.answered;
    myAnswers.push(myChoice);
    this.setState({ answered: myAnswers });

    let myRightAnswers = this.state.rightAnswers;
    myRightAnswers.push(svar);
    this.setState({ rightAnswers: myRightAnswers });
  }


  render() {
    const { gameStarted, quizz, correctAnswers } = this.state;

    let hideBtn = '';
    let showModalBox = '';

    if (gameStarted) {
      hideBtn = 'hide-start-btn';
      showModalBox = '';
    } else {
      hideBtn = '';
      showModalBox = 'modalBtn';
    }

    return (
      <>
      <button className={hideBtn} onClick={this.startGame}>Start Game</button>
        {quizz.map(x => {
          // console.log(x);
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
            <p className="question">{questions}</p>
            <ul className="answer-ul">
              <div className="answers-div">
                <input type="radio" id={choice1} className="answers" name="question" value={choice1} onChange={() => this.onChange(svar, choice1)} />
                <label htmlFor={choice1}>{choice1}</label>
              </div>

              <div className="answers-div">
                <input type="radio" id={choice2} className="answers" name="question" value={choice2} onChange={() => this.onChange(svar, choice2)} />
                <label htmlFor={choice2}>{choice2}</label>
              </div>

              <div className="answers-div">
                <input type="radio" id={choice3} className="answers" name="question" value={choice3} onChange={() => this.onChange(svar, choice3)} />
                <label htmlFor={choice3}>{choice3}</label>
              </div>

              <div className="answers-div">
                <input type="radio" id={choice4} className="answers" name="question" value={choice4} onChange={() => this.onChange(svar, choice4)} />
                <label htmlFor={choice4}>{choice4}</label>
              </div>
            </ul>
            </form>
            </>
          )
        })}
        {/* <button onClick={this.clickMe}>klick</button> */}
        <div className={showModalBox}>
          <Button onClick={this.handleModal}>Open Modal</Button>
          <Modal show={this.state.show} onHide={this.handleModal} backdrop="static">
            <Modal.Header closeButton>Modal Head</Modal.Header>
            <Modal.Body>
              <h1>Your score is:</h1>
              <h3>{correctAnswers} / 10</h3>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.startGame}>
                Restart Game
              </Button>
              <Button onClick={this.closeGame}>
                Return to Main
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    )
  }
}

export default Game
