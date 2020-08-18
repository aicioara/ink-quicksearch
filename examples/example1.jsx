/**
 * This is the basic usage example, including all defaults
 */

const React = require('react');
const { render, Text, Newline } = require('ink');

const QuickSearch = require('import-jsx')('../src/QuickSearch.jsx');

class Example1 extends React.Component {
    render() {
        const props = {
            items: [
                { value: 1, label: 'Animal' },
                { value: 3, label: 'Antilope' },
                { value: 2, label: 'Animation' },
                { value: 0, label: 'Animate' },
                { value: 4, label: 'Arizona' },
                { value: 5, label: 'Aria' },
                { value: 6, label: 'Arid' }
            ],
            onSelect: (d) => console.log('You selected', d)
        };

        return (
            <React.Fragment>
                <Text color="red"> Example 1 </Text>
                <Newline />
                <QuickSearch {...props} />
            </React.Fragment>
        );
    }
}

render(<Example1 />);
