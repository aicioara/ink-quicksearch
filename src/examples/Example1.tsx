import React, { FC, useState } from 'react';
import { render, Color, Text, Box, Static } from 'ink';

import QuickSearch, { Item } from '../QuickSearchInput';

export const Example1Name = 'Basic';

export const Example1: FC = () => {
  const [selectedValue, setSelectedValue] = useState('');
  return (
    <>
      <Text>Example 1: {Example1Name}</Text>
      <Color green>Selected item is {selectedValue}</Color>
      {'\n\n'}
      <QuickSearch {...{
        items: [
          { value: 1, label: 'Animal' },
          { value: 3, label: 'Antilope' },
          { value: 2, label: 'Animation' },
          { value: 0, label: 'Animate' },
          { value: 4, label: 'Arizona' },
          { value: 5, label: 'Aria' },
          { value: 6, label: 'Arid' },
        ],
        onSelect: item => setSelectedValue(item.label),
      }} />
    </>
  )
}

if (require.main && require.main.filename === __filename) {
  render(<Example1 />);
}