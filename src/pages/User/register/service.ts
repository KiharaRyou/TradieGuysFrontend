import request from 'umi-request';
import type { UserRegisterParams } from './index';

export async function Register(params: UserRegisterParams) {
  return request('/api/users/register/', {
    method: 'POST',
    data: params,
  });
}
