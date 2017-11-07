var users = {
  john: {
    age: 38,
    about: 'Likes long walks on the beach'
  },
  jane: {
    age: 34,
    about: 'Likes painting on the beach'
  },
  robert: {
    age: 28,
    about: 'Likes to ride motorcycles'
  },
  suzy: {
    age: 27,
    about: 'Likes to go skydiving'
  }
};

var profiles = Object.entries(users).map(entry => {
  return entry;
});

profiles;
