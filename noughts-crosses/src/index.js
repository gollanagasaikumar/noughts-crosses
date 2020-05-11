import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import X from "./X.jpg";
import O from "./O.jpg";
import wingif from "./winning.gif";
import tiegif from "./tie.gif"
import background from './background.jpg'
import Welcome from './loading.js'


import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
const NumberContext = React.createContext();


var globalscorelist = {"tiescore":0,"xscore":0,"oscore":0,"xlosts":0,"olosts":0}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	value : " ",
	squares : [" "," "," "," "," "," "," "," "," "],
	winstatus : 0,
	playerturn : 1,
	weights : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	weightscount : [3,7,11,12,13,14,15],
	WinningChance : []
    };
  }
  
  
 calculaterowweights(index,range)
{
const {weights,weightscount} =  this.state
//var r = range - 1;
var i = index+1;
var temp = weightscount[i]
var y = 0;

if(range > 0)
{
var r = range - 1
console.log(temp)	
weights[temp] = weights[temp-1]+weights[temp-2]+weights[temp-3]

var d = temp === 3 ? y = 1 : (temp === 7 ? y = 2 : y = 3)

var x = String(weights[temp])+","+String(Math.abs(weights[temp-3]))+String(temp-(y+2))+","+
		String(Math.abs(weights[temp-2]))+String(temp-(y+1))+","+
		String(Math.abs(weights[temp-1]))+String(temp-y)
		
//var ch = weights[temp] === 2 ?  WinningChance.push(x) : weights[temp] === -2 ?  WinningChance.push(x) : 0

weights[temp] = x;
this.calculaterowweights(i,r)
}

}

 calculatecolumnweights(index,range)
{
const {weights,weightscount} =  this.state
var r = range - 1;
var i = index+1;
var temp = weightscount[i]

if(r > 3)
{
weights[temp] = weights[temp-4]+weights[temp-8]+weights[temp-12]
var x = String(weights[temp])+","+String(Math.abs(weights[temp-4]))+String(temp-6)+","+
		String(Math.abs(weights[temp-8]))+String(temp-9)+","+
		String(Math.abs(weights[temp-12]))+String(temp-12)
		
//var ch = weights[temp] === 2 ?  WinningChance.push(x) : weights[temp] === -2 ?  WinningChance.push(x) : 0

weights[temp] = x;
this.calculatecolumnweights(i,r)
}

}

 calculatediagonalweights()
 {
	const {weights,weightscount} =  this.state 
	weights[15] = String(weights[0]+weights[5]+weights[10])+","+String(Math.abs(weights[0]))+String(0)+","+
					String(Math.abs(weights[5]))+String(4)+","+
					String(Math.abs(weights[10]))+String(8)
	weights[16] = String(weights[2]+weights[5]+weights[8])+","+String(Math.abs(weights[2]))+String(2)+","+
					String(Math.abs(weights[5]))+String(4)+","+
					String(Math.abs(weights[8]))+String(6)
	
 }



 

  setValueforAI()
  {
	const {weights,weightscount,squares,WinningChance} =  this.state

	var countries = [String(weights[3]),String(weights[7]),String(weights[11]),String(weights[12]),String(weights[13]),String(weights[14]),String(weights[15]),String(weights[16])]
	console.log(countries)
	const startsWithN = countries.filter((countries) => (countries.startsWith("-2") || countries.startsWith("2")));
	//WinningChance = startsWithN
	console.log(WinningChance)
	var local = startsWithN.filter(String)
	var OChoice = 0;
	if(local.length > 0)
	{
		//alert(WinningChance)
		 var temp  = startsWithN.sort()[0]
		 
		 OChoice = temp[temp.indexOf(",0")+2]

		 
		 //alert(WinningChance)
	}
	else
	{
		OChoice = squares.indexOf(" ")

		
	}
	return OChoice;
	
  }

   AIChoice()
  {
	  
	  const {squares,weights} = this.state;
	  
	  if( (squares[4] != "O" && squares[4] != "X") )
	  {
		
		squares[4] = "O"
		this.state.value = "O"
		this.setState({squares:squares})
		weights[5] = -1
		this.setState({weights:weights})
		this.calculaterowweights(-1,3)
		this.calculatecolumnweights(2,7)
		this.calculatediagonalweights()
		//this.setValueforAI()
	  }
	  else if(squares[4] === "X" && ((squares[0]  ) != "O" ))
	  {
		 
		squares[0] = "O"
		this.state.value = "O"
		this.setState({squares:squares})
		weights[0] = -1
		this.setState({weights:weights})
		this.calculaterowweights(-1,3)
		this.calculatecolumnweights(2,7)
		this.calculatediagonalweights()
		//this.setValueforAI()
	  }
	  else
	  {
		
		  this.calculaterowweights(-1,3)
		  this.calculatecolumnweights(2,7)
		  this.calculatediagonalweights()
		  //console.log(weights)
		  //console.log(WinningChance)
		  var x = this.setValueforAI()
		  var y = 0
		  var v = x < 3 ? y = Number(x) : (x >=3 && x < 6) ? y = Number(x)+1 : y = Number(x)+2 
		  console.log("checkval"+x)
		  squares[x] = "O"
		  this.state.value = "O"
		  weights[y] = -1
		  this.setState({weights:weights})
		  this.setState({squares:squares})
		  this.calculaterowweights(-1,3)
		  this.calculatecolumnweights(2,7)
		  this.calculatediagonalweights()
		  console.log(weights)
		  
	  }
	  //console.log(weights)
	  //console.log("WC"+WinningChance)
	  
  }
  
  
