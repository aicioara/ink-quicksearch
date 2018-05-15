const {h, render, Color, Component} = require('ink');

class UI extends Component {
    render() {
        return <span>
            <span>
                <span> Hello World </span>
            </span>
        </span>
    }
}

module.exports = UI;
