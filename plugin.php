<?php

/**
 * Plugin Name: custom_iqor_plugin
 * Description: blocks for iqor
 * Author: remya.toney@whiterabbit.group
 */

if(! defined('ABSPATH')) {
    exit;
}

function iqor_blocks_categories( $categories, $post ) {
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'iqor-category',
                'title' => __('iQor Category', 'iqor-blocks'),
                'icon' => 'wordpress'
            )

        )
    );
}
add_filter('block_categories', 'iqor_blocks_categories', 10, 2); //10 being priority value and 2 number of arguments

function iqor_blocks_register_block_type($block, $options = array())  {
    register_block_type(
        'iqor-blocks/' . $block,
        array_merge(
            array(
                'editor_script' => 'iqor-blocks-editor-script',
                'editor_style' => 'iqor-blocks-editor-style',
                'script' => 'iqor-blocks-script',
                'style' => 'iqor-blocks-style'
            ),
            $options
        )
    );

}
function iqor_blocks_register() {

    wp_register_script(
        'iqor-blocks-editor-script',
        plugins_url('dist/editor.bundle.js', __FILE__),
        array('wp-blocks','wp-i18n', 'wp-element', 'wp-editor', 'wp-components','lodash','wp-blob','wp-data','wp-html-entities')
    );

    wp_register_script(
        'iqor-blocks-script',
        plugins_url('dist/script.bundle.js', __FILE__),
        array('jquery')
    );
    
    wp_register_style(
        'iqor-blocks-editor-style',
        plugins_url('dist/editor.bundle.css', __FILE__),
        array('wp-edit-blocks')
    );

    wp_register_style(
        'iqor-blocks-style',
        plugins_url('dist/style.bundle.css', __FILE__)
    );

    iqor_blocks_register_block_type('home-intro');
    // iqor_blocks_register_block_type('secondblock');
    // iqor_blocks_register_block_type('team-member');
    // iqor_blocks_register_block_type('team-members');
}
add_action('init', 'iqor_blocks_register');

