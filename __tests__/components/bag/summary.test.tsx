import { fireEvent, render } from '@testing-library/react'
import Summary from '@/components/bag/summary'
import { ProvideBag } from '@/mocks/bagContext'
import { bag } from '@/mocks/bag'

describe('<Summary />', () => {
  it('renders <Summary /> component', () => {
    const { container, getByText } = render(
      <ProvideBag bag={[]}>
        <Summary subtotal={49.99} />
      </ProvideBag>
    )
    expect(getByText('£49.99')).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('changes delivery prices when subtotal is above £50', () => {
    const { getAllByText, getByTestId } = render(
      <ProvideBag bag={bag}>
        <Summary subtotal={59.99} />
      </ProvideBag>
    )
    fireEvent.click(getByTestId('set-delivery-standard delivery'))
    expect(getAllByText('standard delivery (free)')).toBeTruthy()
  })
})
