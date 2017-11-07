var cat = {
  height: {
    metric: '50cm'
  },
  length: '59cm',
  type: 'tabby'
};

Object.freeze(cat);

cat.height.metric = '20cm';
cat;

var dog = {
  height: '50cm',
  length: '90cm',
  type: 'retriever'
};

Object.seal(dog);

dog.height = '76cm';
dog.owner = 'Alex';
dog;
