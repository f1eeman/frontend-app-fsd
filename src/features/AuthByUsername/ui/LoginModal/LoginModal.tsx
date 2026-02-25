import { type FC, Suspense } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { RollerLoader } from '@/shared/ui/Loaders/Roller/RollerLoader'
import { Modal } from '@/shared/ui/Modal/Modal'
// import { LoginFormAsync } from '../LoginForm/LoginForm.async'

interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const LoginModal: FC<LoginModalProps> = (props) => {
  const { className = '', isOpen, onClose } = props

  return (
    <Modal
      className={classNames('', {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<RollerLoader />}>
        {/* <LoginFormAsync onSuccess={onClose} /> */}
      </Suspense>
    </Modal>
  )
}
