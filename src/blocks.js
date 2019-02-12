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
        { width: 20, height: 20, viewBox: '0 0 100 100' },
        el('path', { d: 'M88,17c0-2.8-2.2-5-5-5H17c-2.8,0-5,2.2-5,5v66c0,2.8,2.2,5,5,5h66c2.8,0,5-2.2,5-5V17z M84,17v31H52V16h31 C83.6,16,84,16.4,84,17z M17,16h31v32H16V17C16,16.4,16.4,16,17,16z M16,83V52h32v32H17C16.4,84,16,83.6,16,83z M83,84H52V52h32v31 C84,83.6,83.6,84,83,84z' }),
        el('path', { d: 'M40.4 64L33.7 64 33.7 57.4 29.7 57.4 29.7 64 23.1 64 23.1 68 29.7 68 29.7 74.7 33.7 74.7 33.7 68 40.4 68zM23.1 30.7H40.400000000000006V34.7H23.1zM58.7 70H76V74H58.7zM58.7 61H76V65H58.7zM59.8 37.4L62.6 40.2 67.4 35.5 72.1 40.2 74.9 37.4 70.2 32.7 74.9 28 72.1 25.1 67.4 29.8 62.6 25.1 59.8 28 64.5 32.7z' }),
    );
    wp.blocks.updateCategory('financial_calculators', { icon: svgIcon });
})();