async  handleClick(i) {
	let promise = new Promise((resolve, reject) => {
	  if(this.state.winstatus === 0)
	  {
	  console.log("val"+this.state.value)
	  //alert(this.state.value)
	  const {squares,weights} = this.state;
	  squares[i] = (squares[i] === "X" || squares[i] === "O") ? squares[i] : this.state.value === "X" ? "O" : "X";
	  
	  let c = i < 3 ? weights[i] = 1 : (i >= 3 && i < 6) ? weights[i+1] = 1 : weights[i+2] = 1
	  
	  this.state.value = squares[i]
	  this.setState({squares:squares})
	  this.setState({weights:weights})
	  console.log(weights)
	  resolve()
	  }
	  else
	  {
		  
	  }
	  });
	  let result = await promise;
	  var gc = winnerCheck(this.state.squares)
	  if(gc != "Game Completed")
	  {
	  this.AIChoice()
	  }
	  
  }
  renderSquare(i) {
	const {squares} = this.state;
    return (
      <Square
        value={squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }
resetstate()
{
	this.state.value = " "
	let squares = [" "," "," "," "," "," "," "," "," "]
	let weights = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	this.state.winstatus = 0
	//WinningChance = []
	this.setState({value:" ",squares:squares,winstatus:0,weights:weights})
	
}
restartgame()
{
	globalscorelist = {"tiescore":0,"xscore":0,"oscore":0,"xlosts":0,"olosts":0}
	this.resetstate()
}
replaygame()
{
	return(<button class="button button1" onClick={()=>this.resetstate()}>Play Again  </button>)
}

check()
{
	
}
 congrats(param)
 {
	 var srcpath;
	 var imgsrc = param === "1" ? srcpath = tiegif: srcpath =  wingif
	 document.getElementById("hoverclass").className = "f1_container"
	 document.getElementById("greetingimage").src = srcpath
	 setTimeout(() => {document.getElementById("hoverclass").className = "f2_container"
	 document.getElementById("hoverclass").style.pointerEvents = 'auto';
	 }, 3000);
 }
  render() {
	  let status = " "
	  let gamestats = winnerCheck(this.state.squares)

	this.state.winstatus =  gamestats === "Game Completed" || gamestats  === "Tie Game" ? 1 : 0
	if(gamestats  === "Tie Game")
	{
	status = "It's a Tie Game"
	this.congrats("1")
	}
	else
	{
		console.log("stats"+this.state.value)
		this.check()
    status = gamestats === "Game Completed" ?  "Player " + this.state.value + " Won Game" : (this.state.value === "X" ? "Next Player : O" : "Next Player : X" )
	var stu = gamestats === "Game Completed" ? this.congrats("0"): 0
	
	
	}
    return (
      <div class="container">
		<Playerone value = {this.state.winstatus} value1 = {status} value2 = {this.state.squares}/>
		
		<div>

		
		<div style={{width:"100%",marginTop:"2%"}}>
		<div className="cancelandplaybuttons" onClick={() => this.restartgame()}><button class="button button3">Quit Game</button></div>
		<div className="gamestatus-bar"><div className="status-bar"><h3> &nbsp; &nbsp; {status} </h3></div></div>
		<div className="cancelandplaybuttons1" >{this.replaygame()}</div>
		</div>
		
		
<div id = "hoverclass" className="f2_container">
<div className="f1_card" >		
		
		<div className="front face">
		
        <div className="rowStyle">
          {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
        </div>
        <div className="rowStyle">
          {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
        </div>
        <div className="rowStyle">
          {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
        </div>
		
		</div>
		
		
		
			<div  className="back face center bg">
<img id="greetingimage" src={wingif} alt="Paris" style={{width:"100%",height:"100%"}}></img>
			</div>
	
		</div>
		
	</div>
		
		
</div>
		
		
		
		
		 <Playertwo value = {this.state.winstatus} value1 = {status} value2 = {this.state.squares}/>
      </div>
    );
  }
}

 function scorecheck(winstatus,gamestatus,squareslist)
{
	var scorelist = {"tiescore":0,"xscore":0,"oscore":0,"xlosts":0,"olosts":0}
	//&& (scorelist["olosts"] = scorelist["olosts"]+1)
	//  && (scorelist["xlosts"] = scorelist["xlosts"]+1)
	var sl = gamestatus === "It's a Tie Game" ? (scorelist["tiescore"] = scorelist["tiescore"]+1) : 
	(gamestatus === "Player X Won Game" ? (scorelist["xscore"] = scorelist["xscore"]+1 && ((scorelist["olosts"] = scorelist["olosts"]+1))): 
	(gamestatus === "Player O Won Game" ) ? (scorelist["oscore"] = scorelist["oscore"]+1 && (scorelist["xlosts"] = scorelist["xlosts"]+1)): 0)
if(winstatus === 1)
{
//scorelist["xscore"] = scorelist["xscore"]+1
//globalscorelist = scorelist
//alert(scorelist["xscore"])
return scorelist
}
else
{
	return "running"
}

}


function Square(props) {
    const {value} = props;
	let icon = value === " " ? value : (value === "X" ? X : O)
    return (
      <button className="leftbox" onClick={props.onClick}>
        {     <img 
      src={icon}
       style={{width:"100%",height:"20vh",outline:"none"}}
      />}
      </button>
    );
}

function statusbar(props)
{
	return(
	<div>
			<div className="cancelandplaybuttons"><button class="button button3">Quit Game</button></div>
		<div className="gamestatus-bar"><div className="status-bar"><h3> &nbsp; &nbsp; {} </h3></div></div>
		<div className="cancelandplaybuttons1" onclick={this.replaygame("1")}><button class="button button1">Play Again  </button></div>
	</div>
	)
}

function winnerCheck(x)
{
	const found = x.indexOf(" ")
	
	if((x[0]+x[1]+x[2] === "XXX" || x[0]+x[1]+x[2] === "OOO") || (x[3]+x[4]+x[5] === "XXX" || x[3]+x[4]+x[5] === "OOO") ||
	  (x[6]+x[7]+x[8] === "XXX" || x[6]+x[7]+x[8] === "OOO") || (x[0]+x[3]+x[6] === "XXX" || x[0]+x[3]+x[6] === "OOO") ||
	  (x[1]+x[4]+x[7] === "XXX" || x[1]+x[4]+x[7] === "OOO") || (x[2]+x[5]+x[8] === "XXX" || x[2]+x[5]+x[8] === "OOO") ||
	  (x[0]+x[4]+x[8] === "XXX" || x[0]+x[4]+x[8] === "OOO") || (x[2]+x[4]+x[6] === "XXX" || x[2]+x[4]+x[6] === "OOO") )
	  {
		  return "Game Completed"
	  }
	  else
	  {
		  if(found === -1)
		  {
		   return "Tie Game"
		   
		  }
		  else
		  {
		  return x[found-1]
		  
		  }
	  }
}




export class Playerone extends React.Component {
  constructor(props) {
    super(props)

  }
  
	 render(){
		var res = scorecheck(this.props.value,this.props.value1,this.props.value2)
		if(res != "running")
		{
			
			globalscorelist["tiescore"] = res["tiescore"] + globalscorelist["tiescore"]
			globalscorelist["xscore"] = res["xscore"] + globalscorelist["xscore"]
			globalscorelist["oscore"] = res["oscore"] + globalscorelist["oscore"]
			globalscorelist["xlosts"] = res["xlosts"] + globalscorelist["xlosts"]
			globalscorelist["olosts"] = res["olosts"] + globalscorelist["olosts"]
		}
		console.log(globalscorelist)
		console.log(res["oscore"])
		console.log(res["tiescore"])
		
	 return(  

<div class="opponentBox1 shadoweffect">

<h2>Player X</h2>
<b>****************</b>
<h3>Game Score's</h3>
<b>****************</b>
<h3>Matches Won : {globalscorelist["xscore"]/2} </h3>
<h3>Matches Lost : {globalscorelist["xlosts"]/2} </h3>
<h3>Tie Matches : {globalscorelist["tiescore"]/3}</h3>
</div>

  )
	 }
}


export class Playertwo extends React.Component {
  constructor(props) {
    super(props)

  }
	 render(){
		var res = scorecheck(this.props.value,this.props.value1,this.props.value2)

		console.log(res["xscore"])
		console.log(res["oscore"])
		console.log(res["tiescore"])
		
	 return(  
<div class="opponentBox2 shadoweffect">

<h2>Player O</h2>
<b>****************</b>
<h3>Game Score's</h3>
<b>****************</b>
<h3>Matches Won : {globalscorelist["oscore"]/2}</h3>
<h3>Matches Lost : {globalscorelist["olosts"]/2} </h3>
<h3>Tie Matches : {globalscorelist["tiescore"]/3}</h3>
</div>
  )
	 }
}



class Celebration extends React.Component {


 
  render() {
	  
	  
    return (<b>Naga Sai </b>)
  }
}



class Football extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      x: <Welcome />
    }
  }
	    componentDidMount(){
	setTimeout(() => {this.setState({x:<Board />})}, 3000);
    
  }
 
  render() {
	  

    return (
<div className={"bg"}>  
  <div>{this.state.x}</div>

	

	</div>  
	  
	  
    );
  }
}

ReactDOM.render(<Football />, document.getElementById('root'));



