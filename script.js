function liveClock() {
    let date = new Date()
    document.querySelector("#clock").innerHTML = date.toLocaleTimeString()
}
setInterval(liveClock, 1000)
liveClock()


const button = document.getElementById('toggleButton');
let isFullscreen = false;
let wakeLock = null;
async function toggleFullscreen() {
    if (!isFullscreen) {
        if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
        isFullscreen = true;
        await enableWakeLock();
        button.textContent = 'fullscreen_exit'
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        isFullscreen = false;
        releaseWakeLock();
        button.textContent = 'fullscreen'
    }
}
async function enableWakeLock() {
    try { wakeLock = await navigator.wakeLock.request('screen'); }
    catch (err) { console.error('Wake Lock failed:', err); }
}
function releaseWakeLock() {
    if (wakeLock) {
        wakeLock.release().then(() => console.log('Wake Lock released'));
    }
}
button.addEventListener('click', toggleFullscreen);
document.addEventListener('keydown', (e) => {
    if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
    }
});


const audio = new Audio('./lofi.mp3')
audio.loop = true
document.getElementById('toggleBtn').onclick = () => {
    const btn = document.getElementById('toggleBtn')
    if (audio.paused) {
        audio.play()
        btn.textContent = 'music_note'
    } else {
        audio.pause()
        btn.textContent = 'music_off'
    }
}


let colorIndex = 0
const colors = ['#00f0ff', '#9ffd32', '#f49ae9', '#c493ff', '#f4f5ff']
const shadow = [
    '0 0 15px #00f0ff',
    '0 0 15px #9ffd32',
    '0 0 15px #f49ae9',
    '0 0 15px #c493ff',
    '0 0 15px #f4f5ff',
]
function toggleColor() {
    colorIndex = (colorIndex + 1) % colors.length
    console.log(colorIndex)
    document.getElementById('clock').style.color = colors[colorIndex]
    document.getElementById('clock').style.transition = "1s"
    document.getElementById('clock').style.textShadow = shadow[colorIndex]
    document.getElementById('rainbow').style.color = colors[colorIndex]
    document.getElementById('toggleBtn').style.color = colors[colorIndex]
    document.getElementById('toggleButton').style.color = colors[colorIndex]
    document.querySelector('.hamburger').style.color = colors[colorIndex]
}


function toggleMenu() {
    document.querySelector('.menu').classList.toggle('show')
}


function detectDevice() {
    const isMobile = /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android.*Tablet/i.test(navigator.userAgent) && screen.width >= 768;
    if (isMobile && !isTablet) {
        document.body.innerHTML = `
        <div class="mssg-body"> 
            <div class="message-box">
                <h1>Sorry!</h1>
                <p>This website is only accessible on laptops, desktops, or tablets.</p>
            </div>
        </div>
        `;
    }
}
detectDevice();