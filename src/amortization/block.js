/**
 * BLOCK: twoplustwo
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

import FinanceAmortization from './component';

/**
 * Register: a Gutenberg Block.
 */
registerBlockType('sbb/twoplustwo-amortization', {
	title: __('Amortization'),

	icon: 'shield',
	category: 'financial_calculators',

	keywords: [
		__('amortization'),
		__('installments'),
		__('sorta brilliant'),
	],

	attributes: {
		principal: {
			type: 'string',
			source: 'attribute',
			selector: 'div',
			attribute: 'data-principal',
			default: '20000',
		},
		rate: {
			type: 'string',
			source: 'attribute',
			selector: 'div',
			attribute: 'data-rate',
			default: '5',
		},
		number_of_payments: {
			type: 'string',
			source: 'attribute',
			selector: 'div',
			attribute: 'data-number-of-payments',
			default: '48',
		},
		interval: {
			type: 'string',
			source: 'attribute',
			selector: 'div',
			attribute: 'data-interval',
			default: '1',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 */
	edit: function ({ attributes, setAttributes, className }) {
		const onUpdate = (object) => {
			setAttributes(object);
		};

		return (
			<div className={className}>
				<FinanceAmortization
					principal={parseFloat(attributes.principal)}
					rate={parseFloat(attributes.rate)}
					number_of_payments={parseInt(attributes.number_of_payments)}
					interval={parseInt(attributes.interval)}
					onUpdate={onUpdate}
				/>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 */
	save: function ({ attributes, className }) {
		return (
			<div
				className={className}
				data-principal={attributes.principal}
				data-rate={attributes.rate}
				data-number-of-payments={attributes.number_of_payments}
				data-interval={attributes.interval}
			>
				<noscript>{__('JavaScript must be enabled to use the calculator.')}</noscript>
			</div>
		);
	},
});
