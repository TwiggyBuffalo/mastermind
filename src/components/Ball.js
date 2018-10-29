import React from 'react'
import styles from './styles/ball.css'

const ball = (props) => {
  if(props.hide){
    return (<div className={styles.mysteryBall}>?</div>)
  }
  return {
    red: (<img className={styles.ball} src={'images/ball_red.svg'} onClick={props.handleClick}/>),
    orange: (<img className={styles.ball} src={'images/ball_orange.svg'} onClick={props.handleClick}/>),
    green: (<img className={styles.ball} src={'images/ball_green.svg'} onClick={props.handleClick}/>),
    blue: (<img className={styles.ball} src={'images/ball_blue.svg'} onClick={props.handleClick}/>),
    yellow: (<img className={styles.ball} src={'images/ball_yellow.svg'} onClick={props.handleClick}/>),
    black: (<img className={styles.ball} src={'images/ball_black.svg'} onClick={props.handleClick}/>),
    white: (<img className={styles.ball} src={'images/ball_white.svg'} onClick={props.handleClick}/>),
    gold: (<img className={styles.ball} src={'images/ball_gold.svg'} onClick={props.handleClick}/>),
  }[props.color]
}

export default ball
