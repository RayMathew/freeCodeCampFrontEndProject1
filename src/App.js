import React, {Component} from 'react';
import './App.css';
import QuoteBox from './components/quoteBox';

class App extends Component {
    render() {
        return (
            <div className="full-screen">
                <QuoteBox/>
            </div>
        );
    }
}

export default App;
