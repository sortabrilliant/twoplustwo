import $ from 'jquery';
import ReactDOM from 'react-dom';
import FinanceCAGR from './component';

$(function () {
    document.querySelectorAll('.wp-block-sbb-twoplustwo-compound-annual-growth-rate')
        .forEach((domContainer, index) => {
            const renderElement = document.createElement('div');
            renderElement.id = `sbb-twoplustwo-compound-annual-growth-rate-${index}`;
            domContainer.prepend(renderElement);

            console.log(domContainer);
            const defaultBeginningValue = parseFloat(domContainer.dataset.beginningValue) || 10000.00;
            const defaultEndingValue = parseFloat(domContainer.dataset.endingValue) || 19500.00;
            const defaultNumberOfPeriods = parseInt(domContainer.dataset.numberOfPeriods) || 3;

            ReactDOM.render(
                <FinanceCAGR
                    beginningValue={defaultBeginningValue}
                    endingValue={defaultEndingValue}
                    numberOfPeriods={defaultNumberOfPeriods}
                />,
                renderElement
            );
        });
})