# Presentation Outline
* **Introduction**
  * Outline of the purpose of the presentation what
  reason is behind investigating the difference between
  arrow functions and regular javascript functions
* **ECMAScript Release Process**
  * Most people don't seem to know about the new release
  process and how it will work
  * ECMA is the European CM Association
  * JavaScript in 1994 submitted for standardization
  * ECMAScript is language specification, JavaScript
  is most popular implementation, so ECMA tells the JavaScript
  Engine Engineers (the people who build the things that compile
  our JavaScript code) how that code should be compiled, and what
  should be included in the language
  * ECMAScript 5 came out in ______
  * So that's a difference of some number of years, hence so many
  changes
  * Instead of giant changes every ___ years, there are now yearly
  specification releases, the first ES6 was technically the ES2015
  draft, there have been two since and changes have been much smaller
  * You might worry that the language specification will get ahead of
  the Engines, but they'll catch up because ______
* **Arrow functions introduced in ES2015, some small changes in ES2016/17**
* **So for some context what are they?**
  * An optimization of JavaScript expressions with reduced functionality
* **Function Statement vs Function Expression**
  * The arrow function does not replace this and for good reason
* **How does it differ**
  * The arrow function syntax is much cleaner, and has a couple different
  representations
  * In one way you can call them with brackets and return, or if return is
  implied you can use the shorthand
* At First Glance
  * You will often here people say 'Yeah you don't have to worry about
  the **this** value getting messed up when you use arrow functions
  * So you can happily go about using them and suddenly all of your problems
  are solved!
  * The question is, what is really happening?
* Transpiling vs Compiling
  * Two different things, both work together. The idea of transpiling is not
  to move our high level programming language to low level machine instructions,
  but is instead something moves our javascript code to an older version of the
  language, one in which browsers can understand.
  * Because the changes to JavaScript were so large in ES6 there are still
  many features and browsers which have not implemented the specification
  * Each browser implements it's own compiler based on the specification, which
  is why different features are supported across different browsers
  * When you transpile your JavaScript you are simply writing ES6 but running ES5,
  this means that any performance or native benefits of those features are not
  yet useful to you (other than syntax).
  * The compilers (most of which are now JIT) are what actually implement the features
  and how each compiler implements those is also different (show ES implement map)
* So when you transpile what do you actually get
  * Show the transpiler and how you just get the old syntax
  * Then show the performance examples of running bind vs lexical syntax
* But some browsers do implement the arrow function in full
  * So we can test by looking at the console in one of those browsers
* So how does the arrow function behave differently when natively implemented?
  * From the ECMA specs and the first line of MDN 'does not have this, new.target,
  arguments, or super
  * First off no arguments, show regular function, and before we could just pass
  any extra parameters in and access it through the arguments variables
  * With arrow functions this doesn't work, but we can use the spread operator
  which accepts the rest of the variables (how does rest collect), note that
  for the original function the rest parameters also take over the arguments
  * No this value
    * The this value is determine lexically, but it's actual implementation doesn't
    use the same re-assigning of the this variable as that, it actually has
    a grammar definition and know when it sees and arrow function to maintain the
    lexical scope of the containing object
    * Example of arrow function and passing this context
    * Example of arrow function and view the call stack showing how it maintains context
  * No super
    * because there is no super, the prototype of the object is also incorrect for a
    super reference due to the this context on the object, look at browser and how
    this is not located on the arrow function
  * No new.target
    * You can also imagine that because the arrow function doesn't have it's own this
    context that you can create new objects with in with prototypal inheritance
    * Show how other functions have prototype and how arrow functions do not, show error
    with *new* keyword
* Use Cases
  * The question becomes where do they come in handy?
  * List 3 primary use cases for arrow functions (callbacks, functional, and something else)
  * Link to other use cases with lists of helpful tips
* Performance
  * If you're wondering which is faster. Transpiling obviously is just using functions so
  that's not even a comparison. Natively in browsers here are some standardized tests jsPerf
  (also perform different types of row operations depending on storage)
  * Also show performance comparison in node environment on server side scripts
* Other resources
  * A million questions you could ask as functions are really the entry of javascript and
  form the bases of the entire language structure
  * Links to sources and useful material for other explorations