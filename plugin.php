<?php

/**
 * Plugin Name: custom_iqor_plugin
 * Description: blocks for iqor
 * Author: remya.toney@whiterabbit.group
 */

if(! defined('ABSPATH')) {
    exit;
}

// Our custom post type function for headlines
function create_posttype() {
 
    register_post_type( 'headlines',
    // CPT Options
        array(
            'labels' => array(
                'name' => __( 'Headlines' ),
                'singular_name' => __( 'Headline' )
			),
			'supports' => array( 'title', 'editor', 'excerpt', 'author', 'thumbnail', 'comments', 'revisions', 'custom-fields'),
            'public' => true,
			'has_archive' => true,
            'menu_icon' => 'dashicons-text-page',
            'rewrite' => array('slug' => 'headlines'),
            'show_in_rest' => true,
        )
    );
}
// Hooking up our function to theme setup
add_action( 'init', 'create_posttype' );

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
    iqor_blocks_register_block_type('home-horizontal-slider');
    iqor_blocks_register_block_type('home-functionalities');
    iqor_blocks_register_block_type('home-vertical-slider');
    iqor_blocks_register_block_type('home-headlines');
    iqor_blocks_register_block_type('home-headlines-headline', 
        array(
            'render_callback' => 'iqor_blocks_render_latest_headlines_block',
            'attributes'=> array(
                'numberOfPosts' => array(
                    'type' => 'number',
                    'default'=> 3
                )
            )
        )
    );
}
add_action('init', 'iqor_blocks_register');

function iqor_blocks_render_latest_headlines_block($attributes){
    $args = array(
        'post_type'         =>      'headlines',
        'posts_per_page'    =>      $attributes['numberOfPosts'],
        'post_status'       =>      'publish',
    );
    $query = new WP_Query($args);
    $posts = '';

    if($query->have_posts()) {
        $posts .= '<ul class="wp-block-iqor_blocks-latest-headlines">';
        while ($query->have_posts()) {
            $query->the_post();
            $posts .= '<li><a href="' .esc_url(get_the_permalink()) . '">'
            . get_the_title() . '</a></li>';
        }
        $posts .= '</ul>';
        wp_reset_postdata();
        return $posts;
    } else {
        return '<div class="wp-block-iqor_blocks-no-headlines">' . __('No Headlines Found', "iqor_blocks") . '</div>';
    }
} 