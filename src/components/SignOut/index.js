import React from 'react';

import { auth } from '../../firebase';

const LogoutButton = () =>
  <button
    type="button"
    onClick={auth.doSignOut}
  >
    Sign Out
  </button>

export default LogoutButton;
