/**
 * This is a example that does not feature a search box and
 * is case sensitive
 */

const React = require('react');
const { render, Text, Newline } = require('ink');

const QuickSearch = require('import-jsx')('../src/QuickSearch.jsx');

const StatusComponent = () => <span></span>; // No-op

class Example2 extends React.Component {
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
            caseSensitive: true,
            statusComponent: StatusComponent
        };

        return (
            <React.Fragment>
                <Text color="red"> Example 2 </Text>
                <Newline />
                <QuickSearch {...props} />
            </React.Fragment>
        );
    }
}

render(<Example2 />);
