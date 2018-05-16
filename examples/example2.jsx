/**
 * This is a example that does not feature a search box and
 * is case sensitive
 */

const {h, render, Color, Component} = require('ink');

const QuickSearch = require('import-jsx')('../src/QuickSearch.jsx');


const StatusComponent = () => <span></span>; // No-op


class Example2 extends Component {
    render() {
        const props = {
            items: [
                {label: 'Animal'},
                {label: 'Antilope'},
                {label: 'Animation'},
                {label: 'Animate'},
                {label: 'Arizona'},
                {label: 'Aria'},
                {label: 'Arid'},
            ],
            onSubmit: d => console.log(d),
            caseSensitive: true,
            statusComponent: StatusComponent,
        };

        return <span>
            <Color red> Example 2 </Color>
            <br/>
            <QuickSearch {...props}></QuickSearch>
        </span>;
    }
}

render(<Example2/>);
