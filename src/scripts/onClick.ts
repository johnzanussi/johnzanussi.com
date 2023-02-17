type Handler = (element: HTMLElement, event: Event) => void;

export default function onClick(selector: string, handler: Handler) {

    window.addEventListener('DOMContentLoaded', () => {

        document
            .querySelectorAll(selector)
            .forEach(element => element.addEventListener('click', (event) => {
                handler(event.target as HTMLElement, event);
            }));

    });

}
