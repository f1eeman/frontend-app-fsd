import axios from 'axios'
import type { AsyncThunkAction } from '@reduxjs/toolkit'
import type { AxiosStatic } from 'axios'
import type { ThunkConfig } from '@/app/store'

type ActionCreatorType<Return, Arg, RejectedValue> = (
  arg: Arg,
) => AsyncThunkAction<Return, Arg, ThunkConfig<RejectedValue>>

jest.mock('axios')
const mockedAxios = jest.mocked(axios)

export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>

  getState: () => any

  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>
  nav: jest.MockedFn<any>
  api: jest.MockedFunctionDeep<AxiosStatic>

  constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
    this.actionCreator = actionCreator
    this.dispatch = jest.fn()
    this.getState = jest.fn()
    this.nav = jest.fn()
    this.api = mockedAxios
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg)
    const result = await action(this.dispatch, this.getState, {
      api: this.api,
      nav: this.nav,
    })

    return result
  }
}
