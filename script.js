const strategies = {
    qq3x3: {
        unit: 0.333333,
        steps: [
            {
                label: '左1',
                size: 2,
                offset: [0, 0]
            },
            {
                label: '右1',
                size: 1,
                offset: [2, 0]
            },
            {
                label: '右2',
                size: 1,
                offset: [2, 1]
            },
            {
                label: '左2',
                size: 1,
                offset: [0, 2]
            },
            {
                label: '中1',
                size: 1,
                offset: [1, 2]
            },
            {
                label: '右3',
                size: 1,
                offset: [2, 2]
            },
            {
                label: '左3',
                size: 1,
                offset: [0, 3]
            },
            {
                label: '中2',
                size: 1,
                offset: [1, 3]
            },
            {
                label: '右4',
                size: 1,
                offset: [2, 3]
            }
        ]
    },
    normal3x3: {
        unit: 0.333333,
        steps: [
            {
                label: '左1',
                size: 1,
                offset: [0, 0]
            },
            {
                label: '中1',
                size: 1,
                offset: [1, 0]
            },
            {
                label: '右1',
                size: 1,
                offset: [2, 0]
            },
            {
                label: '左2',
                size: 1,
                offset: [0, 1]
            },
            {
                label: '中2',
                size: 1,
                offset: [1, 1]
            },
            {
                label: '右2',
                size: 1,
                offset: [2, 1]
            },
            {
                label: '左3',
                size: 1,
                offset: [0, 2]
            },
            {
                label: '中3',
                size: 1,
                offset: [1, 2]
            },
            {
                label: '右3',
                size: 1,
                offset: [2, 2]
            }
        ]
    },
    normal2x2: {
        unit: 0.5,
        steps: [
            {
                label: '左1',
                size: 1,
                offset: [0, 0]
            },
            {
                label: '右1',
                size: 1,
                offset: [1, 0]
            },
            {
                label: '左2',
                size: 1,
                offset: [0, 1]
            },
            {
                label: '右2',
                size: 1,
                offset: [1, 1]
            }
        ]
    }
}

/**
 * Reads the file to an image.
 * @param {File} file 
 * @return {Promise<HTMLImageElement>}
 */
function readAsImage(file) {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.onload = () => {
            const image = new Image()
            image.src = reader.result
            image.onload = () => {
                resolve(image)
            }
        }
        reader.readAsDataURL(file)
    })
}

/**
 * Creates a context and append it to the container.
 * @param {string} label the label for the canvas.
 * @param {number} size the size for width and height.
 * @return {CanvasRenderingContext2D} the context.
 */
function createCanvasCtx(label, size) {
    const canvas = document.createElement('canvas')
    const container = document.createElement('div')
    const download = document.createElement('button')
    download.innerText = '下载'
    download.onclick = () => {
        const a = document.createElement('a')
        a.download = label
        a.href = canvas.toDataURL('image/png')
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
    }
    container.className = 'canvas-container'
    container.appendChild(document.createTextNode(label))
    container.appendChild(canvas)
    container.appendChild(download)
    document.getElementById('canvas-list').appendChild(container)
    canvas.width = size
    canvas.height = size
    return canvas.getContext('2d')
}

async function handleImage() {
    const uploader = document.getElementById('uploader')
    const file = uploader.files[0]
    if (!/^image\//.test(file.type)) {
        alert('你选择的文件不是图片')
        return
    }
    document.getElementById('canvas-list').innerHTML = ''
    const image = await readAsImage(file)
    const scale = image.width / image.height
    document.getElementById('scale').innerText = scale.toFixed(2)
    
    console.log(document.getElementById('strategy').value)
    const strategy = strategies[document.getElementById('strategy').value]
    const unit = image.width * strategy.unit
    for (const step of strategy.steps) {
        const { label, size } = step
        const [ offsetX, offsetY ] = step.offset
        const ctx = createCanvasCtx(label, unit * size)
        ctx.drawImage(image, unit * offsetX, unit * offsetY, unit * size, unit * size, 0, 0, unit * size, unit * size)
    }
}

function handleSelect() {
    document.getElementById('canvas-list').innerHTML = ''
    document.getElementById('uploader').value = ''
}