import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import toast from 'just-toasty'

import styles from './styles/row'

import Ball from './Ball'

class Row extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      row: [null, null, null, null],
    }
  }

  componentDidMount() {
    const { row } = this.props
    if (row) {
      this.setState({ row })
    }
  }

  handleClick(index, selection) {
    const { row } = this.state
    const { active } = this.props
    if (active) {
      let newRow = row
      newRow[index] = selection
      this.setState({
        row: newRow,
      }, () => {
        this.forceUpdate()
      })
    } else {
      toast("Row incomplete.")
    }
  }

  render() {
    const { active, results, selection, handleSubmission, rowIndex } = this.props
    const { row } = this.state
    const validResults = results ? results : []
    let incorrect = []
    for (let i = 0; i < 4 - validResults.length; i++) {
      incorrect.push(<div key={i} className={styles.holeResponse}></div>)
    }
    return (
      <div className={styles.row}>
        <div className={styles.holeContainer}>
          <div className={styles.hole} onClick={() => this.handleClick(0, selection)}>
            {row && row.length > 0 && row[0] && <Ball color={row[0]} />}
          </div>
          <div className={styles.hole} onClick={() => this.handleClick(1, selection)}>
            {row && row.length > 1 && row[1] && <Ball color={row[1]} />}
          </div>
          <div className={styles.hole} onClick={() => this.handleClick(2, selection)}>
            {row && row.length > 2 && row[2] && <Ball color={row[2]} />}
          </div>
          <div className={styles.hole} onClick={() => this.handleClick(3, selection)}>
            {row && row.length > 3 && row[3] && <Ball color={row[3]} />}
          </div>
        </div>
        <div className={styles.holeResponseContainer}>
          {validResults.map((result, index) => {
            return <div key={index} className={result ? styles.correct : styles.incorrect}></div>
          })}
          {incorrect}
        </div>
        {active && (
          <div className={styles.btnSubmit} onClick={() => handleSubmission(row, rowIndex)}>Check</div>
        )}
      </div>
    )
  }
}

export default Row