/**
 * Using initialSelectionIndex. Press Enter to cycle between states
 */

const {h, render, Color, Component} = require('ink');

const QuickSearch = require('import-jsx')('../src/QuickSearch.jsx');

class Example1 extends Component {
    constructor(props) {
        super(props);
        this.state = {setIndex: 0};
    }

    render() {
        const sets = [
            [
                {label: 'Aardvark'},
                {label: 'Abyssinian'},
                {label: 'Adelie Penguin'},
                {label: 'Affenpinscher'}, // Selected
                {label: 'Afghan Hound'},
            ],
            [
                {label: 'Baboon'},
                {label: 'Bactrian Camel'}, // Selected
                {label: 'Badger'},
                {label: 'Balinese'},
                {label: 'Banded Palm Civet'},
            ]
        ];
        const selection = [3, 1];

        const props = {
            items: sets[this.state.setIndex],
            onSelect: () => this.setState({setIndex: this.state.setIndex ^ 1}),
            initialSelectionIndex: selection[this.state.setIndex],
        };

        return <span>
            <Color red> Example 5 </Color>
            <br/>
            <QuickSearch {...props} />
        </span>;
    }
}

render(<Example1/>);
