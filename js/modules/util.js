export function appendNewElement(type, textContent, parent) {
    const element = document.createElement(type);
    element.textContent = textContent;
    parent.appendChild(element);
    return element;
}
