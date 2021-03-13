import { render } from '@testing-library/react'
import EmptyBag from '@/components/bag/emptyBag'

describe('<EmptyBag />', () => {
  it('renders <EmptyBag /> component', () => {
    const { container, getByText } = render(<EmptyBag />)
    expect(getByText('Your Shopping Bag Is Empty')).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot()
  })
})
