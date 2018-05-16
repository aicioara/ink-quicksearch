const {h, render, Component, Color} = require('ink');
const hasAnsi = require('has-ansi');

const noop = () => {};


const Indicator = ({isSelected, children}) => {
    return <Color hex="#00FF00">{isSelected ? '>' : ''}</Color>
}

const Item = ({isSelected, isHighlighted, children}) => (
    <Color hex={isSelected ? '#00FF00' : ''}> {children} </Color>
);


const Highlight = ({isSelected, isHighlighted, children}) => (
    <Color bgHex="#6C71C4">{children}</Color>
);


class QuickSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            selectionIndex: 0,
        }

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    render() {
        const HighlightComponent = this.props.highlightComponent;
        const ItemComponent = this.props.itemComponent;
        const IndicatorComponent = this.props.indicatorComponent;

        let foundFirstSelection = false;

        const items = this.props.items.map((item, index) => {
            const isLast = (index === this.props.items.length - 1)
            const isSelected = (index === this.state.selectionIndex);
            const isHighlighted = false;

            const itemProps = {isSelected, isHighlighted}

            const label = item.label;
            const query = this.state.query;
            const queryPosition = query.trim() === '' ? -1 : label.indexOf(query);

            let display = ""
            if (queryPosition === -1) {
                display = <ItemComponent {...itemProps}>{label}</ItemComponent>
            } else {
                const start = queryPosition;
                const end = start + query.length;

                const first = label.slice(0, start);
                const second = label.slice(start, end);
                const third = label.slice(end);

                display = <ItemComponent {...itemProps}>
                    {first}
                    <HighlightComponent>{second}</HighlightComponent>
                    {third}
                </ItemComponent>
            }

            return <span key={item.value}>
                <IndicatorComponent {...itemProps}/>{display}
                <br/>
            </span>
        })

        return <span>
            {items}
            <Color green> Your query: {this.state.query} </Color>
        </span>
    }

    componentDidMount() {
        process.stdin.on('keypress', this.handleKeyPress);
    }

    componentWillUnmount() {
        process.stdin.removeListener('keypress', this.handleKeyPress);
    }

    handleKeyPress(ch, key) {
        if (!this.props.focus) {
            return;
        }

        const {query} = this.state

        if (key.name === 'return') {
            this.props.onSubmit(this.props.items[this.state.selectionIndex]);
            return;
        } else if (key.name === 'backspace') {
            const newQuery = query.slice(0, -1);
            this.setState({query: newQuery})
            return;
        } else if (key.name === 'up') {
            this._changeSelection(-1);
            return;
        } else if (key.name === 'down') {
            this._changeSelection(1)
            return;
        } else if (key.name === 'escape') {
            this.setState({query: ''})
            return;
        }

        // console.log(ch, key);
        if (hasAnsi(key.sequence)) {
            return; // No need to add to query
        }

        const newQuery = query + ch;
        this.setState({query: newQuery});

    }

    // TODO: implement cycles
    _changeSelection(delta) {
        const selectionIndex = this.state.selectionIndex + delta;
        if (selectionIndex < 0) {
            return;
        }
        if (selectionIndex >= this.props.items.length) {
            return;
        }
        this.setState({selectionIndex})

    }
}

QuickSearch.propTypes = {

};

QuickSearch.defaultProps = {
    items: [],
    onSubmit: noop,
    focus: true,
    caseSensitive: false,
    indicatorComponent: Indicator,
    itemComponent: Item,
    highlightComponent: Highlight,
};

module.exports = QuickSearch;
