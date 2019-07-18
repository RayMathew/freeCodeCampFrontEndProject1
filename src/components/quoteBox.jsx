import React from 'react';
import Button from './button';
import $ from 'jquery';

class QuoteBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quotesData: null,
            currentQuote: null,
            currentAuthor: null,
            rendered: false,
            tweetAttributes: null,
            newQuoteAttributes: {
                'id':'new-quote'
            }
        };
    }

    componentDidMount(){
        $.ajax({
            headers: {
                Accept: "application/json"
            },
            url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
            success: (jsonQuotes) => {
                if (typeof jsonQuotes === 'string') {
                    this.setState({
                        quotesData: JSON.parse(jsonQuotes)
                    },() => {
                        this.renderNewQuote();
                    });
                }
            }
        });
    }

    renderNewQuote = () => {
        this.setState({
            renderered: false
        }, () => {
            setTimeout(() => {
                let quotesData = this.state.quotesData;
                let randomQuote = quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
                this.setState({
                    currentQuote: randomQuote.quote,
                    currentAuthor: randomQuote.author,
                    renderered: true,
                    tweetAttributes: {
                        'href': 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + randomQuote.quote + '" ' + randomQuote.author),
                        'target': '_blank',
                        'id':'tweet-quote'
                    }
                });
            },500);
        });

    };

    render () {
        return (
            <div id="quote-wrapper">
                <div id="quote-box">
                    <img height="60" className="quill" src="https://www.pngkey.com/png/full/97-975925_feather-pen-png-black-and-white-transparent-feather.png"/>
                    <div id="text" className={'transition ' + (this.state.renderered? 'fadein': 'fadeout')}>
                        {this.state.currentQuote}
                    </div>
                    <div id="author" className={'transition ' + (this.state.renderered? 'fadein': 'fadeout')}>
                        - {this.state.currentAuthor}
                    </div>
                    <div className="buttons-wrapper">
                        <div>
                            <Button  onClick={this.tweetQuote}
                                        text={<i className="fa fa-twitter"></i>}
                                        attributes={this.state.tweetAttributes}>
                            </Button>
                        </div>
                        <div>
                            <Button onClick={this.renderNewQuote}
                                    text="New quote"
                                    attributes={this.state.newQuoteAttributes}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuoteBox;
