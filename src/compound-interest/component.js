import React from 'react';
import { Finance } from 'financejs';

const { Component, Fragment } = wp.element;
const { __ } = wp.i18n;
const { TextControl, Button } = wp.components;

export default class FinanceCAGR extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rate: props.rate,
            compoundingsPerPeriod: props.compoundingsPerPeriod,
            principal: props.principal,
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
            parseFloat(this.state.rate) || 0,
            parseInt(this.state.compoundingsPerPeriod) || 1,
            parseFloat(this.state.principal) || 1,
            parseInt(this.state.numberOfPeriods) || 1,
        ];

        const result = finance.CI(...params);

        if (result === 0) {
            this.setState({
                result: __('Could not calculate with the given values.')
            });
        } else {
            this.setState({
                result: __(`Compound Interest is $${result}.`)
            });
        }
    }

    render() {
        const { rate, compoundingsPerPeriod, principal, numberOfPeriods, result } = this.state;
        return (
            <Fragment>
                <div className="sbb-twoplustwo-compound-interest-controls">

                    <div className="form-group row">
                        <label for="rate" class="col-sm-4 col-form-label">{__('Rate')}</label>
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

                    <div className="form-group row">
                        <label for="compoundingsPerPeriod" class="col-sm-4 col-form-label">{__('Compoundings per period')}</label>
                        <div className="input-group col-sm-8">
                            <TextControl
                                id="compoundingsPerPeriod"
                                value={compoundingsPerPeriod}
                                onChange={this.updateValue.bind(null, 'compoundingsPerPeriod')}
                            />
                        </div>
                    </div>

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
                        <label for="numberOfPeriods" class="col-sm-4 col-form-label">{__('Number of periods')}</label>
                        <div className="input-group col-sm-8">
                            <TextControl
                                id="numberOfPeriods"
                                value={numberOfPeriods}
                                onChange={this.updateValue.bind(null, 'numberOfPeriods')}
                            />
                        </div>
                    </div>
                </div>

                <div className="sbb-twoplustwo-compound-interest-actions mb-3">
                    <Button
                        className="btn btn-primary"
                        onClick={this.calculateResult}
                    >
                        {__('Calculate')}
                    </Button>
                </div>

                {result && <p className="sbb-twoplustwo-compound-interest-result">{result}</p>}
            </Fragment>
        );
    }
}