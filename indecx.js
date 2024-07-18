function openProject(url) {
    window.open(url, '_blank');
}

// Function to change background and text colors smoothly
function changeColorsSmoothly() {
    const currentBgColor1 = getComputedStyle(document.body).getPropertyValue('--bg-color1');
    const currentBgColor2 = getComputedStyle(document.body).getPropertyValue('--bg-color2');
    const currentTextColor1 = getComputedStyle(document.body).getPropertyValue('--text-color1');
    const currentTextColor2 = getComputedStyle(document.body).getPropertyValue('--text-color2');

    const newBgColor1 = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const newBgColor2 = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const newTextColor1 = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const newTextColor2 = '#' + Math.floor(Math.random() * 16777215).toString(16);

    // Smooth transition for background colors
    document.body.style.setProperty('--bg-color1', newBgColor1);
    document.body.style.setProperty('--bg-color2', newBgColor2);

    // Smooth transition for text colors
    document.body.style.setProperty('--text-color1', newTextColor1);
    document.body.style.setProperty('--text-color2', newTextColor2);

    // Schedule next transition
    setTimeout(changeColorsSmoothly, 5000); // Change colors every 5 seconds
}

// Initiate the smooth color changing process
changeColorsSmoothly();