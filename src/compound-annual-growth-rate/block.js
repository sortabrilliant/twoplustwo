/**
 * BLOCK: twoplustwo
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;

import UpdatesPanel from '../UpdatesPanel';
import FinanceCAGR from './component';

const el = wp.element.createElement;
const SVG = wp.components.SVG;
const svgIcon = el(SVG, { width: 20, height: 20, viewBox: '0 0 100 100' },
	el('path', { d: 'M93.695 68.724h-1.351v-3.569c0-.54-.315-1.005-.769-1.233.024-.103.041-.208.041-.318v-3.654h1.42c.765 0 1.386-.622 1.386-1.386v-3.749c0-.764-.621-1.385-1.386-1.385h-2.494V50.23h.416c.764 0 1.386-.621 1.386-1.386v-3.749c0-.764-.622-1.386-1.386-1.386H69.666c-.764 0-1.385.622-1.385 1.386v3.465h-.416c-.765 0-1.386.622-1.386 1.386v3.749c0 .764.621 1.386 1.386 1.386h2.495v3.388h-1.421c-.765 0-1.386.622-1.386 1.386v3.748c0 .542.314 1.006.769 1.234-.024.103-.041.208-.041.317v3.749c0 .765.621 1.386 1.385 1.386h1.353v3.389h-2.495c-.764 0-1.386.621-1.386 1.386v3.748c0 .764.622 1.386 1.386 1.386h.414v3.573c0 .765.622 1.386 1.386 1.386h21.292c.765 0 1.386-.621 1.386-1.386v-3.748c0-.764-.621-1.386-1.386-1.386h-.414v-3.394h2.494c.765 0 1.386-.622 1.386-1.386v-3.748C95.081 69.345 94.46 68.724 93.695 68.724zM86.678 78.534h-1.42v-3.193h1.42V78.534zM88.341 75.341h1.197v3.193h-1.197V75.341zM83.803 70.387h1.386v3.193h-1.386V70.387zM82.14 73.58h-9.459v-3.193h9.459V73.58zM86.158 68.626v-3.193h1.767v3.193H86.158zM89.588 65.433h1.094v3.193h-1.094V65.433zM89.954 63.326h-1.51v-3.194h1.51V63.326zM86.782 63.326h-1.179v-3.194h1.179V63.326zM83.941 60.132v3.194h-1.455v-3.194H83.941zM84.495 65.433v3.193h-1.559v-3.193H84.495zM83.595 75.341v3.193h-1.178v-3.193H83.595zM85.015 80.3v3.193h-1.178V80.3H85.015zM86.678 80.3h1.108v3.193h-1.108V80.3zM86.852 73.58v-3.193h1.767v3.193H86.852zM72.022 58.285v-3.193h10.083v3.193H72.022zM83.768 55.092h1.594v3.193h-1.594V55.092zM87.891 48.561h-1.178v-3.188h1.178V48.561zM85.05 48.561h-1.213v-3.188h1.213V48.561zM85.119 50.23v3.188h-1.386V50.23H85.119zM87.024 55.092h1.767v3.193h-1.767V55.092zM92.76 58.285h-2.306v-3.193h2.306V58.285zM88.88 53.418h-2.098V50.23h2.098V53.418zM90.682 48.568h-1.128v-3.194h1.128V48.568zM69.944 45.374h12.229v3.188H69.944V45.374zM68.143 50.224h1.46c.021.001.042.006.063.006H82.07v3.188H68.143V50.224zM69.217 60.132h11.606v3.194H69.217V60.132zM69.944 65.433h11.329v3.193H69.944V65.433zM68.801 75.341h11.953v3.193H68.801V75.341zM70.601 80.3h11.573v3.193H70.601V80.3zM91.339 83.493h-1.89V80.3h1.89V83.493zM93.418 73.58h-3.137v-3.193h3.137V73.58zM61.408 68.724h-1.352v-3.569c0-.54-.314-1.005-.768-1.233.024-.103.04-.208.04-.318v-3.654h1.421c.764 0 1.386-.622 1.386-1.386v-3.749c0-.764-.622-1.385-1.386-1.385H39.458c-.764 0-1.385.621-1.385 1.385v3.655h-1.421c-.764 0-1.385.622-1.385 1.386v3.748c0 .542.314 1.006.768 1.234-.024.103-.041.208-.041.317v3.749c0 .765.622 1.386 1.385 1.386h1.352v3.389h-2.495c-.764 0-1.385.621-1.385 1.386v3.748c0 .764.622 1.386 1.385 1.386h.415v3.573c0 .765.622 1.386 1.385 1.386h21.292c.765 0 1.386-.621 1.386-1.386v-3.748c0-.764-.621-1.386-1.386-1.386h-.414v-3.394h2.494c.764 0 1.386-.622 1.386-1.386v-3.748C62.794 69.345 62.172 68.724 61.408 68.724zM54.459 78.534h-1.385v-3.193h1.385V78.534zM56.122 75.341h1.129v3.193h-1.129V75.341zM53.593 70.387h1.629v3.193h-1.629V70.387zM51.931 73.58H40.394v-3.193h11.537V73.58zM52.207 68.626v-3.193h1.456v3.193H52.207zM55.326 65.433h3.067v3.193h-3.067V65.433zM57.666 63.326h-1.163v-3.194h1.163V63.326zM54.84 63.326h-1.523v-3.194h1.523V63.326zM56.434 58.285v-3.193h1.282v3.193H56.434zM54.771 58.285h-1.282v-3.193h1.282V58.285zM51.653 60.132v3.194h-1.351v-3.194H51.653zM50.544 65.433v3.193h-1.316v-3.193H50.544zM51.411 75.341v3.193h-1.49v-3.193H51.411zM52.935 80.3v3.193h-1.386V80.3H52.935zM54.598 80.3h1.455v3.193h-1.455V80.3zM56.884 73.58v-3.193h1.352v3.193H56.884zM60.473 58.285h-1.094v-3.193h1.094V58.285zM39.735 55.092h12.091v3.193H39.735V55.092zM36.929 60.132h11.71v3.194h-11.71V60.132zM37.657 65.433h9.909v3.193h-9.909V65.433zM36.514 75.341h11.745v3.193H36.514V75.341zM38.314 80.3h11.572v3.193H38.314V80.3zM59.051 83.493h-1.335V80.3h1.335V83.493zM61.131 73.58h-1.232v-3.193h1.232V73.58zM29.396 78.637h-.415v-3.573c0-.765-.622-1.386-1.386-1.386H6.304c-.764 0-1.385.621-1.385 1.386v3.748c0 .764.622 1.386 1.385 1.386h.415v3.573c0 .765.622 1.386 1.385 1.386h21.292c.764 0 1.386-.621 1.386-1.386v-3.748C30.782 79.259 30.161 78.637 29.396 78.637zM22.691 78.534v-3.193h1.421v3.193H22.691zM21.028 78.534h-1.766v-3.193h1.766V78.534zM22.138 80.3v3.193h-1.212V80.3H22.138zM23.801 80.3h1.767v3.193h-1.767V80.3zM27.319 78.534h-1.543v-3.193h1.543V78.534zM6.582 75.341H17.6v3.193H6.582V75.341zM8.382 80.3h10.88v3.193H8.382V80.3zM29.119 83.493H27.23V80.3h1.889V83.493zM11.015 59.369c.215 0 .432-.063.623-.192l32.54-22.159 8.382 5.449c.413.269.956.233 1.331-.093l27.041-23.489-.312 8.876c-.021.612.457 1.125 1.068 1.147.014 0 .026 0 .04 0 .594 0 1.086-.471 1.107-1.069l.416-11.848c.01-.3-.103-.593-.312-.809s-.496-.338-.797-.338H70.296c-.612 0-1.109.496-1.109 1.108s.497 1.109 1.109 1.109h9.354L53.067 40.153l-8.3-5.396c-.374-.244-.858-.237-1.228.013l-33.15 22.575c-.506.345-.636 1.034-.292 1.54C10.312 59.2 10.66 59.369 11.015 59.369z' }),
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
