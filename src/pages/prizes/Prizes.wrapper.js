import { connect } from 'react-redux';

import Prizes from './Prizes';
import { setPrizes } from '../../redux/modules/prizes';
import { setUserInfo } from '../../redux/modules/userInfo';
import { setUserPrizes } from '../../redux/modules/userPrizes';
import { refresh } from '../../components/headerRight';
import { setCategories } from '../../redux/modules/categories';

const mapStateToProps = (state) => ({
  categories: state.categories,
  prizes: Object.values(state.prizes),
  ticketsRemaining: state.userInfo.ticketsRemaining,
  userPrizes: Object.values(state.userPrizes).filter(
    (prize) => prize && prize.committedTickets > 0,
  ),
});

const mapDispatchToProps = (dispatch) => ({
  refresh: () =>
    refresh({
      setCategories: (categories) => {
        dispatch(
          setCategories(
            categories.reduce((acc, cat) => {
              acc[cat.id] = cat.attributes;
              return acc;
            }, {}),
          ),
        );
      },
      setPrizes: (prizes) => {
        dispatch(
          setPrizes(
            prizes.reduce((acc, prize) => {
              acc[prize.id] = prize.attributes;
              return acc;
            }, {}),
          ),
        );
      },
      setUserInfo: (userInfo) => {
        dispatch(setUserInfo(userInfo));
      },
      setUserPrizes: (prizes) => {
        dispatch(
          setUserPrizes(
            prizes.reduce((acc, prize) => {
              acc[prize.id] = prize.attributes;
              return acc;
            }, {}),
          ),
        );
      },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Prizes);
