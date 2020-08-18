import React from 'react';
import Input from './Input';

import {
  render,
  fireEvent,
  cleanup
} from '@testing-library/react';


describe('UNIT/COMPONENT - <Input />', () => {
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

  it('should render render correctly', () => {
    const testName = 'test';
    const inprogress = false;

    render(<Input type='number'
      disabled={inprogress}
      error={true}
      name={testName}
      value={''}
      onChange={spy}
      errorMessage={'only 6 digit integer values allowed'} />);
  });

  it('should render render error message', () => {
    const testName = 'Input';
    const inprogress = false;

    const { getByLabelText } = render(<Input type='number'
      disabled={inprogress}
      label={'inputField'}
      error={true}
      id={testName}
      value={''}
      onChange={spy}
      errorMessage={'only 6 digit integer values allowed'} />);

    const input = getByLabelText('inputField');
    fireEvent.change(input, { target: { value: '23' } })
    expect(spy).toBeCalledTimes(1);
  });

});