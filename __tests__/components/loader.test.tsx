import React from 'react'
import { render } from '@testing-library/react'
import { Loader } from '../../components/'

describe('<Loader />', () => {
  it('renders <Loader /> component', () => {
    const { container } = render(<Loader />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
