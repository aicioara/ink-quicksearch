const {h, render, Component, Color} = require('ink');
const hasAnsi = require('has-ansi');
const isEqual = require('lodash.isequal');

const noop = () => {};


const Indicator = ({isSelected, children}) => {
    return <Color hex="#00FF00">{isSelected ? '>' : ''}</Color>
}

// Maybe I can add the label concept here by putting it next to children and
// then I will be compatible in all APIs
const Item = ({isSelected, isHighlighted, children}) => (
    <Color hex={isSelected ? '#00FF00' : ''}> {children} </Color>
);


const Highlight = ({isSelected, isHighlighted, children}) => (
    <Color bgHex="#6C71C4">{children}</Color>
);


class QuickSearch extends Component {
    constructor(props) {
        super(props);
        this.state = QuickSearch.initialState;
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
            const queryPosition = this.getMatchPosition(label, this.state.query);

            let display = ""
            if (queryPosition === -1) {
                display = <ItemComponent {...itemProps}>{label}</ItemComponent>
            } else {
                const start = queryPosition;
                const end = start + this.state.query.length;

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

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.items, nextProps.items)) {
            this.setState(QuickSearch.initialState);
        }
    }

    handleKeyPress(ch, key) {
        if (!this.props.focus) {
            return;
        }

        const {query} = this.state

        if (key.name === 'return') {
            this.props.onSubmit(this.getValue());
        } else if (key.name === 'backspace') {
            this._updateQuery(query.slice(0, -1));
        } else if (key.name === 'up') {
            this._changeSelection(-1);
        } else if (key.name === 'down') {
            this._changeSelection(1)
        } else if (key.name === 'escape') { // TODO: This is actually bugged
            this.setState({query: ''})
        } else if (hasAnsi(key.sequence)) {
            // No-op
        } else {
            this._updateQuery(query + ch);
        }

        // console.log(ch, key);

    }

    _updateQuery(query) {
        let selectionIndex = 0;
        if (query.trim() === '' || this.getMatchPosition(this.getValue().label, query) !== -1) {
            selectionIndex = this.state.selectionIndex;
        } else {
            for (var i = 0; i < this.props.items.length; i++) {
                if (this.getMatchPosition(this.props.items[i].label, query) !== -1) {
                    selectionIndex = i;
                    break;
                }
            }
        }
        this.setState({selectionIndex, query})
    }

    // TODO: implement selection jumps
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

    getMatchPosition(label, query) {
        if (query.trim === '') {
            return -1;
        }
        return label.toLowerCase().indexOf(query.toLowerCase());
    }

    getValue() {
        return this.props.items[this.state.selectionIndex];
    }
}

QuickSearch.propTypes = {

};

// Maybe I can have the onChange and value concepts here, so this can be modified from the outside
// Will see how I feel like
QuickSearch.defaultProps = {
    items: [],
    onSubmit: noop,
    focus: true,
    caseSensitive: false,
    indicatorComponent: Indicator,
    itemComponent: Item,
    highlightComponent: Highlight,
};

QuickSearch.initialState = {
    query: '',
    selectionIndex: 0,
    labels: [],
};

module.exports = QuickSearch;
