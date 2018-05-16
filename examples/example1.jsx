const {h, render, Color, Component, Group} = require('ink');

const QuickSearch = require('import-jsx')('../src/QuickSearch.jsx')

class UI extends Component {
    render() {
        const props = {
            items: [{
                label: 'Item 1',
                value: 'item_1',
            }, {
                label: 'Item 2',
                value: 'item_2',
            }, {
                label: 'Foo 3',
                value: 'item_3',
            }, {
                label: 'Foo 4',
                value: 'item_4',
            }, {
                label: 'Fos 4',
                value: 'item_4',
            }, {
                label: 'Fos 4',
                value: 'item_4',
            }, {
                label: 'Item 5',
                value: 'item_5',
            }, {
                label: 'Item 6',
                value: 'item_7',
            }],
            onSubmit: d => console.log(d),
        }

        return <span>
            <Color red> Example 1 </Color>
            <br/>
            <QuickSearch {...props}></QuickSearch>
        </span>
    }
}

render(<UI/>);
