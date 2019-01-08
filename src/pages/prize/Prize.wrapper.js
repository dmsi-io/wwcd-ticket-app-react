import { connect } from 'react-redux';

import { updateTicketCount } from '../../redux/modules/prizes';
import { updateUserTicketCount } from '../../redux/modules/userInfo';

import Prize from './Prize';

const mapStateToProps = (state, props) => ({
  categories: state.categories,
  prize: state.prizes[props.id],
});

const mapDispatchToProps = (dispatch) => ({
  updateTicketCount: (id, count) => dispatch(updateTicketCount(id, count)),
  updateUserTicketCount: (count) => dispatch(updateUserTicketCount(count)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Prize);
