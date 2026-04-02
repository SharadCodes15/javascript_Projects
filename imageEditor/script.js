const filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%',
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%',
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%',
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 200,
        unit: '%',
    },
    sepia: {
        value: 0,
        min: 0,
        max: 200,
        unit: '%',
    },
    blur: {
        value: 0,
        min: 0,
        max: 200,
        unit: 'px',
    },
    opacity: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%',
    },
}
const filterdiv = document.querySelector('.filters');
const imageCanvas = document.querySelector('#img-canvas');
const imgInp = document.querySelector('#fileInput');
const noimg = document.querySelector('.placeholder');
const resetBtn = document.querySelector('#reset-btn');
const ctx = imageCanvas.getContext('2d');
const downloadBtn = document.querySelector('#download-btn');

let file = null;
let image = null;

function createfilterElement(name,unit='%',value,min=0,max=200){
    const div = document.createElement('div');
    div.classList.add('filter');
    const input = document.createElement('input');
    input.type = 'range';
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;
    const p = document.createElement('p');
    p.textContent = `${name} ${value}${unit}`; 

    
    input.addEventListener('input', () => {
        filters[name].value = input.value;
        p.textContent = `${name} ${input.value}${unit}`;
        applyFilters();
        // filters.blur.value = input.value;
        // p.textContent = `blur ${input.value}px`;
        // applyBlur();
    });

    div.appendChild(input);
    div.appendChild(p);
    return div;
}

function applyFilters() {
    ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    ctx.filter = `brightness(${filters.brightness.value}%) contrast(${filters.contrast.value}%) saturate(${filters.saturation.value}%) grayscale(${filters.grayscale.value}%) sepia(${filters.sepia.value}%) blur(${filters.blur.value}px) opacity(${filters.opacity.value}%)`;
    ctx.drawImage(image, 0, 0);
}


imgInp.addEventListener('change', (e) => {
    const file = e.target.files[0];
    imageCanvas.style.display = 'block';
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        noimg.remove();

    }
});


function applyBlur(){
    ctx.filter = `blur(20px)`;   
    ctx.drawImage(image, 0, 0);
}

function createfilter(){
    Object.keys(filters).forEach(filterName => {
    const filter = filters[filterName];
    const filterElement = createfilterElement(filterName, filter.unit, filter.value, filter.min, filter.max);
    filterdiv.appendChild(filterElement);
    const input = filterElement.querySelector('input');
    const p = filterElement.querySelector('p');
    input.addEventListener('input', () => {
        filters[filterName].value = input.value;
        p.textContent = `${filterName} ${input.value}${filter.unit}`;
    });
});
}
    createfilter();

resetBtn.addEventListener('click', () => {
    Object.keys(filters).forEach(filterName => {
        const filter = filters[filterName];
        filter.value = 100;
        if(filterName === 'grayscale' || filterName === 'sepia' || filterName === 'blur'){
            filter.value = 0;
        }
        const input = document.getElementById(filterName);
        const p = input.nextElementSibling;
        input.value = filter.value;
        p.textContent = `${filterName} ${filter.value}${filter.unit}`;
    });
    applyFilters();
});


downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = imageCanvas.toDataURL();
    link.click();
});