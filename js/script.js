"use strict";

const menuIcon = document.querySelector(".header__menu-icon");
const menuBody = document.querySelector(".header__menu")
const menuLinks = document.querySelectorAll(".header__link[data-goto]");
const languageLinks = document.querySelectorAll(".language a, .header__language a");

document.querySelectorAll(".language__ru").forEach(selector => {
    selector.addEventListener("click", setLanguage.bind(null, "ru"));
});
document.querySelectorAll(".language__eng").forEach(selector => {
    selector.addEventListener("click", setLanguage.bind(null, "eng"));
});

const languages = ["ru", "eng"];

let lang = (window.hasOwnProperty("localStorage") && window.localStorage.getItem("lang")) || "eng";
setLanguage(lang);

if (menuIcon) {
    menuIcon.addEventListener("click", function (e) {
        changeMenuVisibility();
    })
}

if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        e.preventDefault();
        const menuLink = e.target;
        activateItems([menuLink], menuLinks);
        if (menuBody.classList.contains("active")) {
            changeMenuVisibility();
        }
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            goToMenuSection(menuLink);
        }
    }
}

function setLanguage(lang) {
    if (!languages.includes(lang)) {
        lang = "eng";
    }
    if (window.hasOwnProperty("localStorage")) {
        window.localStorage.setItem("lang", lang);
    }
    const langElements = document.querySelectorAll(".language__".concat(lang));
    activateItems(langElements, languageLinks);
    for (let key in langArr) {
        let elements = document.querySelectorAll(".lng-" + key);
        if (elements.length > 0 && langArr[key][lang]) {
            elements.forEach(element => {
                element.innerHTML = langArr[key][lang];
            });
        }
    }

}

function changeMenuVisibility() {
    menuIcon.classList.toggle("active");
    menuBody.classList.toggle("active");
    document.body.style.overflow = menuBody.classList.contains("active") ? "hidden" : "";
}

function activateItems(selectedItems, items) {
    if (items && items.length > 0) {
        items.forEach(item => item.classList.remove("active"));
        selectedItems.forEach(item => item.classList.add("active"));
    }
}

function goToMenuSection(menuLink) {
    const goToBlock = document.querySelector(menuLink.dataset.goto);
    const goToBlockValue = goToBlock.offsetTop - document.querySelector("header").offsetHeight;
    window.scrollTo({
        top: goToBlockValue,
        behavior: "smooth"
    });
}

window.onscroll = function () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        activateItems([menuLinks[menuLinks.length - 1]], menuLinks);
        return;
    }
    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            const goToBlockTopOffset = document.querySelector(menuLink.dataset.goto).offsetTop - document.querySelector("header").offsetHeight;
            const goToBlockBottomOffset = goToBlockTopOffset + document.querySelector(menuLink.dataset.goto).offsetHeight;
            if (goToBlockTopOffset <= scrollTop && scrollTop < goToBlockBottomOffset) {
                activateItems([menuLink], menuLinks);
            }
        })
    }
}
