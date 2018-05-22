const { h, Component, Color } = require('ink');
const hasAnsi = require('has-ansi');
const isEqual = require('lodash.isequal');

const defaultValue = { label: '' }; // Used as return for empty array


// For the following four, whitespace is important
const IndicatorComponent = ({ isSelected }) => {
    return h(
        Color,
        { hex: '#00FF00' },
        isSelected ? '>' : ' ',
        ' '
    );
};

const ItemComponent = ({ isSelected, children }) => h(
    Color,
    { hex: isSelected ? '#00FF00' : '' },
    children
);

const HighlightComponent = ({ children }) => h(
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
        this.state.selectionIndex = this.props.initialSelectionIndex;
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    render() {
        // Cannot have these starting with lowercases
        const HighlightComponent_ = this.props.highlightComponent;
        const ItemComponent_ = this.props.itemComponent;
        const IndicatorComponent_ = this.props.indicatorComponent;
        const StatusComponent_ = this.props.statusComponent;

        const begin = this.state.startIndex;
        let end = this.props.items.length;
        if (this.props.limit !== 0) {
            end = Math.min(begin + this.props.limit, this.props.items.length);
        }
        const items = this.props.items.slice(begin, end);

        const rows = items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isSelected = index + this.state.startIndex === this.state.selectionIndex;
            const isHighlighted = undefined;

            const itemProps = { isSelected, isHighlighted, item };

            const label = item.label;
            const queryPosition = this.getMatchPosition(label, this.state.query);

            let labelComponent = '';
            if (queryPosition === -1) {
                itemProps.isHighlighted = false;
                labelComponent = h(
                    'span',
                    null,
                    label
                );
            } else {
                itemProps.isHighlighted = true;
                const start = queryPosition;
                const end = start + this.state.query.length;

                const first = label.slice(0, start);
                const second = label.slice(start, end);
                const third = label.slice(end);

                labelComponent = h(
                    'span',
                    null,
                    first,
                    h(
                        HighlightComponent_,
                        itemProps,
                        second
                    ),
                    third
                );
            }

            return h(
                ItemComponent_,
                Object.assign({ key: item.value }, itemProps),
                h(IndicatorComponent_, itemProps),
                labelComponent,
                !isLast && h('br', null)
            );
        });

        return h(
            'span',
            null,
            rows,
            h(
                StatusComponent_,
                { hasMatch: this.state.hasMatch },
                h('br', null),
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
            if (nextProps.initialSelectionIndex != null) {
                this._updateSelectionIndex(nextProps.initialSelectionIndex, nextProps);
            }
        }
    }

    handleKeyPress(ch, key) {
        if (!this.props.focus) {
            return;
        }

        if (this.props.clearQueryChars.indexOf(ch) !== -1) {
            this.setState({ query: '' });
        } else if (key.name === 'return') {
            this.props.onSelect(this.getValue());
        } else if (key.name === 'backspace') {
            this._updateQuery(this.state.query.slice(0, -1));
        } else if (key.name === 'up') {
            this._changeSelection(-1);
        } else if (key.name === 'down') {
            this._changeSelection(1);
        } else if (key.name === 'tab') {
            if (key.shift === false) {
                this._changeSelection(1);
            } else {
                this._changeSelection(-1);
            }
        } else if (key.name === 'pageup' || key.name === 'pagedown') {
            this._handlePageChange(key.name);
        } else if (hasAnsi(key.sequence)) {
            // No-op
        } else {
            this._updateQuery(this.state.query + ch);
        }
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

        if (!hasMatch && this.props.forceMatchingQuery) {
            return;
        }

        this._updateSelectionIndex(selectionIndex);
        this.setState({ query, hasMatch });
    }

    _changeSelection(delta) {
        for (let selectionIndex = this.state.selectionIndex + delta; 0 <= selectionIndex && selectionIndex < this.props.items.length; selectionIndex += delta) {
            if (!this.state.hasMatch) {
                this._updateSelectionIndex(selectionIndex);
                break;
            }

            if (this.getMatchPosition(this.props.items[selectionIndex].label, this.state.query) !== -1) {
                this._updateSelectionIndex(selectionIndex);
                break;
            }
        }
    }

    _updateSelectionIndex(selectionIndex, props) {
        if (props == undefined) {
            props = this.props;
        }
        this.setState({ selectionIndex });
        if (props.limit === 0) {
            return;
        }
        const begin = this.state.startIndex;
        const end = Math.min(begin + props.limit, props.items.length);
        if (begin <= selectionIndex && selectionIndex < end) {
            return;
        } else if (selectionIndex >= end) {
            if (selectionIndex >= props.items.length) {
                throw Error(`Error: selection index (${selectionIndex}) outside items range (${props.items.length}).`);
            }
            const startIndex = selectionIndex - props.limit + 1;
            this.setState({ startIndex });
        } else {
            // if (selectionIndex < begin)
            this.setState({ startIndex: selectionIndex });
        }
    }

    _handlePageChange(keyName) {
        if (this.state.query.trim() !== '') {
            return; // Do not page when selecting
        }
        if (this.props.limit === 0) {
            return; // Nothing to page
        }
        let newIndex = this.state.selectionIndex;
        if (keyName === 'pageup') {
            newIndex = Math.max(this.state.selectionIndex - this.props.limit + 1, 0);
        } else if (keyName === 'pagedown') {
            newIndex = Math.min(this.state.selectionIndex + this.props.limit - 1, this.props.items.length - 1);
        }
        this._changeSelection(newIndex - this.state.selectionIndex);
    }

    getMatchPosition(label, query) {
        if (this.props.caseSensitive) {
            return label.indexOf(query);
        } else {
            return label.toLowerCase().indexOf(query.toLowerCase());
        }
    }

    getValue() {
        return this.props.items[this.state.selectionIndex] || defaultValue;
    }
}

QuickSearch.initialState = {
    query: '',
    hasMatch: true,
    selectionIndex: 0,
    startIndex: 0
};

QuickSearch.defaultProps = {
    items: [],
    onSelect: () => {}, // no-op
    focus: true,
    caseSensitive: false,
    limit: 0,
    forceMatchingQuery: false,
    clearQueryChars: ['\u0015', // Ctrl + U
    '\u0017'],
    initialSelectionIndex: 0,
    indicatorComponent: IndicatorComponent,
    itemComponent: ItemComponent,
    highlightComponent: HighlightComponent,
    statusComponent: StatusComponent
};

module.exports = QuickSearch;
