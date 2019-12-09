import React, { FC, useState } from 'react';
import { render, Color, Text, Box, Static } from 'ink';

import QuickSearch, { ItemProps } from '../QuickSearchInput';

export const Example3Name = 'Case-Sensitive, Hiding Status & non-selected Items';

// Hide elements which are not selected
const ItemComponent = ({isHighlighted, isSelected, children}:ItemProps) => {
  if (!isHighlighted) {
      return <></>;
  }
  return <Color hex={isSelected ? '#00FF00' : ''}>{children}</Color>;
};

const StatusComponent = () => <></>; // No-op

export const Example3: FC = () => {
  const [selectedValue, setSelectedValue] = useState('');
  return (
    <>
      <Text>Example 3: {Example3Name}</Text>
      <Color green>Selected item is {selectedValue}</Color>
      { '\n\n' }
      <QuickSearch {...{
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
            statusComponent: StatusComponent,
            // Only show items which are selected
            itemComponent: ItemComponent
        }} />
    </>
  )

}

if (require.main && require.main.filename === __filename) {
  render(<Example3 />);
}