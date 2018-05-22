// We can use promises to wrap our asynchronous operations

let randomChance = new Promise((resolve, reject) => {
    // Put our async logic in here
    setTimeout(() => {
        let randomResult = Math.random() * 6;

        if (randomResult > 3) {
            resolve('Greater than 3!');
        } else {
            reject('Less than 3!');
        }
    }, 2000);
});

// Same as before we can access each possible result of the promise, whether
// it fails or is successful
randomChance.then((success) => {
    console.log('Our successful result is: ', success);
}).catch((error) => {
    console.log('Our error is: ', error);
});
