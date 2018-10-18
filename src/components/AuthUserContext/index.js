import React from 'react';

const AuthUserContext = React.createContext(null);

export default AuthUserContext;


// Once you use this Provider component, the value which you have passed 
// to it becomes available to all components below the App component where
// the higher order component is used.