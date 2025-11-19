// file: components/RentalApplication/screenReader.ts

let screenReaderEnabled = false;
let liveRegion: HTMLElement | null = null;

// Function to set up the live region element in the DOM
function setupLiveRegion() {
    if (typeof document === 'undefined') return; // For Next.js/SSR

    // Create or find the live region
    liveRegion = document.getElementById('accessibility-live-region') as HTMLElement | null;

    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'accessibility-live-region';

        // --- ARIA-LIVE SETUP ---
        // role="status" makes it a polite region, good for non-critical changes like hover
        // aria-live="polite" tells screen readers to announce the content when ready
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');

        // Hide it visually but keep it accessible to screen readers
        liveRegion.style.cssText = `
            position: absolute; 
            width: 1px; 
            height: 1px; 
            margin: -1px; 
            padding: 0; 
            overflow: hidden; 
            clip: rect(0, 0, 0, 0); 
            border: 0;
        `;

        document.body.appendChild(liveRegion);
    }
}

// Set up the live region when the module loads
if (typeof window !== 'undefined') {
    window.addEventListener('load', setupLiveRegion);
}


export function setScreenReaderEnabled(value: boolean) {
    screenReaderEnabled = value;
}

export function announce(message: string) {
    if (!screenReaderEnabled) return;

    console.log("Announcement requested via announce():", message);

    // Use the reliable aria-live region method
    if (liveRegion) {
        // Clear old message to ensure new message is announced
        liveRegion.textContent = '';
        // Force a brief delay to ensure the screen reader detects the content change
        setTimeout(() => {
            liveRegion!.textContent = message;
        }, 100);
    }
    // Fallback/Legacy method (which Chrome often blocks on hover)
    else if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utter);
    }
}

