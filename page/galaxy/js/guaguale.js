document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Fill canvas with gray color
    ctx.fillStyle = '#CCCCCC';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set up mouse events for drawing
    let drawing = false;
    let lastX;
    let lastY;

    canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('mouseup', () => {
        drawing = false;
    });

    function draw(e) {
        if (!drawing) return;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 40;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
});
