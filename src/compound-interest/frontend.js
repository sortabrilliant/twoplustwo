import $ from 'jquery';
import ReactDOM from 'react-dom';
import FinanceCAGR from './component';

$(function () {
    document.querySelectorAll('.wp-block-sbb-twoplustwo-compound-interest')
        .forEach((domContainer, index) => {
            const renderElement = document.createElement('div');
            renderElement.id = `sbb-twoplustwo-compound-interest-${index}`;
            domContainer.prepend(renderElement);

            console.log(domContainer);
            const defaultRate = parseFloat(domContainer.dataset.rate) || 4.3;
            const defaultCompoundingsPerPeriod = parseInt(domContainer.dataset.compoundingsPerPeriod) || 4;
            const defaultPrincipal = parseFloat(domContainer.dataset.principal) || 1500;
            const defaultNumberOfPeriods = parseInt(domContainer.dataset.numberOfPeriods) || 6;

            ReactDOM.render(
                <FinanceCAGR
                    rate={defaultRate}
                    compoundingsPerPeriod={defaultCompoundingsPerPeriod}
                    principal={defaultPrincipal}
                    numberOfPeriods={defaultNumberOfPeriods}
                />,
                renderElement
            );
        });
})