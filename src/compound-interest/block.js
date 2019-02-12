/**
 * BLOCK: twoplustwo
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

import FinanceCI from './component';

/**
 * Register: a Gutenberg Block.
 */
registerBlockType('sbb/twoplustwo-compound-interest', {
	title: __('Compound Interest (CI)'),

	icon: 'shield',
	category: 'financial_calculators',

	keywords: [
		__('compound interest'),
		__('ci'),
		__('sorta brilliant'),
	],

	attributes: {
		rate: {
			type: 'string',
			source: 'attribute',
			selector: 'div',
			attribute: 'data-rate',
			default: '4.3',
		},
		compoundingsPerPeriod: {
			type: 'string',
			source: 'attribute',
			selector: 'div',
			attribute: 'data-compoundings-per-period',
			default: '4',
		},
		principal: {
			type: 'string',
			source: 'attribute',
			selector: 'div',
			attribute: 'data-principal',
			default: '1500',
		},
		numberOfPeriods: {
			type: 'string',
			source: 'attribute',
			selector: 'div',
			attribute: 'data-number-of-periods',
			default: '6',
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
				<FinanceCI
					rate={parseFloat(attributes.rate)}
					compoundingsPerPeriod={parseFloat(attributes.compoundingsPerPeriod)}
					principal={parseInt(attributes.principal)}
					numberOfPeriods={parseInt(attributes.numberOfPeriods)}
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
				data-rate={attributes.rate}
				data-compoundings-per-period={attributes.compoundingsPerPeriod}
				data-principal={attributes.principal}
				data-number-of-periods={attributes.numberOfPeriods}
			>
				<noscript>{__('JavaScript must be enabled to use the calculator.')}</noscript>
			</div>
		);
	},
});
