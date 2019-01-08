import { connect } from 'react-redux';

import Header from './Header';

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

export default connect(
  mapStateToProps,
  null,
)(Header);
