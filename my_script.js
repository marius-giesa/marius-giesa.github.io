/*eslint-env browser*/

document.addEventListener("DOMContentLoaded", function() {
  // Alter-Berechnung
  var alter;
  var tag = 20;
  var monat = 12;
  var jahr = 1996;
  var datum = new Date();
  var datJahr = datum.getFullYear();
  var datMonat = datum.getMonth() + 1;
  var datTag = datum.getDate();

  if (monat < datMonat || (monat === datMonat && tag <= datTag)) {
    alter = datJahr - jahr;
  } else {
    alter = datJahr - jahr - 1;
  }
  document.getElementById('alter').innerHTML = alter;

  // Hamburger-Menü
  document.getElementById('hamburger').addEventListener('click', navStatus);

  function navStatus() {
    if (document.body.classList.contains('hamburger-active')) {
      navClose();
    } else {
      navOpen();
    }
  }

  function navClose() {
    document.body.classList.remove('hamburger-active');
  }

  function navOpen() {
    document.body.classList.add('hamburger-active');
  }

  // Menü schließt sich nach Klick
  var menu_items = document.querySelectorAll('nav .hauptmenu li a');
  menu_items.forEach(function(item) {
    item.addEventListener('click', function () {
      navClose();
    });
  });

  // To-Top-Button
  var toTop = document.querySelector(".top");
  window.addEventListener("scroll", function() {
    if (window.pageYOffset > 100) {
      toTop.classList.add('top-active');
    } else {
      toTop.classList.remove('top-active');
    }
  });

  // Timeline Observer – Fade-in (0.5s Verzögerung ist via CSS-Transition eingestellt)
  var timelineEvents = document.querySelectorAll('.timeline-event');
  var observerOptions = { threshold: 0.2 };
  var observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  timelineEvents.forEach(function(event) {
    observer.observe(event);
  });
  
  // Load README from GitHub und render als HTML
    const projects = document.querySelectorAll(".projekt");

  projects.forEach(async (project) => {
    const user = project.dataset.user;
    const repo = project.dataset.repo;
    const branch = project.dataset.branch || "main";
    const linkText = project.dataset.linktext || "Zum Repository";
    const container = project.querySelector(".readme-container");
    const linkElement = project.querySelector(".repo-link");

    const baseRawUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branch}`;
    const readmeUrl = `${baseRawUrl}/README.md`;
    const repoUrl = `https://github.com/${user}/${repo}`;

    // Setze GitHub-Link
    if (linkElement) {
      linkElement.href = repoUrl;
      linkElement.textContent = linkText;
    }

    try {
      const response = await fetch(readmeUrl);
      if (!response.ok) throw new Error("README konnte nicht geladen werden");

      let markdown = await response.text();

      // Ersetze relative Bildpfade
      markdown = markdown.replace(/!\[([^\]]*)\]\((?!http)([^)]+)\)/g, `![$1](${baseRawUrl}/$2)`);

      const html = marked.parse(markdown);
      container.innerHTML = html;
    } catch (err) {
      container.innerHTML = `<p>Fehler beim Laden der README: ${err.message}</p>`;
    }
  });
});