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
                <div className="sbb-twoplustwo-compound-annual-growth-rate-controls">

                    <div className="form-group row">
                        <label for="beginningValue" class="col-sm-4 col-form-label">{__('Beginning Value')}</label>
                        <div className="input-group col-sm-8">
                            <input
                                id="beginningValue"
                                type="text"
                                className="components-text-control__input"
                                value={beginningValue}
                                onChange={this.updateValue.bind(null, 'beginningValue')}
                            />
                            <div className="input-group-append">
                                <span className="input-group-text">$</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="endingValue" class="col-sm-4 col-form-label">{__('Ending Value')}</label>
                        <div className="input-group col-sm-8">
                            <input
                                id="endingValue"
                                type="text"
                                className="components-text-control__input"
                                value={endingValue}
                                onChange={this.updateValue.bind(null, 'endingValue')}
                            />
                            <div className="input-group-append">
                                <span className="input-group-text">$</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="numberOfPeriods" className="col-sm-4 col-form-label">{__('Number of Periods')}</label>
                        <div className="input-group col-sm-8">
                            <TextControl
                                id="numberOfPeriods"
                                value={numberOfPeriods}
                                onChange={this.updateValue.bind(null, 'numberOfPeriods')}
                            />
                        </div>
                    </div>
                </div>

                <div className="sbb-twoplustwo-compound-annual-growth-rate-actions mb-3">
                    <Button
                        className="btn btn-primary"
                        onClick={this.calculateResult}>
                        {__('Calculate')}
                    </Button>
                </div>

                {result && <p className="sbb-twoplustwo-compound-annual-growth-rate-result">{result}</p>}
            </Fragment>
        );
    }
}