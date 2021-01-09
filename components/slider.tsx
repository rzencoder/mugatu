import { useColorMode } from '@chakra-ui/react'
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'

const sliderStyle = {
  position: 'relative',
  width: '100%',
  height: 80,
}

function Handle({ handle: { id, percent, value }, getHandleProps }) {
  const { colorMode } = useColorMode()
  return (
    <div
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: -15,
        marginTop: 25,
        zIndex: 2,
        width: 25,
        height: 25,
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: colorMode === 'light' ? '#fff' : '#000',
        border: '3px solid',
        borderColor: colorMode === 'light' ? '#000' : '#fff',
      }}
      {...getHandleProps(id)}
    >
      <div
        style={{
          fontFamily: 'Poppins',
          fontSize: 14,
          marginTop: -28,
          marginLeft: -10,
          width: 35,
          textAlign: 'center',
        }}
      >
        £{value}
      </div>
    </div>
  )
}

function Track({ source, target, getTrackProps }) {
  const { colorMode } = useColorMode()
  return (
    <div
      style={{
        position: 'absolute',
        height: 5,
        zIndex: 1,
        marginTop: 35,
        backgroundColor: colorMode === 'light' ? '#000' : '#fff',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  )
}

const SliderComponent = ({ handlePriceFilter }) => {
  const { colorMode } = useColorMode()

  const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 5,
    marginTop: 35,
    borderRadius: 5,
    backgroundColor: colorMode === 'light' ? '#000' : '#fff',
  }

  return (
    <Slider
      rootStyle={sliderStyle}
      domain={[0, 200]}
      step={5}
      mode={1}
      values={[0, 200]}
      onChange={(values) => handlePriceFilter('price', values)}
    >
      <Rail>{({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}</Rail>
      <Handles>
        {({ handles, getHandleProps }) => (
          <div className="slider-handles">
            {handles.map((handle) => (
              <Handle key={handle.id} handle={handle} getHandleProps={getHandleProps} />
            ))}
          </div>
        )}
      </Handles>
      <Tracks left={false} right={false}>
        {({ tracks, getTrackProps }) => (
          <div className="slider-tracks">
            {tracks.map(({ id, source, target }) => (
              <Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
            ))}
          </div>
        )}
      </Tracks>
    </Slider>
  )
}

export default SliderComponent
