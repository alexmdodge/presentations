var filterBtn = document.querySelector('.filter-btn');

filterBtn.addEventListener('click', function(event) {
    filterWorker.postMessage({
        clients: [
            {
                name: 'Alex',

            }
        ]
    });
    console.log('Message posted to worker');
});