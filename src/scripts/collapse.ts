import onClick from '@/scripts/onClick';

const collapse = (selector: string = 'button[data-toggle="collapse"]') => {

    onClick(selector, ($element) => {

        if ($element.dataset.target) {

            const $toggleElm = document.querySelector($element.dataset.target);

            if ($element && $toggleElm) {

                const isExpanded = $element.getAttribute('aria-expanded') === 'true';

                $element.setAttribute('aria-expanded', (!isExpanded).toString());
                $element.classList.toggle('collapsed', isExpanded);

                $toggleElm.classList.toggle('show', !isExpanded);


            }
        }

    });

};

export default collapse;
