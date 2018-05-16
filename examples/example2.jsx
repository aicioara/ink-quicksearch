/**
 * This is a styled example that does not feature a search box
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
            indicatorComponent: IndicatorComponent,
            itemComponent: ItemComponent,
            highlightComponent: HighlightComponent,
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
