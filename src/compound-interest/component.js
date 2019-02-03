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
                <div className="sbb-twoplustwo-amortization-controls">
                    <TextControl
                        label={__('Rate')}
                        value={rate}
                        onChange={this.updateValue.bind(null, 'rate')}
                    />
                    <TextControl
                        label={__('Compoundings per period')}
                        value={compoundingsPerPeriod}
                        onChange={this.updateValue.bind(null, 'compoundingsPerPeriod')}
                    />
                    <TextControl
                        label={__('Principal')}
                        value={principal}
                        onChange={this.updateValue.bind(null, 'principal')}
                    />
                    <TextControl
                        label={__('Number of periods')}
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