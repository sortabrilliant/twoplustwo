<?php
/**
 * Updater Initializer
 *
 * @since   1.0.0
 * @package sortabrilliant
 */

namespace SortaBrilliant\Updater;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function setup() {
	add_action( 'rest_api_init', __NAMESPACE__ . '\\add_routes' );
}

function add_routes() {
	register_rest_route(
		'sortabrilliant/v1/updater',
		'/settings',
		[
			'methods'              => 'POST',
			'callback'             => __NAMESPACE__ . '\\update_settings',
			'args'                 => [
				'email_address' => [
					'type'              => 'string',
					'required'          => false,
					'sanitize_callback' => 'sanitize_text_field',
				],
			],
			'permissions_callback' => __NAMESPACE__ . '\\permissions',
		]
	);

	register_rest_route(
		'sortabrilliant/v1/updater',
		'/settings',
		[
			'methods'              => 'GET',
			'callback'             => __NAMESPACE__ . '\\get_settings',
			'args'                 => [],
			'permissions_callback' => __NAMESPACE__ . '\\permissions',
		]
	);
}

function permissions() {
	return current_user_can( 'manage_options' );
}

function update_settings( \WP_REST_Request $request ) {
	return rest_ensure_response(
		update_option( 'sortabrilliant_updater', $request->get_param( 'email_address' ) )
	)->set_status( 201 );
}

function get_settings( \WP_REST_Request $request ) {
	return rest_ensure_response(
		get_option( 'sortabrilliant_updater' )
	);
}
