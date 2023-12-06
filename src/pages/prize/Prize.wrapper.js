import { connect } from 'react-redux';

import { updateTicketCount } from '../../redux/modules/prizes';
import { updateUserTicketCount } from '../../redux/modules/userInfo';
import { updateUserPrizes } from '../../redux/modules/userPrizes';

import Prize from './Prize';

const mapStateToProps = (state, props) => ({
  categories: state.categories,
  prize: state.prizes[props.id],
  userPrize: state.userPrizes[props.id] || {},
  userInfo: state.userInfo,
  selectedGift: state.userPrizes && state.userPrizes.me,
});

const mapDispatchToProps = (dispatch) => ({
  updateTicketCount: (id, count) => dispatch(updateTicketCount(id, count)),
  updateUserTicketCount: (count) => dispatch(updateUserTicketCount(count)),
  updateUserPrizes: (prize) =>
    dispatch(updateUserPrizes({ [prize.id]: prize.committedTickets <= 0 ? undefined : prize })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Prize);
