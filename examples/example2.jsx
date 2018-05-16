const {h, render, Color, Component} = require('ink');

const QuickSearch = require('import-jsx')('../src/QuickSearch.jsx');

class Example2 extends Component {
    render() {
        const props = {
            items: [],
            onSubmit: d => console.log(d),
        };

        return <span>
            <Color red> Example 2 </Color>
            <br/>
            <QuickSearch {...props}></QuickSearch>
        </span>;
    }
}

render(<Example2/>);
