const {h, render, Component, Color} = require('ink');
const hasAnsi = require('has-ansi');

const noop = () => {};


class QuickSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
        }

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    render() {
        const items = this.props.items.map((item, index) => {
            const isLast = (index === this.props.items.length - 1)

            const label = item.label;
            const query = this.state.query;
            const queryPosition = label.indexOf(query);

            let display = ""

            if (queryPosition === -1) {
                display = <Color red>{label}</Color>
            } else {
                const start = queryPosition;
                const end = start + query.length;

                const first = label.slice(0, start);
                const second = label.slice(start, end);
                const third = label.slice(end);

                display = <span>
                    <Color red>{first}</Color>
                    <Color blue>{second}</Color>
                    <Color red>{third}</Color>
                </span>
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
};

module.exports = QuickSearch;
