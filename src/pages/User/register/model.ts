import type { Effect, Reducer } from 'umi';

import { Register } from './service';

export interface Reasons {
  username?: Array<string>,
  email?: Array<string>,
  password?: Array<string>,
}

export interface StateType {
  status?: 'OK' | 'Error';
  //currentAuthority?: 'user' | 'guest' | 'admin';
  reasons?: Reasons
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submit: Effect;
  };
  reducers: {
    registerHandle: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userAndregister',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(Register, payload);
      console.log(response)
      return response;
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};

export default Model;
