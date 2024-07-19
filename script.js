const run = document.getElementById('run')
const code = document.getElementById('code')
const consoleElement = document.getElementById('console')
const stop = document.getElementById('stop')

const sandbox = {
    console: {
        log: (...args) => {
            const output = args.map(arg => String(arg)).join(' ')
            consoleElement.textContent += `${output}\n`
        }
    }
}

const restrictedContext = new Proxy(sandbox, {
    has: () => true, 
    get: (target, key) => {
        if (key in target) {
            return target[key]
        }
        return undefined
    }
})

run.addEventListener('click', () => {
    try {
        const func = new Function('sandbox', `with (sandbox) { ${code.value} }`)
        func(restrictedContext)
    } catch (error) {
        consoleElement.textContent = `Error: ${error.message}`
    }
})

code.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault()
        const start = code.selectionStart
        const end = code.selectionEnd
        const value = code.value
        code.value = value.substring(0, start) + '\t' + value.substring(end)
        code.selectionStart = code.selectionEnd = start + 1
    }
})

code.addEventListener('input', (e) => {
    const currentVal = e.target.value;
    const lastChar = currentVal[currentVal.length - 1];
    const start = code.selectionStart;
    const end = code.selectionEnd;

    if (lastChar === `'` || lastChar === '"' || lastChar === '`') {
        e.target.value = currentVal.slice(0, -1) + lastChar + lastChar;
        code.selectionStart = start;
        code.selectionEnd = end;
    } else if (lastChar === '{') {
        e.target.value += '}'
        code.selectionStart -= 1
        code.selectionEnd -= 1
    }
});

// consoleElement.addEventListener('keydown', (e) => {
//     if(e.key === 'Enter'){
//         e.preventDefault()
//         const lenConsole = consoleElement.value.length
        
//     }
// })