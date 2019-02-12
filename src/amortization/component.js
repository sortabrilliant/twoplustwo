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
        if (typeof value === 'object') {
            value = value.target.value;
        }
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

                    <div className="form-group row">
                        <label for="principal" class="col-sm-4 col-form-label">{__('Principal')}</label>
                        <div className="input-group col-sm-8">
                            <input
                                id="principal"
                                type="text"
                                className="components-text-control__input"
                                value={principal}
                                onChange={this.updateValue.bind(null, 'principal')}
                            />
                            <div className="input-group-append">
                                <span className="input-group-text">$</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="loanterm" class="col-sm-4 col-form-label">{__('Loan Term')}</label>
                        <div className="col-sm-8 d-flex">
                            <TextControl
                                id="loanterm"
                                value={number_of_payments}
                                onChange={this.updateValue.bind(null, 'number_of_payments')}
                            />
                            <SelectControl
                                className="d-flex align-items-stretch"
                                id="interval"
                                value={interval}
                                options={[
                                    { label: __('Years'), value: 0 },
                                    { label: __('Months'), value: 1 },
                                ]}
                                onChange={this.updateValue.bind(null, 'interval')}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="rate" class="col-sm-4 col-form-label">{__('Interest Rate')}</label>
                        <div className="input-group col-sm-8">
                            <input
                                id="rate"
                                type="text"
                                className="components-text-control__input"
                                value={rate}
                                onChange={this.updateValue.bind(null, 'rate')}
                            />
                            <div className="input-group-append">
                                <span className="input-group-text">%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sbb-twoplustwo-amortization-actions mb-3">
                    <Button
                        className="btn btn-primary"
                        onClick={this.calculateResult}>
                        {__('Calculate')}
                    </Button>
                </div>

                {result && <p className="sbb-twoplustwo-amortization-result">{result}</p>}
            </Fragment>
        );
    }
}