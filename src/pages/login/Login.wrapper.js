import { connect } from 'react-redux';

import { setUserInfo } from '../../redux/modules/userInfo';
import { setCategories } from '../../redux/modules/categories';
import { setPrizes } from '../../redux/modules/prizes';
import { setUserPrizes } from '../../redux/modules/userPrizes';

import Login from './Login';

const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (userInfo) => {
    dispatch(setUserInfo(userInfo));
  },
  setCategories: (categories) => {
    dispatch(setCategories(categories.reduce((acc, cat) => {
      acc[cat.id] = cat.attributes;
      return acc;
    }, {})))
  },
  setPrizes: (prizes) => {
    dispatch(setPrizes(prizes.reduce((acc, prize) => {
      acc[prize.id] = prize.attributes;
      return acc;
    }, {})))
  },
  setUserPrizes: (prizes) => {
    dispatch(setUserPrizes(prizes.reduce((acc, prize) => {
      acc[prize.id] = prize.attributes;
      return acc;
    }, {})))
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
