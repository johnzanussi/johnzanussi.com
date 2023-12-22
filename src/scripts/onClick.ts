export default function onClick(
    selector: string | HTMLElement | HTMLElement[],
    handler: (element: HTMLElement, event: Event) => void,
) {

    window.addEventListener('DOMContentLoaded', () => {

        let $targets;

        if (selector instanceof HTMLElement) {
            $targets = [selector];
        } else if (Array.isArray(selector) && selector.every(element => element instanceof HTMLElement)) {
            $targets = selector;
        } else if (typeof(selector) === 'string') {
            $targets = document.querySelectorAll<HTMLElement>(selector);
        }

        if ($targets && $targets.length) {
            $targets.forEach($element => $element.addEventListener('click', (event) => {
                handler($element, event);
            }));
        }

    });

}
