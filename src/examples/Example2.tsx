import React, { FC, useState } from 'react';
import { render, Color, Text, Box, Static } from 'ink';

import QuickSearch from '../QuickSearchInput';

export const Example2Name = 'Case-Sensitive, No Query/Status Element';

export const Example2: FC = () => {
  const [selectedValue, setSelectedValue] = useState('');
  return (
    <>
      <Text key='header'>Example 2: {Example2Name}</Text>
      <Color green key='selected-item'>Selected item is {selectedValue}</Color>
      { '\n\n' }
      <QuickSearch key='input' {...{
            items: [
                {label: 'Animal'},
                {label: 'Antilope'},
                {label: 'Animation'},
                {label: 'Animate'},
                {label: 'Arizona'},
                {label: 'Aria'},
                {label: 'Arid'},
            ],
            onSelect: d => setSelectedValue(d.label),
            caseSensitive: true,
            // Hide the statusComponent
            statusComponent: () => <></>,
        }} />
    </>
  )

}

if (require.main && require.main.filename === __filename) {
  render(<Example2 />);
}