const run = document.getElementById('run');
const code = document.getElementById('code');
const consoleElement = document.getElementById('console');

run.addEventListener('click', () => {
    axios.post('http://localhost:3000/run', code.value, {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
    .then(response => {
        consoleElement.value = response.data;
    })
    .catch(error => {
        consoleElement.value = `Error: ${error.message}`;
    });
});
