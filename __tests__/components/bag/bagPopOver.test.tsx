import { fireEvent, render } from '@testing-library/react'
import BagPopOver from '@/components/bag/bagPopOver'
import { ProvideBag } from '@/mocks/bagContext'
import { bag } from '@/mocks/bag'
import { Popover } from '@chakra-ui/popover'

describe('<BagPopOver />', () => {
  it('renders <BagPopOver /> component', () => {
    const { container, getByText } = render(
      <Popover>
        <ProvideBag bag={bag}>
          <BagPopOver />
        </ProvideBag>
      </Popover>
    )
    expect(getByText('2 items')).toBeTruthy()
    expect(getByText('View Bag')).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders nothing if no items', () => {
    const { queryByText } = render(
      <Popover>
        <ProvideBag bag={[]}>
          <BagPopOver />
        </ProvideBag>
      </Popover>
    )
    expect(queryByText('View Bag')).toBeNull
  })

  it('removes item is user clicks on delete icon', () => {
    const { queryByText, getByText, getByTestId } = render(
      <Popover>
        <ProvideBag bag={bag}>
          <BagPopOver />
        </ProvideBag>
      </Popover>
    )
    expect(getByText('2 items')).toBeTruthy()
    fireEvent.click(getByTestId('delete-icon-blue-jeans'))
    expect(getByText('1 item')).toBeTruthy()
    expect(queryByText('2 items')).toBeNull
  })
})
