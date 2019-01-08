import { connect } from 'react-redux';

import Prizes from './Prizes';

const mapStateToProps = (state) => ({
  categories: state.categories,
  prizes: state.prizes,
  userPrizes: state.userPrizes,
});

export default connect(
  mapStateToProps,
  null,
)(Prizes);
