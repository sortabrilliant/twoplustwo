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

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
