/**
 * BLOCK: twoplustwo
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

import FinanceCAGR from './component';

/**
 * Register: a Gutenberg Block.
 */
registerBlockType('sbb/twoplustwo-compound-annual-growth-rate', {
	title: __('Compound Annual Growth Rate (CAGR)'),

	icon: 'shield',
	category: 'finance',

	keywords: [
		__('compound annual growth rate'),
		__('cagr'),
		__('sorta brilliant'),
	],

	attributes: {
		beginningValue: {
			type: 'string',
			source: 'attribute',
			selector: 'div',
			attribute: 'data-beginning-value',
			default: '10000',
		},
		endingValue: {
			type: 'string',
			source: 'attribute',
			selector: 'div',
			attribute: 'data-ending-value',
			default: '19500',
		},
		numberOfPeriods: {
			type: 'string',
			source: 'attribute',
			selector: 'div',
			attribute: 'data-number-of-periods',
			default: '3',
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
				<FinanceCAGR
					beginningValue={parseFloat(attributes.beginningValue)}
					endingValue={parseFloat(attributes.endingValue)}
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
				data-beginning-value={attributes.beginningValue}
				data-ending-value={attributes.endingValue}
				data-number-of-periods={attributes.numberOfPeriods}
			>
				<noscript>{__('JavaScript must be enabled to use the calculator.')}</noscript>
			</div>
		);
	},
});
