import React, { PureComponent } from 'react'

import Ball from '../components/Ball'

import styles from './styles/selection.css'

const colors = ['red', 'green', 'blue', 'yellow', 'gold', 'orange', 'black', 'white']

class Selection extends PureComponent {
  render() {
    const { handleClick } = this.props
    return (
      <div className={styles.container}>
        {colors.map((ball, index) => <Ball key={index} color={ball} handleClick={() => handleClick(ball)}/>)}
      </div>
    )
  }
}

Selection.propTypes = {

}

export default Selection