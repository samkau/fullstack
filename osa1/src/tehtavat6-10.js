import React from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.obj.kasvataYhdella(props.value)}>
    {props.value}
  </button>
)

const Statistics = (props) => {
  if(props.num[0]===0&&props.num[1]===0&&props.num[2]===0) {
    return (
      <div>
        <h1>statistiikka</h1>
        <h3>ei yhtään palutetta annettu</h3>
      </div>
    )
  } else {
    return( <div>
      <h1>statistiikka</h1>
      <Statistic text={'hyvä'}  num={props.num[0]} />
      <Statistic text={'neutraali'}  num={props.num[1]} />
      <Statistic text={'huono'}  num={props.num[2]} />
      <div>keskiarvo {props.obj.keskiarvo()}</div>
      <div>positiivisia {props.obj.positiivisia()}%</div>
      </div>
    )
  }
}

const Statistic = (props) => (
  <div>
    {props.text} {props.num}
  </div>
)

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
    }
  }

  kasvataYhdella = (key) => () => {this.setState({[key]: this.state[key]+1})}
  keskiarvo = () => {
    return (
      (this.state.hyva-this.state.huono)/(this.state.hyva+this.state.huono+this.state.neutraali)
    ).toFixed(1)
  }
  positiivisia = () => { return (
      (this.state.hyva/(this.state.hyva+this.state.huono+this.state.neutraali))*100
    ).toFixed(1)
  }

  render() {
    return (
      <div>
        <h1>anna palautetta</h1>
        <div>
          <Button value={'hyva'} text={'hyvä'} obj={this}  />
          <Button value={'neutraali'} text={'neutraali'} obj={this} />
          <Button value={'huono'} text={'huono'} obj={this} />
        </div>
        <div>
          <Statistics num={[this.state.hyva, this.state.neutraali,this.state.huono]} obj={this} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
