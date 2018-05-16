const {h, Component, Color} = require('ink');
const hasAnsi = require('has-ansi');
const isEqual = require('lodash.isequal');

const noop = () => {};
const defaultValue = {label:''}; // Used as return for empty array


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
        const StatusComponent_ = this.props.statusComponent;

        const items = this.props.items.map((item, index) => {
            const isLast = (index === this.props.items.length - 1);
            const isSelected = (index === this.state.selectionIndex);
            const isHighlighted = undefined;

            const itemProps = {isSelected, isHighlighted};

            const label = item.label;
            const queryPosition = this.getMatchPosition(label, this.state.query);

            let labelComponent = '';
            if (queryPosition === -1) {
                itemProps.isHighlighted = false;
                labelComponent = <span>{label}</span>
            } else {
                itemProps.isHighlighted = true;
                const start = queryPosition;
                const end = start + this.state.query.length;

                const first = label.slice(0, start);
                const second = label.slice(start, end);
                const third = label.slice(end);

                labelComponent = <span>
                    {first}
                    <HighlightComponent_>{second}</HighlightComponent_>
                    {third}
                </span>
            }

            return <ItemComponent_ key={item.value} {...itemProps}>
                <IndicatorComponent_ {...itemProps}/>
                {labelComponent}
                {!isLast && <br/>}
            </ItemComponent_>;
        });

        return <span>
            {items}
            <StatusComponent_ hasMatch={this.state.hasMatch}>
                <br/>
                {this.state.query}
            </StatusComponent_>
        </span>;
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
        } else if (key.name === 'escape') { // TODO: This is actually bugged
            this.setState({query: ''});
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
        this.setState({selectionIndex, query, hasMatch});
    }

    _changeSelection(delta) {
        for (
            let selectionIndex = this.state.selectionIndex + delta;
            0 <= selectionIndex && selectionIndex < this.props.items.length;
            selectionIndex += delta
        ) {
            if (!this.state.hasMatch) {
                this.setState({selectionIndex});
                break;
            }

            if (this.getMatchPosition(this.props.items[selectionIndex].label, this.state.query) !== -1) {
                this.setState({selectionIndex});
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
        return this.props.items[this.state.selectionIndex] || defaultValue;
    }
}

QuickSearch.initialState = {
    query: '',
    hasMatch: true,
    selectionIndex: 0,
    labels: [],
};

QuickSearch.defaultProps = {
    items: [],
    onSubmit: noop,
    focus: true,
    caseSensitive: false,
    indicatorComponent: IndicatorComponent,
    itemComponent: ItemComponent,
    highlightComponent: HighlightComponent,
    statusComponent: StatusComponent,
};

module.exports = QuickSearch;
