export function loadTheme(
  theme: string,
  darkTheme: string | null,
  origin: string
) {
  return new Promise(resolve => {
    const link = document.createElement("link");
    const lightThemeCSS = `/stylesheets/themes/${theme}/utterances.css`;
    const darkThemeCSS = `/stylesheets/themes/${darkTheme}/utterances.css`;
    link.rel = "stylesheet";
    link.setAttribute("crossorigin", "anonymous");
    link.onload = resolve;
    link.href = (darkTheme && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? darkThemeCSS : lightThemeCSS;
    document.head.appendChild(link);

    if (darkTheme) {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      mql.addEventListener("change", e => {
        if (e.matches) {
          link.href = `/stylesheets/themes/${darkTheme}/utterances.css`;
        } else {
          link.href = `/stylesheets/themes/${theme}/utterances.css`;
        }
      });
    }

    addEventListener("message", event => {
      if (event.origin === origin && event.data.type === "set-theme") {
        link.href = `/stylesheets/themes/${event.data.theme}/utterances.css`;
      }
    });
  });
}
