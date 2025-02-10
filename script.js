// DOM Elements
const redSlider = document.getElementById('red');
const greenSlider = document.getElementById('green');
const blueSlider = document.getElementById('blue');

const redInput = document.getElementById('redInput');
const greenInput = document.getElementById('greenInput');
const blueInput = document.getElementById('blueInput');

const colorPicker = document.getElementById('colorPicker');

// Convert RGB to HEX
function rgbToHex(r, g, b) {
    return (
        '#' +
        [r, g, b]
            .map(x => x.toString(16).padStart(2, '0'))
            .join('')
    );
}

// Convert HEX to RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

// Update all elements
function updateAll(r, g, b) {
    redSlider.value = r;
    greenSlider.value = g;
    blueSlider.value = b;

    redInput.value = r;
    greenInput.value = g;
    blueInput.value = b;

    colorPicker.value = rgbToHex(r, g, b);

    // Dynamic slider backgrounds
    redSlider.style.background = `linear-gradient(to right, black, rgb(${r},0,0))`;
    greenSlider.style.background = `linear-gradient(to right, black, rgb(0,${g},0))`;
    blueSlider.style.background = `linear-gradient(to right, black, rgb(0,0,${b}))`;
}

// Handle slider input
function handleInputChange() {
    const r = parseInt(redSlider.value);
    const g = parseInt(greenSlider.value);
    const b = parseInt(blueSlider.value);
    updateAll(r, g, b);
}

// Handle number input
function handleNumberInput(slider, input) {
    let value = Math.max(0, Math.min(255, parseInt(input.value) || 0));
    slider.value = value;
    handleInputChange();
}

// Event Listeners
[redSlider, greenSlider, blueSlider].forEach(slider =>
    slider.addEventListener('input', handleInputChange)
);

redInput.addEventListener('input', () => handleNumberInput(redSlider, redInput));
greenInput.addEventListener('input', () => handleNumberInput(greenSlider, greenInput));
blueInput.addEventListener('input', () => handleNumberInput(blueSlider, blueInput));

colorPicker.addEventListener('input', () => {
    const { r, g, b } = hexToRgb(colorPicker.value);
    updateAll(r, g, b);
});

// Initial setup
updateAll(128, 128, 128);
