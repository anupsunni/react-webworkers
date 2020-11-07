import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import workerScript from './worker.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            num : '',
            result: '',
            loadingMessage: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.complexAlgo = this.complexAlgo.bind(this);
        this.complexAlgoWorker = this.complexAlgoWorker.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    complexAlgo() {
        const { num } = this.state;
        let result = 0;
        for (let i = 1; i <= num ; i++) {
            this.setState({
                loadingMessage: `loaded ${i}/${num}`
            });
            for (let j = 0; j < i; j++) {
                result++;
            }
        }
        this.setState({
            result
        })
    }

    complexAlgoWorker() {
        const {num} = this.state;
        const data = {};
        this.worker.postMessage(num);
    }

    componentDidMount() {
        this.worker = new Worker(workerScript);
        this.worker.addEventListener('message', e=> {
            const type = e.data.type;
            if (type=='LOADING') {
                const {i, num} = e.data;
                this.setState({
                    loadingMessage: `loaded ${i}/${num}`
                })
            } else {
                const { result } = e.data;
                this.setState({
                    result
                })
            }
        })
    }

    render() {

    return (
        <div className="App">
            <input type={"number"} name="num" value={this.state.num} onChange={this.handleChange} />
            <button onClick={this.complexAlgo}>Calculate</button>
            <button onClick={this.complexAlgoWorker}>Calculate Using Worker</button>
            <button onClick={() => {alert("I am responsive")}}>Test Click Button</button>
            <p>{this.state.loadingMessage}</p>
            <p>{this.state.result}</p>
        </div>
    )
  }
}
export default App;
