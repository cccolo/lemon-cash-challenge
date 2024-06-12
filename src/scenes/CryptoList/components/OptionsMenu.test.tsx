import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {OptionsMenu} from './OptionsMenu';

describe('OptionsMenu Component', () => {
  it('matches snapshot', () => {
    const {toJSON} = render(
      <OptionsMenu onToggleMenu={jest.fn} onAction={jest.fn} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('toggles switch and calls onAction', () => {
    const onActionMock = jest.fn();
    const {getByTestId} = render(
      <OptionsMenu onAction={onActionMock} onToggleMenu={jest.fn} />,
    );

    const switchElement = getByTestId('toggle-switch');
    fireEvent(switchElement, 'valueChange', true);
    expect(onActionMock).toHaveBeenCalledWith('FAVORITES', true);
  });
});
