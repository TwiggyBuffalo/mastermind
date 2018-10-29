import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import toast from 'just-toasty'


import styles from './styles/home'

import Selection from './Selection'
import Row from './Row'
import Ball from './Ball'

const colors = ['red', 'green', 'blue', 'yellow', 'gold', 'orange', 'black', 'white']

Array.prototype.remove = function () {
  var what, a = arguments, L = a.length, ax
  while (L && this.length) {
    what = a[--L]
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1)
    }
  }
  return this
}

class Mastermind extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selection: 'red',
      rowCount: 10,
      activeRow: 1,
      currentRow: 0,
      answer: [],
      results: [],
      completed: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleRowSubmission = this.handleRowSubmission.bind(this)
  }

  componentDidMount() {
    this.generateAnswer(4)
  }

  generateAnswer = (l, duplicates = false) => {
    const { answer } = this.state
    const answerArr = []
    for (let i = 0; i < l; i++) {
      const random = Math.floor(Math.random() * 7)
      const randomColor = colors[random]
      if (duplicates ? (answer.indexOf(randomColor) < 0) : (answerArr.indexOf(randomColor) < 0)) {
        answerArr.push(randomColor)
      } else {
        i--
      }
    }
    this.setState({ answer: answerArr })
  }

  handleClick(selection) {
    this.setState({
      selection,
    })
  }

  handleRowSubmission(row, i) {
    const { answer, activeRow } = this.state
    if (!row.includes(null)) {
      this.checkResult(row, i)
    } else {
      toast("Row incomplete.")
    }
  }

  checkResult(row, i) {
    const { answer, results, activeRow } = this.state
    const tempAnswer = answer
    let response = []
    console.log(row, answer)
    if (row.toString() === answer.toString()) {
      toast("Congrats your won the game!")
      this.setState({
        completed: true,
        results: [...results, [true, true, true, true]]
      })
    }
    else {
      answer.map((answerBall, index) => {
        console.log(answerBall)
        //Above if statement will need to be adjusted for duplicates
        if (row.includes(answerBall) && answerBall === row[index]) {
          response.push(true)
        } else if (row.includes(answerBall) && answerBall !== row[index] && row.lastIndexOf(answerBall) !== -1) {
          response.push(false)
        }
      })
    }
    this.setState({ results: [...results, response.sort().reverse()], activeRow: activeRow + 1 }, () => this.forceUpdate())
  }

  render() {
    const { selection, answer, rowCount, activeRow, results } = this.state
    const codeUI = (
      <div className={styles.answerContainer}>
        {answer.map((ball, index) => <Ball key={index} color={ball} hide={!this.state.completed} />)}
      </div>
    )

    let rowsUI = []
    for (let i = 1; i < rowCount; i++) {
      rowsUI.push(<Row selection={selection} handleSubmission={this.handleRowSubmission} active={i === activeRow} key={i} rowIndex={i} results={results && results.length >= i && results[i - 1]} />)
    }
    const selectionUI = (<Selection handleClick={this.handleClick} />)
    return (
      <div className={styles.container}>
        <img className={styles.githubImg} src={'images/mastermind/github-corner-right.svg'} alt={"Fork me on GitHub"} />
        <div className={styles.board}>
          {codeUI}
          {rowsUI.reverse()}
          {selectionUI}
        </div>
      </div>
    )
  }
}

export default Mastermind