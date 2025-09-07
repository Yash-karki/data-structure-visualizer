// Legacy sorting implementation - DEPRECATED
// This file is kept for reference only
// The main application now uses sorting.js with enhanced features

console.warn("⚠️ DEPRECATED: index.js is no longer used. Please use sorting.html with sorting.js for the enhanced sorting visualizer.");

// Redirect to the main landing page if someone accidentally loads this
if (typeof window !== 'undefined') {
    console.log("🔄 Redirecting to main application...");
    setTimeout(() => {
        window.location.href = 'landing.html';
    }, 2000);
}