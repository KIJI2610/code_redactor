const run = document.getElementById('run')
const code = document.getElementById('code')

run.addEventListener('click', () => {
    axios.post('http://localhost:3000/run', code.value, {headers:{
        'Content-Type':'text/plain'
    }})
})