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

function setup( $metadata_url, $full_path, $slug = '' ) {
	add_action( 'rest_api_init', __NAMESPACE__ . '\\add_routes' );
	add_action( 'admin_footer', __NAMESPACE__ . '\\localize_script' );

	if ( get_option( 'sortabrilliant_updater' ) ) {
		require_once plugin_dir_path( __FILE__ ) . 'plugin-update-checker/plugin-update-checker.php';
		$updater = \Puc_v4_Factory::buildUpdateChecker( $metadata_url, $full_path, $slug );
		$updater->getVcsApi()->enableReleaseAssets();
	}
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

function localize_script() {
	?>
	<script type="text/javascript">
	var sortabrilliant_updater = <?php echo wp_json_encode( array( 'subscribed' => get_option( 'sortabrilliant_updater' ) ) ); ?>;
	</script>
	<?php
}
