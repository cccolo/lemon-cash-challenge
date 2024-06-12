import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {InputSearch} from './InputSearch';

describe('InputSearch Component', () => {
  const onCancelMock = jest.fn();
  const onChangeTextMock = jest.fn();

  it('renders correctly and matches snapshot', () => {
    const {toJSON} = render(
      <InputSearch onCancel={onCancelMock} onChangeText={onChangeTextMock} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onChangeText when text is changed', () => {
    const {getByTestId} = render(
      <InputSearch onCancel={onCancelMock} onChangeText={onChangeTextMock} />,
    );

    const searchInput = getByTestId('input');
    fireEvent.changeText(searchInput, 'Bitcoin');
    expect(searchInput.props.value).toBe('Bitcoin');
  });

  it('clears search query and calls onCancel when cancel button is pressed', () => {
    const {getByTestId} = render(
      <InputSearch onCancel={onCancelMock} onChangeText={onChangeTextMock} />,
    );

    const cancelButton = getByTestId('cancel-button');
    const searchInput = getByTestId('input');
    fireEvent.press(cancelButton);
    expect(onCancelMock).toHaveBeenCalled();
    expect(searchInput.props.value).toBe('');
  });
});
