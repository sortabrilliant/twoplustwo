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
import FinanceCI from './component';

const el = wp.element.createElement;
const SVG = wp.components.SVG;
const svgIcon = el(SVG, { width: 20, height: 20, viewBox: '0 0 90 112.5' },
	el('path', { d: 'M45,6.8A38.2,38.2,0,1,0,83.2,45,38.24,38.24,0,0,0,45,6.8Zm0,71.51A33.31,33.31,0,1,1,78.31,45,33.35,33.35,0,0,1,45,78.31Z' }),
	el('path', { d: 'M63.29,42.56H47.44V26.71a2.44,2.44,0,0,0-4.89,0V42.56H26.71a2.44,2.44,0,1,0,0,4.89H42.56V63.29a2.44,2.44,0,1,0,4.89,0V47.44H63.29a2.44,2.44,0,0,0,0-4.89Z' }),
);

/**
 * Register: a Gutenberg Block.
 */
registerBlockType('sbb/twoplustwo-compound-interest', {
	title: __('Compound Interest (CI)'),
	description: __('Calculate the interest on the principal and the accumulated interest of previous periods.'),

	icon: svgIcon,
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
				<InspectorControls>
					<UpdatesPanel />
				</InspectorControls>
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
