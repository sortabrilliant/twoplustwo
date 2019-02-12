/**
 * BLOCK: twoplustwo
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

import FinanceCI from './component';

const el = wp.element.createElement;
const SVG = wp.components.SVG;
const svgIcon = el(SVG, { width: 20, height: 20, viewBox: '0 0 100 100' },
	el('path', { d: 'M19 24c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7S22.9 24 19 24zM19 14c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3S20.7 14 19 14zM37 38c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7S40.9 38 37 38zM37 28c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3S38.7 28 37 28zM19 37.5c-.4 0-.8-.1-1.2-.4-.9-.7-1.1-1.9-.4-2.8l17-23c.7-.9 1.9-1.1 2.8-.4.9.7 1.1 1.9.4 2.8l-17 23C20.2 37.2 19.6 37.5 19 37.5zM88 90H12c-1.1 0-2-.9-2-2s.9-2 2-2h76c1.1 0 2 .9 2 2S89.1 90 88 90z' }),
	el('path', { d: 'M12 90c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2s2 .9 2 2v6C14 89.1 13.1 90 12 90zM27 90c-1.1 0-2-.9-2-2V75c0-1.1.9-2 2-2s2 .9 2 2v13C29 89.1 28.1 90 27 90zM42 90c-1.1 0-2-.9-2-2V78c0-1.1.9-2 2-2s2 .9 2 2v10C44 89.1 43.1 90 42 90zM58 90c-1.1 0-2-.9-2-2V66c0-1.1.9-2 2-2s2 .9 2 2v22C60 89.1 59.1 90 58 90zM73 90c-1.1 0-2-.9-2-2V70c0-1.1.9-2 2-2s2 .9 2 2v18C75 89.1 74.1 90 73 90zM88 90c-1.1 0-2-.9-2-2V46c0-1.1.9-2 2-2s2 .9 2 2v42C90 89.1 89.1 90 88 90zM12 67.5c-1 0-1.9-.8-2-1.8-.1-1.1.7-2.1 1.8-2.2.4-.1 45.1-5.4 74.6-43.8.7-.9 1.9-1 2.8-.4.9.7 1 1.9.4 2.8C59 61.9 12.7 67.5 12.2 67.5 12.1 67.5 12.1 67.5 12 67.5z' }),
	el('path', { d: 'M88,23H76c-1.1,0-2-0.9-2-2s0.9-2,2-2h12c1.1,0,2,0.9,2,2S89.1,23,88,23z' }),
	el('path', { d: 'M88,35c-1.1,0-2-0.9-2-2V21c0-1.1,0.9-2,2-2s2,0.9,2,2v12C90,34.1,89.1,35,88,35z' }),
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
