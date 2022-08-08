/*eslint-env browser*/

/*Alter-Aufgabe*/
window.onload = function altercalc() {
    var alter;
    var tag = 09;
    var monat = 12;
    var jahr = 1996;
    var datum = new Date();
    var datJahr = datum.getFullYear();
    var datMonat = datum.getMonth() + 1;
    var datTag = datum.getDate();

    if (monat < datMonat || (monat == datMonat && tag <= datTag)) {
        alter = datJahr - jahr;
    } else {
        alter = datJahr - jahr - 1;
    }

    document.getElementById('alter').innerHTML = alter;
}



/* Hamburger-Menü */
document.getElementById('hamburger').addEventListener('click', navStatus);

/*Prüfen ob die Navigation geöffnet oder geschlossen ist*/
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

/*Menu soll sich schließen nach Auswahl eines Menupunktes*/
var menu_items = document.querySelectorAll('nav .hauptmenu li a');

menu_items.forEach((item) => {
    item.addEventListener('click', function () {
        navClose();
    });
});



/*Skill-Bars
var skills = document.querySelector(".skill-per");
window.onscroll = function(){
    skills.style.cssText = "animation:fillBars 2.5s 1;" ;
};*/



/* To-Top-Button */
var toTop = document.querySelector(".top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        toTop.classList.add('top-active');
    } else {
        toTop.classList.remove('top-active');
    }
});
