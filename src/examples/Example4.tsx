import React, { FC, useState } from 'react';
import { render, Color, Text } from 'ink';
import termSize from 'term-size';
import QuickSearch from '../QuickSearchInput';

export const Example4Name = 'Long list limited to terminal size; non-matching queries are not allowed';

export const Example4: FC = () => {
  const [selectedValue, setSelectedValue] = useState('');
  return (
    <>
      <Text key='header'>Example 4: {Example4Name}</Text>
      <Color green key='selected-item'>Selected item is {selectedValue}</Color>
      { '\n\n' }
      <QuickSearch key='input' {...{
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
            onSelect: d => setSelectedValue(d.label),
            statusComponent: () => <></>,
            forceMatchingQuery: true,
            limit: termSize().rows - 2, // One for clear screen, one for cursor (Could be 1 more for statusComponent if that exists)
        }} />
    </>
  )

}

if (require.main && require.main.filename === __filename) {
  render(<Example4 />);
}