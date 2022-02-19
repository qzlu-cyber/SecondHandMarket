import client from './client';

const getMessagesList = () => client.get('/chatMessages/messagesList');

const readMessage = (to) => client.post('/chatMessages/readMessage', {
  to
});

const deleteMessages = (id) => client.delete(`/chatMessages/deleteMessages${id}`);

export default {
  getMessagesList,
  readMessage,
  deleteMessages
}