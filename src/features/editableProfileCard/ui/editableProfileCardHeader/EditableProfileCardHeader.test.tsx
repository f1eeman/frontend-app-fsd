import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditableProfileCard } from '../editableProfileCard/EditableProfileCard'
import { EditableProfileCardHeader } from './EditableProfileCardHeader'
import { Country } from '@/entities/country'
import { Currency } from '@/entities/currency'
import { userRole } from '@/entities/user'
import { $api } from '@/shared/api/api'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'
import type { UserEvent } from '@testing-library/user-event'
import type { Profile, ProfileSchema } from '../../model/types/profile'

const profile: Profile = {
  id: '1',
  first: 'John',
  lastname: 'Doe',
  age: 30,
  currency: Currency.USD,
  country: Country.Kazakhstan,
  city: 'Almaty',
  username: 'johndoe',
}

const profileState: ProfileSchema = {
  data: profile,
  form: profile,
  isLoading: false,
  error: null,
  readonly: true,
  validateErrors: [],
}

const renderProfile = async (authDataId = '1') => {
  const user = userEvent.setup()
  componentRender(
    <>
      <EditableProfileCardHeader />
      <EditableProfileCard id='1' />
    </>,
    {
      initialState: {
        user: {
          authData: {
            id: authDataId,
            username: 'johndoe',
            role: userRole.USER,
          },
          _inited: true,
        },
        profile: profileState,
      },
    },
  )
  await screen.findByTestId('ProfileCard.Input.Firstname')
  return user
}

const startEditing = (user: UserEvent) =>
  user.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

describe('EditableProfileCardHeader', () => {
  let getSpy: jest.SpyInstance
  let putSpy: jest.SpyInstance

  beforeEach(() => {
    getSpy = jest.spyOn($api, 'get').mockResolvedValue({ data: profile })
    putSpy = jest
      .spyOn($api, 'put')
      .mockImplementation((_url: string, data: unknown) =>
        Promise.resolve({ data }),
      )
  })

  afterEach(() => {
    getSpy.mockRestore()
    putSpy.mockRestore()
  })

  test('на чужом профиле кнопок нет', async () => {
    await renderProfile('2')

    expect(await screen.findByText('Профиль')).toBeInTheDocument()
    expect(
      screen.queryByTestId('EditableProfileCardHeader.EditButton'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('EditableProfileCardHeader.SaveButton'),
    ).not.toBeInTheDocument()
  })

  test('на своём профиле в режиме просмотра есть только «Редактировать»', async () => {
    await renderProfile()

    expect(
      await screen.findByTestId('EditableProfileCardHeader.EditButton'),
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('EditableProfileCardHeader.CancelButton'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('EditableProfileCardHeader.SaveButton'),
    ).not.toBeInTheDocument()
  })

  test('«Редактировать» включает режим редактирования', async () => {
    const user = await renderProfile()

    await startEditing(user)

    expect(
      screen.getByTestId('EditableProfileCardHeader.CancelButton'),
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('EditableProfileCardHeader.SaveButton'),
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('EditableProfileCardHeader.EditButton'),
    ).not.toBeInTheDocument()

    const firstname = screen.getByTestId('ProfileCard.Input.Firstname')
    await user.clear(firstname)
    await user.type(firstname, 'Jane')

    expect(firstname).toHaveValue('Jane')
  })

  test('«Отменить» возвращает исходные данные и режим просмотра', async () => {
    const user = await renderProfile()
    await startEditing(user)

    const firstname = screen.getByTestId('ProfileCard.Input.Firstname')
    await user.clear(firstname)
    await user.type(firstname, 'Jane')
    expect(firstname).toHaveValue('Jane')

    await user.click(
      screen.getByTestId('EditableProfileCardHeader.CancelButton'),
    )

    expect(firstname).toHaveValue('John')
    expect(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    ).toBeInTheDocument()

    await user.type(firstname, 'Jane')

    expect(firstname).toHaveValue('John')
  })

  test('«Сохранить» отправляет форму на сервер и выключает редактирование', async () => {
    const user = await renderProfile()
    await startEditing(user)

    const firstname = screen.getByTestId('ProfileCard.Input.Firstname')
    await user.clear(firstname)
    await user.type(firstname, 'Jane')
    await user.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

    expect(
      await screen.findByTestId('EditableProfileCardHeader.EditButton'),
    ).toBeInTheDocument()
    expect(putSpy).toHaveBeenCalledWith('/profile/1', {
      ...profile,
      first: 'Jane',
    })
    expect(screen.getByTestId('ProfileCard.Input.Firstname')).toHaveValue(
      'Jane',
    )
  })

  test('при ошибке валидации не сохраняет и остаётся в редактировании', async () => {
    const user = await renderProfile()
    await startEditing(user)

    await user.clear(screen.getByTestId('ProfileCard.Input.Firstname'))
    await user.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

    expect(
      await screen.findByTestId('EditableProfileCard.Error.Paragraph'),
    ).toHaveTextContent('Имя и фамилия обязательны')
    expect(
      screen.getByTestId('EditableProfileCardHeader.SaveButton'),
    ).toBeInTheDocument()
    expect(putSpy).not.toHaveBeenCalled()
  })

  test('«Отменить» стирает ошибки валидации', async () => {
    const user = await renderProfile()
    await startEditing(user)

    await user.clear(screen.getByTestId('ProfileCard.Input.Firstname'))
    await user.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

    expect(
      await screen.findByTestId('EditableProfileCard.Error.Paragraph'),
    ).toBeInTheDocument()

    await user.click(
      screen.getByTestId('EditableProfileCardHeader.CancelButton'),
    )

    expect(
      screen.queryByTestId('EditableProfileCard.Error.Paragraph'),
    ).not.toBeInTheDocument()
    expect(screen.getByTestId('ProfileCard.Input.Firstname')).toHaveValue(
      'John',
    )
  })
})
