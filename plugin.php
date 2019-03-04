<?php
/**
 * Plugin Name: Two + Two
 * Plugin URI: https://github.com/sortabrilliant/twoplustwo/
 * Description: Finance calculations
 * Author: sortabrilliant
 * Author URI: https://sortabrilliant.com/twoplustwo
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package SBB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'TWOPLUSTWO_VERSION', '1.0.0' );
define( 'TWOPLUSTWO_PLUGIN_DIR', dirname( __FILE__ ) );
define( 'TWOPLUSTWO_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
