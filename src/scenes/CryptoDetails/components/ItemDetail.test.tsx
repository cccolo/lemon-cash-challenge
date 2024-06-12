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

  it('should apply the correct styles', () => {
    const title = 'Styled Title';
    const description = 'Styled Description';

    const {getByText} = render(
      <ItemDetail title={title} description={description} />,
    );

    const titleText = getByText(title);
    const descriptionText = getByText(description);

    expect(titleText).toHaveStyle({
      color: 'rgb(0, 240, 104)',
      fontFamily: 'NeueMachina-Regular',
      fontSize: 12,
    });

    expect(descriptionText).toHaveStyle({
      color: 'white',
      fontFamily: 'NeueMachina-Regular',
      fontSize: 12,
    });
  });
});
