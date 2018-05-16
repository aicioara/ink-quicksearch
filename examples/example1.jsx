/**
 * This is the basic usage example, including all defaults
 */

const {h, render, Color, Component} = require('ink');

const QuickSearch = require('import-jsx')('../src/QuickSearch.jsx');

class Example1 extends Component {
    render() {
        const props = {
            items: [
                {value: 1, label: 'Animal'},
                {value: 3, label: 'Antilope'},
                {value: 2, label: 'Animation'},
                {value: 0, label: 'Animate'},
                {value: 4, label: 'Arizona'},
                {value: 5, label: 'Aria'},
                {value: 6, label: 'Arid'},
            ],
            onSelect: d => console.log('You selected', d),
        };

        return <span>
            <Color red> Example 1 </Color>
            <br/>
            <QuickSearch {...props} />
        </span>;
    }
}

render(<Example1/>);
