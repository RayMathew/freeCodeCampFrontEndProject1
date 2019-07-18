import React from 'react';

class Button extends React.Component {

    render () {
        const {...attrs} = this.props.attributes ? this.props.attributes : {};
        return (
            <a
            {...attrs}
            onClick={this.props.onClick} className="button">
                {this.props.text}
            </a>
        );
    }
}

export default Button;
