export function appendNewElement(type, textContent, parent) {
    const element = document.createElement(type);
    element.textContent = textContent;
    parent.appendChild(element);
    return element;
}

Array.prototype.equals = function(arr) {
    if (this === arr) return true;

    if (this.length !== arr.length) return false;

    for (let i = 0; i < this.length; i++) {
        if (this[i] !== arr[i]) return false;
    }

    return true;
};

export const arrayEquals = function(arr) {
    return this.equals(arr);
};
