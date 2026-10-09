import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ValidateProfileError } from '../../model/types/profile'
import { EditableProfileCard } from './EditableProfileCard'
import { Country } from '@/entities/country'
import { Currency } from '@/entities/currency'
import { $api } from '@/shared/api/api'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'
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

const createState = (state: Partial<ProfileSchema> = {}): ProfileSchema => ({
  data: profile,
  form: profile,
  isLoading: false,
  error: null,
  readonly: true,
  validateErrors: [],
  ...state,
})

const renderCard = (state?: Partial<ProfileSchema>) => {
  const user = userEvent.setup()
  componentRender(<EditableProfileCard id='1' />, {
    initialState: { profile: createState(state) },
  })
  return user
}

describe('EditableProfileCard', () => {
  let getSpy: jest.SpyInstance

  beforeEach(() => {
    getSpy = jest.spyOn($api, 'get').mockResolvedValue({ data: profile })
  })

  afterEach(() => {
    getSpy.mockRestore()
  })

  test('загружает профиль по id и заполняет форму', async () => {
    renderCard({ data: null, form: null })

    expect(
      await screen.findByTestId('ProfileCard.Input.Firstname'),
    ).toHaveValue('John')
    expect(screen.getByTestId('ProfileCard.Input.Lastname')).toHaveValue('Doe')
    expect(screen.getByTestId('ProfileCard.Input.Age')).toHaveValue(30)
    expect(screen.getByTestId('ProfileCard.Input.City')).toHaveValue('Almaty')
    expect(screen.getByTestId('ProfileCard.Input.Username')).toHaveValue(
      'johndoe',
    )
    expect(getSpy).toHaveBeenCalledWith(
      '/profile/1',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    )
  })

  test('в режиме просмотра ввести текст в поля нельзя', async () => {
    const user = renderCard({ readonly: true })

    const firstname = await screen.findByTestId('ProfileCard.Input.Firstname')
    const lastname = screen.getByTestId('ProfileCard.Input.Lastname')

    await user.type(firstname, 'Jane')
    await user.type(lastname, 'Smith')

    expect(firstname).toHaveValue('John')
    expect(lastname).toHaveValue('Doe')
  })

  test('в режиме редактирования ввод попадает в форму', async () => {
    const user = renderCard({ readonly: false })

    const firstname = await screen.findByTestId('ProfileCard.Input.Firstname')
    const lastname = screen.getByTestId('ProfileCard.Input.Lastname')

    await user.clear(firstname)
    await user.type(firstname, 'Jane')
    await user.clear(lastname)
    await user.type(lastname, 'Smith')

    expect(firstname).toHaveValue('Jane')
    expect(lastname).toHaveValue('Smith')
  })

  test('показывает ошибки валидации', async () => {
    renderCard({
      validateErrors: [
        ValidateProfileError.INCORRECT_USER_DATA,
        ValidateProfileError.INCORRECT_AGE,
      ],
    })

    const errors = await screen.findAllByTestId(
      'EditableProfileCard.Error.Paragraph',
    )
    expect(errors.map((error) => error.textContent)).toEqual([
      'Имя и фамилия обязательны',
      'Некорректный возраст',
    ])
  })

  test('показывает ошибку, если профиль не загрузился', async () => {
    getSpy.mockRejectedValue(new Error('Network Error'))

    renderCard({ data: null, form: null })

    expect(
      await screen.findByText('Произошла ошибка при загрузке профиля'),
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('ProfileCard.Input.Firstname'),
    ).not.toBeInTheDocument()
  })
})
