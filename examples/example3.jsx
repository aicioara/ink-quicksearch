/**
 * Example with disappearing options
 */

const {h, render, Color, Component} = require('ink');

const QuickSearch = require('import-jsx')('../src/QuickSearch.jsx');


const ItemComponent = ({isHighlighted, isSelected, children}) => {
    if (!isHighlighted) {
        return <span></span>
    }
    return <Color hex={isSelected ? '#00FF00' : ''}> {children} </Color>
}


class Example3 extends Component {
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
            itemComponent: ItemComponent,
        };

        return <span>
            <Color red> Example 3 </Color>
            <br/>
            <QuickSearch {...props} />
        </span>;
    }
}

render(<Example3/>);
