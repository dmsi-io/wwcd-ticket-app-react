import api from './api';
import { updateTicketCount } from '../redux/modules/prizes';

export default (store) => {
  setTimeout(checkPollReady, 0);

  async function checkPollReady() {
    // TODO: Replace with a dedicated polling route when created
    // This will eliminate unnecessary redux dispatches
    const prizes = await api.get('/prizes')
      .then(([err, { data }]) => data);

    prizes.forEach((prize) => {
      store.dispatch(updateTicketCount(prize.id, prize.attributes.committedTickets));
    });
    console.info(`Updated ticket counts at ${Number(new Date())}`);

    setTimeout(checkPollReady, 30000);
  }
}