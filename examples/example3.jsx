/**
 * Example with disappearing options
 */

const {h, render, Color, Component} = require('ink');

const QuickSearch = require('import-jsx')('../src/QuickSearch.jsx');


const IndicatorComponent = ({isSelected}) => {
    return <Color hex='#00FF00'>{isSelected ? '>' : ''}</Color>;
};

const ItemComponent = ({isSelected, children}) => (
    <Color hex={isSelected ? '#00FF00' : ''}> {children} </Color>
);

const HighlightComponent = ({children}) => (
    <Color bgHex='#6C71C4'>{children}</Color>
);


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
            indicatorComponent: IndicatorComponent,
            itemComponent: ItemComponent,
            highlightComponent: HighlightComponent,
        };

        return <span>
            <Color red> Example 3 </Color>
            <br/>
            <QuickSearch {...props} />
        </span>;
    }
}

render(<Example3/>);
