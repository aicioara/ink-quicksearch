const {h, render, Color, Component, Group} = require('ink');

const QuickSearch = require('import-jsx')('../src/index.js')

class UI extends Component {
    render() {
        const props = {
            items: [{
                label: 'a',
                value: 'A',
            }, {
                label: 'b',
                value: 'B',
            }],
            onSubmit: d => console.log(d),
        }

        return <span>
            <Color green> Hello World </Color>
            <QuickSearch {...props}></QuickSearch>
        </span>
    }
}

module.exports = UI;
