import React from 'react';
import {Loading} from './Loading';

import {
  render,
  fireEvent,
  cleanup
} from '@testing-library/react';

describe('UNIT/COMPONENT - <PrimaryTextButton />', () => {
  const originalError = console.error
  beforeAll(() => {
    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return
      }
      originalError.call(console, ...args)
    }
  })

  afterAll(() => {
    console.error = originalError
  })


  const spy = jest.fn();

  afterEach(cleanup)

  it('should render correctly', () => {
    
    const { getByTestId } = render(<Loading />);
    getByTestId('loading');
    
  });

 

});