import { Flex } from '../flex/Flex'
import type { FlexProps } from '../flex/Flex'

type VStackProps = Omit<FlexProps, 'direction'>

export const VStack = (props: VStackProps) => {
  const { align = 'start' } = props
  return <Flex {...props} direction='column' align={align} />
}
