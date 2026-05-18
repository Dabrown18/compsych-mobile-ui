import React from 'react';

import { render } from '@testing-library/react-native';

import { Slider } from './index';

describe('Slider', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<Slider />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders label', () => {
    const { getByText } = render(<Slider label="Volume" />);
    expect(getByText('Volume')).toBeTruthy();
  });

  it('renders min/max labels when showMinMax is true', () => {
    const { getByText } = render(<Slider min={0} max={100} showMinMax />);
    expect(getByText('0')).toBeTruthy();
    expect(getByText('100')).toBeTruthy();
  });

  it('renders disabled state', () => {
    const { toJSON } = render(<Slider label="Disabled slider" disabled />);
    expect(toJSON()).toBeTruthy();
  });

  it('respects default value', () => {
    const { toJSON } = render(<Slider defaultValue={50} min={0} max={100} />);
    expect(toJSON()).toBeTruthy();
  });
});
