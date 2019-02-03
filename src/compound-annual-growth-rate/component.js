import React from 'react';
import { Finance } from 'financejs';

const { Component, Fragment } = wp.element;
const { __ } = wp.i18n;
const { TextControl, Button } = wp.components;

export default class FinanceCAGR extends Component {
    constructor(props) {
        super(props);

        this.state = {
            beginningValue: props.beginningValue,
            endingValue: props.endingValue,
            numberOfPeriods: props.numberOfPeriods,
            result: null,
        };

        this.updateValue = this.updateValue.bind(this);
        this.calculateResult = this.calculateResult.bind(this);
    }

    updateValue(key, value) {
        const object = { [key]: value };

        if (typeof this.props.onUpdate !== 'undefined') {
            this.props.onUpdate(object);
        }

        this.setState(object);

        if (this.state.result !== null) {
            this.setState({ result: null });
        }
    }

    calculateResult() {
        const finance = new Finance();
        const params = [
            parseFloat(this.state.beginningValue) || 0,
            parseFloat(this.state.endingValue) || 1,
            parseInt(this.state.numberOfPeriods) || 1
        ];

        const result = finance.CAGR(...params);

        if (result === 0) {
            this.setState({
                result: __('Could not calculate with the given values.')
            });
        } else {
            this.setState({
                result: __(`CAGR is ${result}%.`)
            });
        }
    }

    render() {
        const { beginningValue, endingValue, numberOfPeriods, result } = this.state;
        return (
            <Fragment>
                <div className="sbb-twoplustwo-amortization-controls">
                    <TextControl
                        label={__('Beginning Value')}
                        value={beginningValue}
                        onChange={this.updateValue.bind(null, 'beginningValue')}
                    />
                    <TextControl
                        label={__('Ending Value')}
                        value={endingValue}
                        onChange={this.updateValue.bind(null, 'endingValue')}
                    />
                    <TextControl
                        label={__('Number of Periods')}
                        value={numberOfPeriods}
                        onChange={this.updateValue.bind(null, 'numberOfPeriods')}
                    />
                </div>

                <div className="sbb-twoplustwo-amortization-actions">
                    <Button
                        isPrimary
                        onClick={this.calculateResult}
                    >
                        {__('Calculate')}
                    </Button>
                </div>

                {result && <p className="sbb-twoplustwo-amortization-result">{result}</p>}
            </Fragment>
        );
    }
}