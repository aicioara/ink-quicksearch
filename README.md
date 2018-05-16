# Ink Quicksearch

> QuickSearch Component for [Ink](https://github.com/vadimdemedes/ink)

## Install

```
$ npm install ink-quicksearch
```

## Usage

```jsx
const {h, render, Component} = require('ink');
const QuickSearch = require('ink-quicksearch');

class Demo extends Component {
    render() {
        const props = {
            items: [
                {value: 1, label: 'Animal'},
                {value: 3, label: 'Antilope'},
                {value: 2, label: 'Animation'},
                {value: 0, label: 'Animate'},
                {value: 4, label: 'Arizona'},
                {value: 5, label: 'Aria'},
                {value: 6, label: 'Arid'},
            ],
            onSubmit: item => {
                // `item` = { label: 'First', value: 'first' }
            };,
        };

        return <QuickSearch {...props} />
    }
}

render(<Demo/>);
```
