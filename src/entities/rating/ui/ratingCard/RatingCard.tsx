import { memo, useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/button/Button'
import { buttonSize } from '@/shared/ui/button/consts'
import { Card } from '@/shared/ui/card/Card'
import { Drawer } from '@/shared/ui/drawer/Drawer'
import { Input } from '@/shared/ui/input/Input'
import { Modal } from '@/shared/ui/modal/Modal'
import { HStack, VStack } from '@/shared/ui/stack'
import { StarRating } from '@/shared/ui/starRating/StarRating'
import { Text } from '@/shared/ui/text/Text'

interface RatingCardProps {
  className?: string
  title?: string
  feedbackTitle?: string
  hasFeedback?: boolean
  rate?: number
  onAccept?: (starsCount: number, feedback?: string) => void
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className = '',
    onAccept,
    feedbackTitle,
    hasFeedback,
    title,
    rate = 0,
  } = props
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [starsCount, setStarsCount] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [isAccepted, setIsAccepted] = useState(false)

  const isRated = rate > 0 || isAccepted

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount)
      if (hasFeedback) {
        setIsModalOpen(true)
      } else {
        setIsAccepted(true)
        onAccept?.(selectedStarsCount)
      }
    },
    [hasFeedback, onAccept],
  )

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false)
    setIsAccepted(true)
    onAccept?.(starsCount, feedback)
  }, [feedback, onAccept, starsCount])

  const skipFeedbackHandle = useCallback(() => {
    setIsModalOpen(false)
    setIsAccepted(true)
    onAccept?.(starsCount)
  }, [onAccept, starsCount])

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input
        value={feedback}
        onChange={setFeedback}
        placeholder={t('Ваш отзыв')}
      />
    </>
  )

  return (
    <Card fullWidth className={classNames('', {}, [className])}>
      <VStack align='center' gap='8'>
        <Text title={isRated ? t('Спасибо за оценку') : title} />
        <StarRating size={40} selectedStars={rate} onSelect={onSelectStars} />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy onClose={skipFeedbackHandle}>
          <VStack max gap='32'>
            {modalContent}
            <HStack max gap='16' justify='end'>
              <Button onClick={acceptHandle}>{t('Отправить')}</Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} onClose={skipFeedbackHandle}>
          <VStack gap='32'>
            {modalContent}
            <Button fullWidth onClick={acceptHandle} size={buttonSize.l}>
              {t('Отправить')}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>
  )
})

RatingCard.displayName = 'RatingCard Component'
