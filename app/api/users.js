import client from './client';

const register = (userInfo) => client.post('/users', userInfo);

const getUser = (id) => client.get(`/users/${id}`);

const update = (id, userInfo) => client.put(`/users/editInfo/${id}`, {
  prePassword: userInfo.prePassword,
  password: userInfo.password
})

export default {
  register,
  getUser,
  update,
};