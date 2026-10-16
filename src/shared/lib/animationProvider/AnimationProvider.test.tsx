import { render, screen, waitFor } from '@testing-library/react'
import { AnimationProvider, useAnimationLibs } from './AnimationProvider'

const LibsProbe = () => {
  const libs = useAnimationLibs()

  if (!libs.isLoaded) {
    return <span>loading</span>
  }

  return (
    <span>
      {typeof libs.Spring.useSpring} {typeof libs.Gesture.useDrag}
    </span>
  )
}

const renderProvider = () =>
  render(
    <AnimationProvider>
      <LibsProbe />
    </AnimationProvider>,
  )

describe('AnimationProvider.test', () => {
  afterEach(() => {
    jest.dontMock('@use-gesture/react')
  })

  test('should provide spring and gesture libs after loading', async () => {
    renderProvider()

    expect(screen.getByText('loading')).toBeInTheDocument()
    expect(await screen.findByText('function function')).toBeInTheDocument()
  })

  test('should stay not loaded and report error when libs fail to load', async () => {
    const loadError = new Error('offline')
    jest.doMock('@use-gesture/react', () => {
      throw loadError
    })
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    renderProvider()

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledWith(loadError)
    })
    expect(screen.getByText('loading')).toBeInTheDocument()
  })
})
