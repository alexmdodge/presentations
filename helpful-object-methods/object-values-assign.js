var results;

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

var janesSearch = Object.assign({}, users);
delete janesSearch.jane;

var matches = Object.values(janesSearch).filter(user => user.age < 35);
matches;

matches[0].age = 30;
users;
