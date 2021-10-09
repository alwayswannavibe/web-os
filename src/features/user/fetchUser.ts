// Libraries
import axios from 'axios';

// Redux
import store from 'src/redux/store';
// eslint-disable-next-line import/no-cycle
import { setUser } from './redux';

export const fetchUser = async () => {
  try {
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/user/me`, {
      timeout: 30000,
      withCredentials: true,
    });
    store.dispatch(setUser(result.data));
    // eslint-disable-next-line no-empty
  } catch (error) {}
};
