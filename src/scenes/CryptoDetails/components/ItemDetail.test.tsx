import React from 'react';
import {render} from '@testing-library/react-native';
import {ItemDetail} from './ItemDetail';

describe('ItemDetail', () => {
  it('should render correctly and match snapshot', () => {
    const title = 'Test Title';
    const description = 'Test Description';

    const {toJSON} = render(
      <ItemDetail title={title} description={description} />,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render title and description correctly', () => {
    const title = 'Test Title';
    const description = 'Test Description';

    const {getByText} = render(
      <ItemDetail title={title} description={description} />,
    );

    expect(getByText(title)).toBeTruthy();
    expect(getByText(description)).toBeTruthy();
  });

  it('should render description as a number correctly', () => {
    const title = 'Test Title';
    const description = 123;

    const {getByText} = render(
      <ItemDetail title={title} description={description} />,
    );

    expect(getByText(title)).toBeTruthy();
    expect(getByText(description.toString())).toBeTruthy();
  });
});
