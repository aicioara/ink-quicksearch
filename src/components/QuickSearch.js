const {h, render, Component, Color} = require('ink');
const hasAnsi = require('has-ansi');

const noop = () => {};


class QuickSearch extends Component {
    constructor(props) {
        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    render() {
        return <span>
            <Color green> Foo </Color>
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

        const {onChange, onSubmit, value, query} = this.props

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

        console.log(ch, key);
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
};

module.exports = QuickSearch;
