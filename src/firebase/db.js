import { db } from './firebase';


// User API
export const doCreateUser = (id, username, email, avatar) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    avatar,
  });
// The user is created as an object with the username and email properties. 
// Furthermore, it is stored on the users/${id} resource path.
// Whenever you would want to retrieve a specific user from the Firebase database, 
// you could get the one user via its unique identifier and the entity resource path.

export const onceGetUsers = () =>
  db.ref('users').once('value');
// The users are retrieved from the general user’s entity resource path. The 
// function will return all users from the Firebase realtime database.

export const doCreateTicket = (desc, amount, author, users, timestamp) =>
  db.ref(`tickets/`).push({  // push GENERATES AUTOMATICALLY AN UNIQUE ID
    desc,
    amount,
    author,
    users,
    timestamp
  });