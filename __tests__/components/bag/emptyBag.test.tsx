import React from 'react'
import { render } from '@testing-library/react'
import EmptyBag from '@/components/bag/emptyBag'

describe('<EmptyBag />', () => {
  it('renders <EmptyBag /> component', () => {
    const { container } = render(<EmptyBag />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
