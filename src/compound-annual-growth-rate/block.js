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
import FinanceCAGR from './component';

const el = wp.element.createElement;
const SVG = wp.components.SVG;
const svgIcon = el(SVG, { width: 20, height: 20, viewBox: '0 0 90 112.5' },
	el('path', { d: 'M56.21,30.34,30.34,56.21a2.44,2.44,0,0,0,3.46,3.46L59.66,33.79a2.44,2.44,0,0,0-3.46-3.46Z' }),
	el('path', { d: 'M72,18A38.2,38.2,0,1,0,18,72,38.2,38.2,0,1,0,72,18ZM45,78.31a33.31,33.31,0,1,1,23.55-9.76A33.09,33.09,0,0,1,45,78.31Z' }),
	el('path', { d: 'M33.61 37.07a2.44 2.44 0 1 0 3.46-3.46l-3.28-3.28a2.44 2.44 0 0 0-3.46 3.46zM56.39 52.93a2.44 2.44 0 1 0-3.46 3.46l3.28 3.28a2.44 2.44 0 0 0 3.46-3.46z' }),
);

/**
 * Register: a Gutenberg Block.
 */
registerBlockType('sbb/twoplustwo-compound-annual-growth-rate', {
	title: __('Compound Annual Growth Rate (CAGR)'),
	description: __('Calculate year-over-year growth rate of an investment.'),

	icon: svgIcon,
	category: 'financial_calculators',

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
				<InspectorControls>
					<UpdatesPanel />
				</InspectorControls>
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
