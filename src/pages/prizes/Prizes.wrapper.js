import { connect } from 'react-redux';

import Prizes from './Prizes';

const mapStateToProps = (state) => ({
  categories: state.categories,
  prizes: state.prizes,
});

export default connect(
  mapStateToProps,
  null,
)(Prizes);
