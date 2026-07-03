import { Flex } from '../Flex/Flex'
import type { FlexProps } from '../Flex/Flex'

type VStackProps = Omit<FlexProps, 'direction'>

export const VStack = (props: VStackProps) => {
  const { align = 'start' } = props
  return <Flex {...props} direction='column' align={align} />
}
