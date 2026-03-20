import axios from 'axios'
import type { AsyncThunk, AsyncThunkAction } from '@reduxjs/toolkit'
import type { AxiosStatic } from 'axios'
import type { RootState, ThunkConfig } from '@/app/store'
import type { DeepPartial } from '@/shared/types'

jest.mock('axios')
const mockedAxios = jest.mocked(axios)

export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>

  getState: () => RootState

  actionCreator: AsyncThunk<Return, Arg, ThunkConfig<RejectedValue>>
  nav: jest.MockedFn<any>
  api: jest.MockedFunctionDeep<AxiosStatic>

  constructor(
    actionCreator: AsyncThunk<Return, Arg, ThunkConfig<RejectedValue>>,
    state?: DeepPartial<RootState>,
  ) {
    this.actionCreator = actionCreator
    this.dispatch = jest.fn()
    this.getState = jest.fn(() => state as RootState)

    this.nav = jest.fn()
    this.api = mockedAxios
  }

  async callThunk(...args: Arg extends void ? [] : [Arg]) {
    const action =
      args.length === 0
        ? (
            this.actionCreator as () => AsyncThunkAction<
              Return,
              Arg,
              ThunkConfig<RejectedValue>
            >
          )()
        : (
            this.actionCreator as (
              arg: Arg,
            ) => AsyncThunkAction<Return, Arg, ThunkConfig<RejectedValue>>
          )(args[0])
    const result = await action(this.dispatch, this.getState, {
      api: this.api,
      nav: this.nav,
    })

    return result
  }
}
