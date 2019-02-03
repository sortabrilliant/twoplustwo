import React from 'react';
import { Finance } from 'financejs';

const { Component, Fragment } = wp.element;
const { __ } = wp.i18n;
const { SelectControl, TextControl, Button } = wp.components;

export default class FinanceAmortization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            principal: props.principal,
            rate: props.rate,
            number_of_payments: props.number_of_payments,
            interval: props.interval,
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
            parseFloat(this.state.principal) || 0,
            parseFloat(this.state.rate) || 1,
            parseInt(this.state.number_of_payments) || 1,
            parseInt(this.state.interval)
        ];

        const result = finance.AM(...params);

        if (result === 0) {
            this.setState({
                result: __('Could not calculate with the given values.')
            });
        } else {
            this.setState({
                result: __(`Monthly payment is $${result}.`)
            });
        }
    }

    render() {
        const { principal, rate, number_of_payments, interval, result } = this.state;
        return (
            <Fragment>
                <div className="sbb-twoplustwo-amortization-controls">
                    <TextControl
                        label={__('Principal')}
                        value={principal}
                        onChange={this.updateValue.bind(null, 'principal')}
                    />
                    <TextControl
                        label={__('Interest Rate')}
                        value={rate}
                        onChange={this.updateValue.bind(null, 'rate')}
                    />
                    <TextControl
                        label={__('Number of Payments')}
                        value={number_of_payments}
                        onChange={this.updateValue.bind(null, 'number_of_payments')}
                    />
                    <SelectControl
                        label={__('Interval')}
                        value={interval}
                        options={[
                            { label: __('Years'), value: 0 },
                            { label: __('Months'), value: 1 },
                        ]}
                        onChange={this.updateValue.bind(null, 'interval')}
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