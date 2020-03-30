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

  doneBtn = (e) => {
    // console.log(e.target.value);
  }

  checkAnswers = (svar, myChoice) => {
    console.log(svar);
    console.log(myChoice);

    let rightAnswer = 0;

    let answer

    if (svar === myChoice) {
      console.log('rätt svar');
      rightAnswer++;
      answer = myChoice;
    } else {
      console.log('fel svar!');
      answer = null;
    }

    console.log(rightAnswer);
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
            {/* <form> */}
            <p className="question">{questions}</p>
            <ul className="answer-ul">
              <div className="answers-div">
                <input type="radio" id={choice1} className="answers" name="question" value={choice1} onClick={() => this.checkAnswers(svar, x.choice1)} />
                <label htmlFor={choice1}>{choice1}</label>
              </div>

              <div className="answers-div">
                <input type="radio" id={choice2} className="answers" name="question" value={choice2} onClick={() => this.checkAnswers(svar, choice2)} />
                <label htmlFor={choice2}>{choice2}</label>
              </div>

              <div className="answers-div">
                <input type="radio" id={choice3} className="answers" name="question" value={choice3} onClick={() => this.checkAnswers(svar, choice3)} />
                <label htmlFor={choice3}>{choice3}</label>
              </div>

              <div className="answers-div">
                <input type="radio" id={choice4} className="answers" name="question" value={choice4} onClick={() => this.checkAnswers(svar, choice4)} />
                <label htmlFor={choice4}>{choice4}</label>
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
