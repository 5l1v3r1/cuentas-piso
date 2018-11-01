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
  db.ref('tickets/').push({  // push GENERATES AUTOMATICALLY AN UNIQUE ID
    desc,
    amount,
    author,
    users,
    timestamp
  });

export const onceGetAuthorTickets = (authorID) =>
  db.ref('tickets/').orderByChild('author/').equalTo(authorID).once('value');

export const onceGetOtherTickets = (authorID) =>
  db.ref('tickets/').orderByChild('users').once('value');


// El evento value se usa para leer una instantánea estática del contenido de la ruta de una base de datos, 
// tal como existía cuando se produjo el evento de lectura. Se activa una vez con el estado inicial de los 
// datos y nuevamente cada vez que estos se cambian. La devolución de llamada de evento recibe una instantánea 
// que contiene todos los datos de dicha ubicación, incluidos los datos de campos secundarios.


// limitToFirst() 	Configura la cantidad máxima de elementos que pueden mostrarse desde el comienzo de la lista de resultados ordenada.
// limitToLast() 	Configura la cantidad máxima de elementos que pueden mostrarse desde el final de la lista de resultados ordenada.
// startAt() 	Muestra elementos con un valor igual o superior a la clave o el valor que se especifica según el método de ordenamiento seleccionado.
// endAt() 	Muestra elementos con un valor inferior o igual a la clave o el valor que se especifica según el método de ordenamiento seleccionado.
// equalTo() 	Muestra elementos con un valor igual a la clave o el valor que se especifica según el método de ordenamiento seleccionado.