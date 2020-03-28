import React, { Component } from 'react'

import axios from 'axios';

import '../css/game.css';

class Game extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      gameStarted: false,
      quizz: [],
      doneBtnTxt: '',
      doneBtnClass: 'doneBtn-notActive'
    }
  }

  // componentDidMount() {
  //   axios('https://opentdb.com/api.php?amount=10&type=multiple')
  //   .then(x => {
  //     x.data.results.map(q => {
  //       // console.log(q);

  //       const newQuestion = {
  //         question: q.question
  //       };

  //       const answerChoises = [ ...q.incorrect_answers ];
  //       // console.log(answerChoises);

  //       // newQuestion.answer = Math.floor(Math.random() * 3) + 1;
  //       newQuestion.answer = q.correct_answer;
  //       // console.log(newQuestion);

  //       answerChoises.splice(
  //         newQuestion.answer -1,
  //         0,
  //         q.correct_answer
  //       );
  //       // console.log(answerChoises);

  //       answerChoises.forEach((choice, index) => {
  //         newQuestion['choice' + (index + 1)] = choice;
  //       });

  //       // console.log(answerChoises);
  //       // console.log(newQuestion);

  //       let myQuizzArr = this.state.quizz;
  //       myQuizzArr.push(newQuestion);

  //       this.setState({ quizz: myQuizzArr });
  //     })
  //   })
  // }

  startGame = () => {
    this.setState({ gameStarted: true });

    axios('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(x => {
      x.data.results.map(q => {
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

  doneBtn = (e) => {
    // console.log(e.target.value);
  }

  checkAnswers = (obj, myChoice) => {
    console.log(obj);
    let answer

    if (obj.realAnswer === myChoice) {
      console.log('rätt svar');
      answer = myChoice;
    } else {
      console.log('fel svar!');
      answer = null;
    }

    // console.log(answer);
  }

  render() {
    const { gameStarted, quizz, doneBtnTxt, doneBtnClass } = this.state;

    let hideBtn = '';
    if (gameStarted) {
      hideBtn = 'hide-start-btn'
    } else {
      hideBtn = ''
    }

    return (
      <>
      <button className={hideBtn} onClick={this.startGame}>Start Game</button>
        {quizz.map(x => {
          // console.log(x);
          return (
            <>
            {/* <form> */}
            <p className="question">{x.question}</p>
            <ul className="answer-ul">
              <div className="answers-div">
                <input type="radio" id={x.choice1} className="answers" name="question" value={x.choice1} onClick={() => this.checkAnswers(x, x.choice1)} />
                <label htmlFor={x.choice1}>{x.choice1}</label>
              </div>

              <div className="answers-div">
                <input type="radio" id={x.choice2} className="answers" name="question" value={x.choice2} onClick={() => this.checkAnswers(x, x.choice2)} />
                <label htmlFor={x.choice2}>{x.choice2}</label>
              </div>

              <div className="answers-div">
                <input type="radio" id={x.choice3} className="answers" name="question" value={x.choice3} onClick={() => this.checkAnswers(x, x.choice3)} />
                <label htmlFor={x.choice3}>{x.choice3}</label>
              </div>

              <div className="answers-div">
                <input type="radio" id={x.choice4} className="answers" name="question" value={x.choice4} onClick={() => this.checkAnswers(x, x.choice4)} />
                <label htmlFor={x.choice4}>{x.choice4}</label>
              </div>
            </ul>
            {/* </form> */}
            {/* <button className={doneBtnClass} onClick={() => this.doneBtn(x)}>{doneBtnTxt}</button> */}
            </>
          )
        })}
      </>
    )
  }
}

export default Game
