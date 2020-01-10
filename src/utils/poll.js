import qs from 'qs';

import api from './api';
import storage from './storage';
import { updateTicketCount } from '../redux/modules/prizes';

export default (store) => {
  setTimeout(checkPollReady, 0);
  storage.set('lastChecked', new Date());

  async function checkPollReady() {
    if (storage.get('token')) {
      const prizes = await api.get(`/prizes/diff?${qs.stringify({
        since: new Date(storage.get('lastChecked')),
      })}`).then(([err, { data }]) => data);

      storage.set('lastChecked', new Date());

      prizes.forEach((prize) => {
        store.dispatch(updateTicketCount(prize.id, prize.attributes.committedTickets));
      });

      if (prizes.length) {
        console.info(`Updated ticket counts at ${Number(new Date())}`);
      }

      setTimeout(checkPollReady, 30000);
    } else {
      setTimeout(checkPollReady, 30000);
    }
  }
}
