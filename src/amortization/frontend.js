import $ from 'jquery';
import ReactDOM from 'react-dom';
import FinanceAmortization from './component';

$(function () {
    document.querySelectorAll('.wp-block-sbb-twoplustwo-amortization')
        .forEach((domContainer, index) => {
            const renderElement = document.createElement('div');
            renderElement.id = `sbb-twoplustwo-amortization-${index}`;
            domContainer.prepend(renderElement);

            const defaultPrincipal = parseFloat(domContainer.dataset.principal) || 20000.00;
            const defaultRate = parseFloat(domContainer.dataset.rate) || 5.0;
            const defaultNumberOfPayments = parseFloat(domContainer.dataset.numberOfPayments) || 48;
            const defaultInterval = parseFloat(domContainer.dataset.interval);

            ReactDOM.render(
                <FinanceAmortization
                    principal={defaultPrincipal}
                    rate={defaultRate}
                    number_of_payments={defaultNumberOfPayments}
                    interval={defaultInterval}
                />,
                renderElement
            );
        });
})