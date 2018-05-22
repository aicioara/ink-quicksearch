# Ink Quicksearch

> QuickSearch Component for [Ink](https://github.com/vadimdemedes/ink)

## Install

```
$ npm install ink-quicksearch
```

## Quickstart

```bash
npm start
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
            onSelect: item => {
                // `item` = { label: 'First', value: 'first' }
            };,
        };

        return <QuickSearch {...props} />
    }
}

render(<Demo/>);
```


## Props



### items

Type: `array`<br>
Default: `[]`

Items to display in a list. Each item must be an object and have at least a `label` prop.



### onSelect

Type: `function`

Function to call when user selects an item. Item object is passed to that function as an argument.



### focus

Type: `boolean`<br>
Default: `true`

Listen to user's input. Useful in case there are multiple input components at the same time and input must be "routed" to a specific component.



### caseSensitive

Type: `boolean`<br>
Default: `false`

Whether or not quicksearch matching will be case sensitive



### indicatorComponent

Type: `Component`<br>
Props:

- `isSelected`: `boolean`
- `isHighlighted`: `boolean`
- `item`: `Object` - The corresponding object inside `props.items`

Custom component to override the default indicator component (default - arrow).



### itemComponent

Type: `Component`<br>
Props:

- `isSelected`: `boolean`
- `isHighlighted`: `boolean`
- `item`: `Object` - The corresponding object inside `props.items`
- `children`: `any`

Custom component to override the default item style (default - selection coloring).



### highlightComponent

Type: `Component`<br>
Props:

- `isSelected`: `boolean`
- `isHighlighted`: `boolean`
- `item`: `Object` - The corresponding object inside `props.items`
- `children`: `any`

Custom component to override the default highlight style (default - background highlight).



### statusComponent

Type: `Component`<br>
Props:

- `hasMatch`: `boolean`
- `children`: `any`

Custom component to override the status component (default - current query).


### limit

Type: `int`<br>
Default: `0`

Limit the number of rows to display. `0` is unlimited <br>
Use in conjunction with https://www.npmjs.com/package/term-size


### forceMatchingQuery

Type: `bool`<br>
Default: `false`

If set to true, queries that return no results are not allowed. In particular, if previous query `X` returns at least one result and `X + new_character` would not, query will not update to `X + new_character`


## Default Components

```jsx
// For the following four, whitespace is important
const IndicatorComponent = ({isSelected}) => {
    return <Color hex="#00FF00">{isSelected ? '>' : ' '} </Color>;
};

const ItemComponent = ({isSelected, children}) => (
    <Color hex={isSelected ? '#00FF00' : ''}>{children}</Color>
);

const HighlightComponent = ({children}) => (
    <Color bgHex="#6C71C4">{children}</Color>
);

const StatusComponent = ({hasMatch, children}) => (
    <Color hex={hasMatch ? '#00FF00' : '#FF0000'}>{children}</Color>
);
```
