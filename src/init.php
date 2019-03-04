<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package SBB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function twoplustwo_sbb_block_assets() { // phpcs:ignore
	// Scripts.
	wp_enqueue_script(
		'twoplustwo-sbb-frontend-js',
		plugins_url( '/dist/frontend.build.js', dirname( __FILE__ ) ),
		array( 'wp-i18n', 'wp-element', 'wp-components' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/frontend.build.js' ),
		true
	);

	// Styles.
	wp_enqueue_style(
		'twoplustwo-sbb-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-editor', 'wp-components' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )
	);
}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'twoplustwo_sbb_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function twoplustwo_sbb_editor_assets() { // phpcs:ignore
	// Scripts.
	wp_enqueue_script(
		'twoplustwo-sbb-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components', 'wp-data' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ),
		true
	);

	// Styles.
	wp_enqueue_style(
		'twoplustwo-sbb-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' )
	);
}

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'twoplustwo_sbb_editor_assets' );

/**
 * Add a block category for all of our finance blocks.
 */
function twoplustwo_sbb_block_categories( $categories ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'financial_calculators',
				'title' => __( 'Finance Calculators', 'twoplustwo' ),
				'icon'  => 'wordpress',
			),
		)
	);
}
add_filter( 'block_categories', 'twoplustwo_sbb_block_categories' );

function twoplustwo_sbb_updater() {
	require_once TWOPLUSTWO_PLUGIN_DIR . '/src/updater.php';
	\SortaBrilliant\Updater\setup();
}
add_action( 'init', 'twoplustwo_sbb_updater' );
