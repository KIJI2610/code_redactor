const run = document.getElementById('run')
const code = document.getElementById('code')
const elementConsole = document.getElementById('console')
const stop = document.getElementById('stop')

const sandbox = {
    console: {
        log: (...args) => {
            const output = args.map(arg => String(arg)).join(' ')
            elementConsole.textContent += `${output}\n`
        }        
    },
    
    setInterval: window.setInterval.bind(window),
    clearInterval: window.clearInterval.bind(window),
    setTimeout: window.setTimeout.bind(window)
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
        elementConsole.textContent = `Error: ${error.message}`
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

let previosCharBracket = false

code.addEventListener('input', (e) => {
    const currentVal = e.target.value;
    const lastChar = currentVal[currentVal.length - 1];
    const start = code.selectionStart;
    const end = code.selectionEnd;

    if (lastChar === `'` || lastChar === '"' || lastChar === '`') {
        e.target.value = currentVal.slice(0, -1) + lastChar + lastChar;
        code.selectionStart = start;
        code.selectionEnd = end;
        previosCharBracket = true
    }
    else if (currentVal[start - 1] === '{') {
        e.target.value = currentVal.slice(0, start - 1) + '{}' + currentVal.slice(start);
        code.selectionStart = start;
        code.selectionEnd = end;
        previosCharBracket = true
    }
    else if (currentVal[start - 1] === '(') {
        e.target.value = currentVal.slice(0, start - 1) + '()' + currentVal.slice(start);
        code.selectionStart = start;
        code.selectionEnd = end;
        previosCharBracket = true
    }
    else if (currentVal[start - 1] === '[') {
        e.target.value = currentVal.slice(0, start - 1) + '[]' + currentVal.slice(start);
        code.selectionStart = start;
        code.selectionEnd = end;
        previosCharBracket = true
    }
    else{
        previosCharBracket = false
    }

    console.log(previosCharBracket)
});

code.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && previosCharBracket === true) {
        const currentVal = e.target.value;
        const selectionStart = e.target.selectionStart;
        const previosChar = currentVal[selectionStart - 1];
        const nextChar = currentVal[selectionStart];
        if(previosChar === '{' && nextChar === '}' || previosChar === '(' && nextChar === ')' || previosChar === '[' && nextChar === ']'){
            const newValue = currentVal.slice(0, selectionStart) + '\n' + currentVal.slice(selectionStart);
            e.target.value = newValue;
            e.target.selectionStart = selectionStart;
            e.target.selectionEnd = selectionStart;
            
        }
    }
});


