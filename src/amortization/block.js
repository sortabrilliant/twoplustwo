/**
 * BLOCK: twoplustwo
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;

import UpdatesPanel from '../updater/UpdatesPanel';
import FinanceAmortization from './component';

const el = wp.element.createElement;
const SVG = wp.components.SVG;
const svgIcon = el(SVG, { width: 20, height: 20, viewBox: '0 0 90 112.5' },
	el('path', { d: 'M45,6.8A38.2,38.2,0,1,0,83.2,45,38.24,38.24,0,0,0,45,6.8Zm0,71.51A33.31,33.31,0,1,1,78.31,45,33.35,33.35,0,0,1,45,78.31Z' }),
	el('path', { d: 'M59.13 33.51H30.87a2.44 2.44 0 1 0 0 4.89H59.13a2.44 2.44 0 1 0 0-4.89zM59.13 51.6H30.87a2.44 2.44 0 1 0 0 4.89H59.13a2.44 2.44 0 0 0 0-4.89z' }),
);

/**
 * Register: a Gutenberg Block.
 */
registerBlockType('sbb/twoplustwo-amortization', {
	title: __('Amortization'),
	description: __('Calculate monthly payments for anything.'),

	icon: svgIcon,
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
				<InspectorControls>
					<UpdatesPanel />
				</InspectorControls>
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
