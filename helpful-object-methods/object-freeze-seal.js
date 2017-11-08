var cat = {
  metric: {
    height: '30cm',
  },
  length: '59cm',
  type: 'tabby'
};

Object.freeze(cat);
// only shallow

cat.metric.height = '20cm';
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
