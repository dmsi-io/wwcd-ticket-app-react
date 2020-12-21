import { connect } from 'react-redux';

import Header from './Header';

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  selectedGift: state.userPrizes && state.userPrizes.me,
});

export default connect(
  mapStateToProps,
  null,
)(Header);
