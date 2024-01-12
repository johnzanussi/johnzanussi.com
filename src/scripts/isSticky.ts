type Callback = (isSticky: boolean, element: HTMLElement) => void;
type Options = {
    $offsetEl?: HTMLElement;
    callback?: Callback;
};

export default function isSticky(
    $element: HTMLElement,
    options: Options = {},
) {

    const {
        callback,
        $offsetEl = $element,
    } = options;

    const getThreshold = () => {

        // Reset position so we can get proper
        // top offset otherwise it's sticky and offset is 0
        const position = $element.style.position;
        $element.style.position = 'static';

        const top = parseInt(getComputedStyle($element).top, 10);
        const offset = $offsetEl.getBoundingClientRect().top;
        $element.style.position = position;

        const threshold = window.scrollY + offset - top;

        return threshold;
    };

    let threshold = getThreshold();
    let isSticky = false;
    let lastValue = isSticky;

    const eventOptions = {
        passive: true,
    };

    const scrollEvent = () => {

        if (!isSticky && window.scrollY > threshold) {
            isSticky = true;
        } else if (isSticky && window.scrollY <= threshold) {
            isSticky = false;
        }

        if (lastValue !== isSticky) {
            lastValue = isSticky;

            $element.classList.toggle('is-sticky', isSticky);

            if (callback) {
                callback(isSticky, $element);
            }

        }

    };

    window.addEventListener('scroll', scrollEvent, eventOptions);

    window.addEventListener('resize', () => {
        threshold = getThreshold();
    }, eventOptions);

    scrollEvent();

}
