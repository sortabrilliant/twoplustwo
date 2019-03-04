import React from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const { Component, Fragment } = wp.element;
const { __ } = wp.i18n;
const { PanelBody, Button, ExternalLink, Spinner } = wp.components;

const { apiFetch } = wp;

export default class UpdatesPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updaterActive: sortabrilliant_updater.subscribed || false,
            isLoading: false,
        };

        this.activateUpdates = this.activateUpdates.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.activateUpdates();
    }

    activateUpdates({ EMAIL }) {
        this.setState({ isLoading: true });

        apiFetch({
            method: 'POST',
            path: '/sortabrilliant/v1/updater/settings',
            data: {
                'email_address': EMAIL,
            }
        }).then(() => {
            this.setState({ isLoading: false });
            sortabrilliant_updater.subscribed = EMAIL;
        });
    }

    render() {
        return (
            <PanelBody
                title={__('sorta brilliant Updates')}
                initialOpen={true}>

                {this.state.updaterActive ?
                    (
                        <Fragment>
                            <p>Thank you for subscribing to the newsletter.</p>
                            <p>Updates have been enabled for <ExternalLink href="https://sortabrilliant.com">sortabrilliant blocks</ExternalLink>.</p>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <p>Please subscribe to the email newsletter to enable updates.</p>

                            <MailchimpSubscribe
                                url="https://sortabrilliant.us19.list-manage.com/subscribe/post?u=9df71e481e8a38b1c68d25939&amp;id=0dc64aa8dc"
                                render={({ subscribe, status, message }) => (
                                    <MailchimpCustomForm
                                        status={status}
                                        message={message}
                                        onValidated={formData => subscribe(formData)}
                                        onActivate={this.activateUpdates}
                                    />
                                )}
                            />
                        </Fragment>
                    )
                }

                {this.state.isLoading && <Spinner />}

            </PanelBody>
        );
    }
}

class MailchimpCustomForm extends Component {
    constructor(props) {
        super(props);

        this.emailInput = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        if (this.emailInput && this.emailInput.current.value.indexOf('@') > -1) {
            this.props.onValidated({ EMAIL: this.emailInput.current.value });
            this.props.onActivate({ EMAIL: this.emailInput.current.value });
        }
    }

    render() {
        const { status, message } = this.props;

        let displayMessage;
        let displayColor;

        switch (status) {
            case "sending":
                displayColor = 'blue';
                displayMessage = __('Sending...');
                break;

            case "error":
                if (message.search('already subscribed') !== -1) {
                    displayColor = 'green';
                    displayMessage = __('Subscribed!');
                } else {
                    displayColor = 'red';
                    displayMessage = message;
                }
                break;

            case "success":
                displayColor = 'green';
                displayMessage = __('Subscribed!');
                break;

            default:
                displayMessage = message;
                break;
        }

        return (
            <Fragment>
                <pre>{JSON.stringify({ status, message }, '', 2)}</pre>

                {displayMessage && <div style={{ color: displayColor }} dangerouslySetInnerHTML={{ __html: displayMessage }}></div>}

                <div className="components-base-control">
                    <div className="components-base-control__field">
                        <label className="components-base-control__label">
                            {__('Email Address')}
                        </label>
                        <input ref={this.emailInput}
                            className="components-text-control__input"
                            type="email" />
                    </div>
                </div>

                <Button
                    isPrimary
                    name="subscribe"
                    type="submit"
                    onClick={this.handleSubmit}>
                    Subscribe
                </Button>
            </Fragment>
        );
    };
}