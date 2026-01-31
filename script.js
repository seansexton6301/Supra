// Toast notification
function showToast() {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.classList.remove("show");
    void toast.offsetWidth; // trigger reflow
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Live date & time (updated every second)
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
        hour12: true
    };

    const el = document.getElementById("datetime");
    if (el) {
        el.textContent = now.toLocaleString("en-US", options);
    }
}

updateDateTime();
setInterval(updateDateTime, 1000);