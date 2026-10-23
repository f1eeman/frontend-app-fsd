import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { generatePath } from 'react-router'
import {
  getUserAuthData,
  getUserIsAdmin,
  getUserIsManager,
  userActions,
} from '@/entities/user'
import { routesPaths } from '@/shared/config/routes'
import { Avatar } from '@/shared/ui/avatar/Avatar'
import { Dropdown } from '@/shared/ui/popups'

export const AvatarDropdown = memo(() => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isAdmin = useSelector(getUserIsAdmin)
  const isManager = useSelector(getUserIsManager)
  const authData = useSelector(getUserAuthData)

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  const isAdminPanelAvailable = isAdmin || isManager

  if (!authData) {
    return null
  }

  return (
    <Dropdown
      direction='bottom left'
      items={[
        {
          content: t('Профиль'),
          href: generatePath(routesPaths.profile.path, { id: authData.id }),
        },
        ...(isAdminPanelAvailable
          ? [
              {
                content: t('Админка'),
                href: routesPaths.admin_panel.path,
              },
            ]
          : []),
        {
          content: t('Выйти'),
          onClick: onLogout,
        },
      ]}
      trigger={<Avatar fallbackInverted size={30} src={authData.avatar} />}
    />
  )
})

AvatarDropdown.displayName = 'AvatarDropdown Component'
