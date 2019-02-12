/**
 * BLOCK: twoplustwo
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

import FinanceAmortization from './component';

const el = wp.element.createElement;
const SVG = wp.components.SVG;
const svgIcon = el(SVG, { width: 20, height: 20, viewBox: '0 0 100 100' },
	el('path', { d: 'M59.8243561 54.4415894c-.3195801-.9751587-.7988281-1.6721191-1.9090576-1.6913452H48.982193h-.0330811-7.1275635c-1.1291504.0192261-1.611084.7161865-1.9169922 1.6913452l-2.5534668 6.8839722h11.5980225.0330811 13.401123L59.8243561 54.4415894zM63.1296539 64.680481c-1.5947266-.0109863-2.878418 1.3085327-2.8867188 2.9420166.0083008 1.625 1.2919922 2.9473877 2.8867188 2.9417114 1.5675049.0056763 2.8483887-1.3167114 2.8565674-2.9417114C65.9780426 65.9890137 64.6971588 64.6694946 63.1296539 64.680481zM36.6043854 64.680481c-1.5838623-.0109863-2.8675537 1.3085327-2.8590088 2.9420166-.0085449 1.625 1.2751465 2.9473877 2.8590088 2.9417114 1.5784912.0056763 2.859375-1.3167114 2.8565674-2.9417114C39.4637604 65.9890137 38.1828766 64.6694946 36.6043854 64.680481z' }),
	el('path', { d: 'M83.3131256,50.9457397l-29.8743896-24.46698c-2.046875-1.7871094-5.0991211-1.7871094-7.1459961,0L16.4319019,50.9338379 c-1.4337168,1.2518311-2.2564707,3.0623169-2.2564707,4.9657593v34.1581421c0,1.5626221,1.2784424,2.8411865,2.8411875,2.8411865 H82.714859c1.5627441,0,2.8413086-1.2785645,2.8413086-2.8411865V55.8815918 C85.5561676,53.989624,84.7382965,52.1900635,83.3131256,50.9457397z M69.6223297,77.2772217v2.9778442 c0,1.7084961-1.3848877,3.0935059-3.0933838,3.0935059h-0.0301514c-1.7084961,0-3.0935059-1.3850098-3.0935059-3.0935059v-2.9778442 H48.982193H36.2961578v2.9778442c0,1.7084961-1.3850098,3.0935059-3.0935059,3.0935059 c-1.7084942,0-3.093504-1.3850098-3.093504-3.0935059v-2.9778442V66.1542969 c-0.0056152-2.9944458,2.3771954-4.5726318,3.7214336-4.7463989l3.3798828-8.7374268 c0.6499023-1.6749878,2.0301514-3.0963135,4.6359863-3.1098633h4.8591309h6.3781738h4.7709961 c2.6223145,0.0135498,4.0024414,1.4348755,4.6359863,3.1098633l3.3879395,8.7374268 c1.3525391,0.1737671,3.732666,1.7519531,3.7436523,4.7463989V77.2772217z' }),
	el('path', { d: 'M94.464859,42.7945557L52.3785553,7.9630127C51.64711,7.3577271,50.7507477,7.0787964,49.8657379,7.102478 c-0.8850098-0.0236816-1.78125,0.255249-2.5126953,0.8605347l-15.4559307,12.791626 c-0.7171631,0.5935059-1.8015137,0.0834351-1.8015137-0.8475342v-6.3713989c0-1.5626831-1.2784424-2.8412476-2.8411865-2.8412476 h-7.576416c-1.5626221,0-2.8411865,1.2785645-2.8411865,2.8412476v18.4498291c0,0.7811279-0.3482666,1.5215454-0.9500742,2.0195923 L5.2666178,42.7945557c-1.4890134,1.2322388-1.8992918,3.3985596-0.8532715,5.0238647 c1.2468262,1.9373169,3.8845215,2.3021851,5.6066895,0.876709l36.744751-30.4105835 c1.7991943-1.4890747,4.402832-1.4890747,6.2020264,0L89.711441,48.6951294 c1.7224121,1.4254761,4.3601074,1.0606079,5.6068115-0.876709C96.3642731,46.1931152,95.9538727,44.0267944,94.464859,42.7945557z' }),
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
