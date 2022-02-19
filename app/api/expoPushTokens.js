import client from './client';

const register = (pushToken) =>
  client.post('/expoNotificationToken', { token: pushToken });

export default { register };
