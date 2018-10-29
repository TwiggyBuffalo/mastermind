import React from 'react'
import { render } from 'react-dom'

import '@babel/polyfill'

import './index.css'

import Mastermind from './components/Mastermind'

render(<Mastermind />, document.getElementById('root'))
