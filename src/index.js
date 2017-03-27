import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { createStore } from 'redux'
import reducers from './reducers'

const store = createStore(reducers)

const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <App store={store}/>,
  rootEl
)

render()
store.subscribe(render)
