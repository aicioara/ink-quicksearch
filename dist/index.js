const { h, render, Component, Color } = require('ink');
const hasAnsi = require('has-ansi');
const isEqual = require('lodash.isequal');

const noop = () => {};

const IndicatorComponent = ({ isSelected, children }) => {
    return h(
        Color,
        { hex: '#00FF00' },
        isSelected ? '>' : ''
    );
};

// Maybe I can add the label concept here by putting it next to children and
// then I will be compatible in all APIs
const ItemComponent = ({ isSelected, isHighlighted, children }) => h(
    Color,
    { hex: isSelected ? '#00FF00' : '' },
    ' ',
    children,
    ' '
);

const HighlightComponent = ({ isSelected, isHighlighted, children }) => h(
    Color,
    { bgHex: '#6C71C4' },
    children
);

const StatusComponent = ({ hasMatch, children }) => h(
    Color,
    { hex: hasMatch ? '#00FF00' : '#FF0000' },
    children
);

class QuickSearch extends Component {
    constructor(props) {
        super(props);
        this.state = QuickSearch.initialState;
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    render() {
        // Cannot have these starting with lowercases
        const HighlightComponent_ = this.props.highlightComponent;
        const ItemComponent_ = this.props.itemComponent;
        const IndicatorComponent_ = this.props.indicatorComponent;

        const items = this.props.items.map((item, index) => {
            const isLast = index === this.props.items.length - 1;
            const isSelected = index === this.state.selectionIndex;
            const isHighlighted = false;

            const itemProps = { isSelected, isHighlighted };

            const label = item.label;
            const queryPosition = this.getMatchPosition(label, this.state.query);

            let display = "";
            if (queryPosition === -1) {
                display = h(
                    ItemComponent_,
                    itemProps,
                    label
                );
            } else {
                const start = queryPosition;
                const end = start + this.state.query.length;

                const first = label.slice(0, start);
                const second = label.slice(start, end);
                const third = label.slice(end);

                display = h(
                    ItemComponent_,
                    itemProps,
                    first,
                    h(
                        HighlightComponent_,
                        null,
                        second
                    ),
                    third
                );
            }

            return h(
                'span',
                { key: item.value },
                h(IndicatorComponent_, itemProps),
                display,
                h('br', null)
            );
        });

        return h(
            'span',
            null,
            items,
            h(
                StatusComponent,
                { hasMatch: this.state.hasMatch },
                this.state.query
            )
        );
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

        if (key.name === 'return') {
            this.props.onSubmit(this.getValue());
        } else if (key.name === 'backspace') {
            this._updateQuery(this.state.query.slice(0, -1));
        } else if (key.name === 'up') {
            this._changeSelection(-1);
        } else if (key.name === 'down') {
            this._changeSelection(1);
        } else if (key.name === 'escape') {
            // TODO: This is actually bugged
            this.setState({ query: '' });
        } else if (hasAnsi(key.sequence)) {
            // No-op
        } else {
            this._updateQuery(this.state.query + ch);
        }

        // console.log(ch, key);
    }

    _updateQuery(query) {
        let selectionIndex = this.state.selectionIndex;
        let hasMatch = false;
        if (query.trim() === '' || this.getMatchPosition(this.getValue().label, query) !== -1) {
            hasMatch = true;
        } else {
            for (var i = 0; i < this.props.items.length; i++) {
                if (this.getMatchPosition(this.props.items[i].label, query) !== -1) {
                    selectionIndex = i;
                    hasMatch = true;
                    break;
                }
            }
        }
        this.setState({ selectionIndex, query, hasMatch });
    }

    _changeSelection(delta) {
        let selectionIndex = this.state.selectionIndex;
        while (true) {
            selectionIndex = selectionIndex + delta;
            if (selectionIndex < 0) {
                return;
            }
            if (selectionIndex >= this.props.items.length) {
                return;
            }

            if (!this.state.hasMatch) {
                this.setState({ selectionIndex });
                break;
            }

            if (this.getMatchPosition(this.props.items[selectionIndex].label, this.state.query) !== -1) {
                this.setState({ selectionIndex });
                break;
            }
        }
    }

    getMatchPosition(label, query) {
        if (query.trim === '') {
            return -1;
        }
        if (this.props.caseSensitive) {
            return label.indexOf(query);
        } else {
            return label.toLowerCase().indexOf(query.toLowerCase());
        }
    }

    getValue() {
        return this.props.items[this.state.selectionIndex];
    }
}

QuickSearch.defaultProps = {
    items: [],
    onSubmit: noop,
    focus: true,
    caseSensitive: false,
    indicatorComponent: IndicatorComponent,
    itemComponent: ItemComponent,
    highlightComponent: HighlightComponent
};

QuickSearch.initialState = {
    query: '',
    hasMatch: true,
    selectionIndex: 0,
    labels: []
};

module.exports = QuickSearch;
