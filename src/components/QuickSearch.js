const {h, render, Component, Color} = require('ink');
const hasAnsi = require('has-ansi');

const noop = () => {};


const Indicator = ({isSelected, children}) => {
    if (!isSelected) {
        return ' ';
    }

    return <Color blue>&gt;</Color>
}

const Item = ({isSelected, isHighlighted, children}) => (
    <Color blue={isSelected}>
        {children}
    </Color>
);


const Highlight = ({isSelected, isHighlighted, children}) => (
    <Color bgHex="#6C71C4">
        {children}
    </Color>
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
                <IndicatorComponent/>{display}
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

        const {onChange, onSubmit, value} = this.props
        const {query} = this.state

        if (key.name === 'return') {
            onSubmit(query);
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
        }

        const newQuery = query + ch;
        this.setState({query: newQuery});

        console.log(ch, key);
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
    value: '',
    query: '',
    onChange: noop,
    onSubmit: noop,
    focus: true,
    caseSensitive: false,
    indicatorComponent: Indicator,
    itemComponent: Item,
    highlightComponent: Highlight,
};

module.exports = QuickSearch;
