// AziBal website enhancements

document.addEventListener("DOMContentLoaded", function () {
    const main = document.querySelector("main");
    const header = document.querySelector(".header");

    // Add an accessible skip link without changing the visual design.
    if (main && header && !document.querySelector(".skip-link")) {
        if (!main.id) main.id = "main-content";
        const skip = document.createElement("a");
        skip.className = "skip-link";
        skip.href = `#${main.id}`;
        skip.textContent = "Skip to main content";
        document.body.insertBefore(skip, document.body.firstChild);
    }
});
