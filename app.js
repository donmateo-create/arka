let installPromptEvent = null;
const installButton = document.getElementById('installButton');

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceworker.js');
}

// Listen for install prompt readiness
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPromptEvent = event;
  installButton.disabled = false;
  console.log("✅ PWA install available");
});

// When the button is clicked → trigger the install prompt
installButton.addEventListener('click', async () => {
  if (!installPromptEvent) return;

  installPromptEvent.prompt();
  const choice = await installPromptEvent.userChoice;
  console.log("Install choice:", choice.outcome);

  // Clear event — can be triggered only once
  installPromptEvent = null;
  installButton.disabled = true;
});
