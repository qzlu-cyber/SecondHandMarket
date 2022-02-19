import client from './client';

const send = (message, listingId, name, avatar) =>
  client.post('/message', {
    message,
    listingId,
    name,
    avatar
  });

const getMessages = () => client.get('/message');

export default {
  send,
  getMessages,
};