type Callback = (isSticky: boolean, element: IntersectionObserverEntry) => void;

export default function isSticky(
    $element: HTMLElement,
    options: IntersectionObserverInit = {},
    callback: Callback | null = null,
) {

    const init = {
        threshold: [1],
        ...options,
    };

    const observer = new IntersectionObserver(
        ([element]) => {
            if (element) {
                const isSticky = element.intersectionRatio < 1;
                element.target.classList.toggle('is-sticky', isSticky);
                if (callback) {
                    callback(isSticky, element);
                }
            }
        },
        init,
    );

    observer.observe($element);

    return observer;

}
