import setService from '@/common/setService';

export const actionGetUsers = setService('get', '/api/users');
export const actionCreateUser = setService('post', '/api/users');
export const actionDelUser = (id: number) => setService('post', '/api/users/' + id);
