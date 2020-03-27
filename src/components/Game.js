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
        })

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
            <>
            <p>{x.question}</p>
            <ul>
              <li>{x.choice1}</li>
              <li>{x.choice2}</li>
              <li>{x.choice3}</li>
              <li>{x.choice4}</li>
            </ul>
            </>
          )
        })}
      </>
    )
  }
}

export default Game
