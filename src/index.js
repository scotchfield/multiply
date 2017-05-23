import { h, render, Component } from 'preact';
import { StyleSheet, css } from 'aphrodite';

import SelectorBar from './components/SelectorBar';


const styles = StyleSheet.create({
  button: {
    background: '#3498db',
    borderRadius: '28px',
    color: '#ffffff',
    cursor: 'pointer',
    marginTop: '16px',
    padding: '10px 20px 10px 20px',
    textDecoration: 'none',
  },
  container: {
    paddingBottom: '16px',
    textAlign: 'center',
  },
  question: {
    fontSize: '48pt',
    fontWeight: 'bold',
    marginTop: '32px',
  },
});



class App extends Component {
  constructor() {
    super();

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let selectors = {};
    let question = [];

    numbers.forEach(x => selectors[x] = true);

    this.setState({
      numbers,
      selectors,
      question,
    });
  }
  toggleSelector(number) {
    let selectors = this.state.selectors;
    selectors[number] = ! selectors[number];
    this.setState({ selectors })
  }
  generateQuestion() {
    let values = [];

    this.state.numbers.forEach(x => {
      if (this.state.selectors[x]) {
        values.push(x);
      }
    });

    if (values.length > 0) {
      this.setState({ question: [
        values[Math.floor(Math.random() * values.length)],
        values[Math.floor(Math.random() * values.length)]
      ] });
    }
  }
  render() {
    let question = this.state.question.length === 2 ?
      `${this.state.question[0]} × ${this.state.question[1]}` : '';

    return (
      <div>
        <SelectorBar
          numbers={this.state.numbers}
          selectors={this.state.selectors}
          toggleSelector={this.toggleSelector.bind(this)}
        />
        <div className={css(styles.container)}>
          <a className={css(styles.button)} onClick={this.generateQuestion.bind(this)}>
            Question
          </a>
        </div>
        <div className={css(styles.container)}>
          <span className={css(styles.question)}>
            { question }
          </span>
        </div>
      </div>
    );
  }
}

render((
  <div id="app">
    <App />
  </div>
), document.getElementById('app'));
