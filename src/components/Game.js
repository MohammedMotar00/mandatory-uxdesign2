import React, { Component } from 'react'

import axios from 'axios';

import '../css/game.css';

class Game extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      gameStarted: false,
      quizz: []
    }
  }

  componentDidMount() {
    axios('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(x => {
      x.data.results.map(q => {
        console.log(q);

        const newQuestion = {
          question: q.question
        };

        const answerChoises = [ ...q.incorrect_answers ];

        newQuestion.answer = Math.floor(Math.random() * 3) + 1;

        answerChoises.splice(
          newQuestion.answer -1,
          0,
          q.correct_answer
        );

        answerChoises.forEach((choice, index) => {
          newQuestion['choice' + (index + 1)] = choice;
        });

        let myQuizzArr = this.state.quizz;
        myQuizzArr.push(newQuestion);

        this.setState({ quizz: myQuizzArr });
      })
    })
  }

  startGame = () => {
    // console.log('start');
    this.setState({ gameStarted: true });
  }

  render() {
    const { gameStarted, quizz } = this.state;

    let hideBtn = '';
    if (gameStarted) {
      hideBtn = 'hide-start-btn'
    } else {
      hideBtn = ''
    }

    return (
      <>
        {quizz.map(x => {
          console.log(x);
          return (
            <form>
            <p className="question">{x.question}</p>
            <ul className="answer-ul">
              <div className="answers-div">
                <input type="radio" className="answers" name="question" value={x.choice1} />
                <label htmlFor={x.choice1}>{x.choice1}</label>
              </div>

              <div className="answers-div">
                <input type="radio" className="answers" name="question" value={x.choice2} />
                <label htmlFor={x.choice2}>{x.choice2}</label>
              </div>

              <div className="answers-div">
                <input type="radio" className="answers" name="question" value={x.choice3} />
                <label htmlFor={x.choice3}>{x.choice3}</label>
              </div>

              <div className="answers-div">
                <input type="radio" className="answers" name="question" value={x.choice4} />
                <label htmlFor={x.choice4}>{x.choice4}</label>
              </div>
            </ul>
            </form>
          )
        })}
      </>
    )
  }
}

export default Game
