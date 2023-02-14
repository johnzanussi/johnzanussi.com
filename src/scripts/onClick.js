export default function onClick (selector, clickHandler) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => element.addEventListener('click', clickHandler));
}
