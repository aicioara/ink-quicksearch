const {h, render, Component, Color} = require('ink');
const hasAnsi = require('has-ansi');

const noop = () => {};


const Indicator = ({isSelected, children}) => {
    if (!isSelected) {
        return ' ';
    }

    return <Color blue>&gt;</Color>
}

const Item = ({isSelected, children}) => (
    <Color blue>
        {children}
    </Color>
);

const Highlight = ({isSelected, children}) => (
    <Color bgHex="#FFFFFF">
        {children}
    </Color>
);

class QuickSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
        }

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    render() {
        const HighlightComponent = this.props.highlightComponent;
        const ItemComponent = this.props.itemComponent;

        const items = this.props.items.map((item, index) => {
            const isLast = (index === this.props.items.length - 1)
            const isSelected = false;

            const label = item.label;
            const query = this.state.query;
            const queryPosition = label.indexOf(query);

            let display = ""

            if (queryPosition === -1) {
                display = <ItemComponent>{label}</ItemComponent>
            } else {
                const start = queryPosition;
                const end = start + query.length;

                const first = label.slice(0, start);
                const second = label.slice(start, end);
                const third = label.slice(end);

                display = <ItemComponent>
                    {first}
                    <HighlightComponent>{second}</HighlightComponent>
                    {third}
                </ItemComponent>
            }

            return <span key={item.value}>
                {display}
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

        // TODO: ups and downs come from here
        if (hasAnsi(key.sequence)) {
            return;
        }

        const {onChange, onSubmit, value} = this.props
        const {query} = this.state

        if (key.name === 'return') {
            onSubmit(query);
            return;
        }

        if (key.name === 'backspace') {
            const newQuery = query.slice(0, -1);
            this.setState({query: newQuery})
            return;
        }

        const newQuery = query + ch;
        this.setState({query: newQuery});

        // console.log(ch, key);
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
