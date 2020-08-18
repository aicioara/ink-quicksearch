/**
 * Example with disappearing options
 */

const React = require('react');
const { render, Text, Newline } = require('ink');

const QuickSearch = require('import-jsx')('../src/QuickSearch.jsx');

const ItemComponent = ({ isHighlighted, isSelected, children }) => {
    if (!isHighlighted) {
        return <span></span>;
    }
    return <Text color={isSelected ? '#00FF00' : ''}>{children}</Text>;
};

const StatusComponent = () => <span></span>; // No-op

class Example3 extends React.Component {
    render() {
        const props = {
            items: [
                { label: 'Animal' },
                { label: 'Antilope' },
                { label: 'Animation' },
                { label: 'Animate' },
                { label: 'Arizona' },
                { label: 'Aria' },
                { label: 'Arid' }
            ],
            onSelect: (d) => console.log(d),
            itemComponent: ItemComponent,
            statusComponent: StatusComponent
        };

        return (
            <React.Fragment>
                <Text color="red"> Example 3 </Text>
                <Newline />
                <QuickSearch {...props} />
            </React.Fragment>
        );
    }
}

render(<Example3 />);
