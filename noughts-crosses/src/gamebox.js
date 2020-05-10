import React from 'react'
import './App.css';
import ReactDOM from 'react-dom';
export function GameBox(props) {
  const { CurrentGameIcon, onClickTurn } = props

  return (
  <div class="container" style={{marginTop:"5vh"}}>
  <div class="opponentBox">
  </div>
  
  <div style={{height:"100%"}}>
  <div class="rowStyle"> 
	<div className="leftbox" onClick={onClickTurn}>{CurrentGameIcon}</div>
	<div className="leftbox" onClick={onClickTurn}>{CurrentGameIcon}</div>
	<div className="leftbox" onClick={onClickTurn}>{CurrentGameIcon}</div>
  </div>
    <div class="rowStyle"> 
	<div className="leftbox" onClick={onClickTurn}>{CurrentGameIcon}</div>
	<div className="leftbox" onClick={onClickTurn}>{CurrentGameIcon}</div>
	<div className="leftbox" onClick={onClickTurn}>{CurrentGameIcon}</div>
  </div>
    <div class="rowStyle"> 
	<div className="leftbox" onClick={onClickTurn}>{CurrentGameIcon}</div>
	<div className="leftbox" onClick={onClickTurn}>{CurrentGameIcon}</div>
	<div className="leftbox" onClick={onClickTurn}>{CurrentGameIcon}</div>
  </div>
  </div>
  
  <div class="opponentBox">
  </div>
  </div>
  )
}