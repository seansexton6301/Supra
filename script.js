let audioContext = null;
let hasUnlocked = false;

async function unlockAndScreech() {
  const status = document.getElementById('status');
  const btn = document.getElementById('unlockBtn');

  status.textContent = "Unlocking audio... hold on!";

  if (!hasUnlocked) {
    try {
      // Create and resume AudioContext on user gesture (required for Safari/Chrome autoplay policies)
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      console.log("AudioContext resumed!");
      hasUnlocked = true;
      status.textContent = "Unlocked! Click again for the full screech...";
      btn.textContent = "NOW PLAY THE DIAL-UP SCREECH!!! 📞🔊";
      return;  // First click just unlocks audio context
    } catch (err) {
      console.error("AudioContext unlock failed:", err);
      status.textContent = "Unlock failed — see console for details. Try refresh.";
      return;
    }
  }

  // Second+ click: play the sound
  const dialup = document.getElementById('dialupSound');
  dialup.muted = true;
  dialup.currentTime = 0;

  try {
    await dialup.play();
    console.log("Dial-up playing!");
    status.textContent = "EEEE-ERRRR-KSSSHHH... connecting... 💾🌐";
    btn.style.display = 'none';  // Hide button after success
  } catch (err) {
    console.error("Play failed:", err);
    status.textContent = "Play blocked — check console. Possible network/adblock issue or strict browser setting.";
  }
}

// Attach the event listener
document.getElementById('unlockBtn').addEventListener('click', unlockAndScreech);