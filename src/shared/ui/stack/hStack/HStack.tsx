import { Flex } from '../flex/Flex'
import type { FlexProps } from '../flex/Flex'

type HStackProps = Omit<FlexProps, 'direction'>

export const HStack = (props: HStackProps) => {
  return <Flex direction='row' {...props} />
}
