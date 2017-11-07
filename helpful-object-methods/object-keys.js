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

var profiles = Object.keys(users).map(key => {
  var profile = document.createElement('div');
  profile.dataset.username = key;

  var age = document.createElement('span');
  age.innerHTML = users[key].age;

  var about = document.createElement('span');
  about.innerHTML = users[key].about;

  profile.appendChild(age);
  profile.appendChild(about);

  return profile;
});

profiles;
