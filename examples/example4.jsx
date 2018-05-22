/**
 * Limiting rows to current terminal size
 */

const {h, render, Component} = require('ink');
const termSize = require('term-size');

const QuickSearch = require('import-jsx')('../src/QuickSearch.jsx');

class Example3 extends Component {
    render() {
        const props = {
            items: [
                {label: 'Aardvark'},
                {label: 'Abyssinian'},
                {label: 'Adelie Penguin'},
                {label: 'Affenpinscher'},
                {label: 'Afghan Hound'},
                {label: 'African Bush Elephant'},
                {label: 'African Civet'},
                {label: 'African Clawed Frog'},
                {label: 'African Forest Elephant'},
                {label: 'African Palm Civet'},
                {label: 'African Penguin'},
                {label: 'African Tree Toad'},
                {label: 'African Wild Dog'},
                {label: 'Ainu Dog'},
                {label: 'Airedale Terrier'},
                {label: 'Akbash'},
                {label: 'Akita'},
                {label: 'Alaskan Malamute'},
                {label: 'Albatross'},
                {label: 'Aldabra Giant Tortoise'},
                {label: 'Alligator'},
                {label: 'Alpine Dachsbracke'},
                {label: 'American Bulldog'},
                {label: 'American Cocker Spaniel'},
                {label: 'American Coonhound'},
                {label: 'American Eskimo Dog'},
                {label: 'American Foxhound'},
                {label: 'American Pit Bull Terrier'},
                {label: 'American Staffordshire Terrier'},
                {label: 'American Water Spaniel'},
                {label: 'Anatolian Shepherd Dog'},
                {label: 'Angelfish'},
                {label: 'Ant'},
                {label: 'Anteater'},
                {label: 'Antelope'},
                {label: 'Appenzeller Dog'},
                {label: 'Arctic Fox'},
                {label: 'Arctic Hare'},
                {label: 'Arctic Wolf'},
                {label: 'Armadillo'},
                {label: 'Asian Elephant'},
                {label: 'Asian Giant Hornet'},
                {label: 'Asian Palm Civet'},
                {label: 'Asiatic Black Bear'},
                {label: 'Australian Cattle Dog'},
                {label: 'Australian Kelpie Dog'},
                {label: 'Australian Mist'},
                {label: 'Australian Shepherd'},
                {label: 'Australian Terrier'},
                {label: 'Avocet'},
                {label: 'Axolotl'},
                {label: 'Aye Aye'},
            ],
            onSelect: () => {},
            statusComponent: () => <span></span>,
            limit: termSize().rows - 2, // One for clear screen, one for cursor
                                        // Could be 1 more for statusComponent if that exists
        };

        return <span>
            <QuickSearch {...props} />
        </span>;
    }
}

console.log('\x1Bc'); // Clear screen
render(<Example3/>);
