/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

import './amortization/block.js';
import './compound-annual-growth-rate/block.js';
import './compound-interest/block.js';

(function () {
    var el = wp.element.createElement;
    var SVG = wp.components.SVG;
    var svgIcon = el(
        SVG,
        { width: 20, height: 20, viewBox: '0 0 64 80' },
        el('path', { d: 'M34.598,28.962c-3.942-1.473-5.565-2.44-5.565-3.958c0-1.289,0.974-2.579,3.987-2.579c3.341,0,5.474,1.061,6.679,1.567 l1.344-5.203c-1.529-0.738-3.617-1.379-6.724-1.518v-4.052h-4.542v4.374c-4.961,0.967-7.838,4.142-7.838,8.194 c0,4.464,3.387,6.766,8.348,8.422c3.432,1.151,4.916,2.256,4.916,4.007c0,1.84-1.808,2.852-4.451,2.852 c-3.017,0-5.75-0.967-7.698-2.024l-1.393,5.386c1.763,1.012,4.776,1.84,7.883,1.979v4.37h4.546v-4.693 c5.331-0.922,8.253-4.419,8.253-8.516C42.341,33.426,40.113,30.896,34.598,28.962z' }),
        el('path', { d: 'M32,0C14.327,0,0,14.327,0,32c0,17.673,14.327,32,32,32c17.673,0,32-14.327,32-32C64,14.327,49.673,0,32,0z M32,59 C17.112,59,5,46.888,5,32C5,17.112,17.112,5,32,5c14.888,0,27,12.112,27,27C59,46.888,46.888,59,32,59z' }),
    );
    wp.blocks.updateCategory('financial_calculators', { icon: svgIcon });
})();