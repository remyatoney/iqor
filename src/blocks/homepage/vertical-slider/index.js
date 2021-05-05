import "./style.editor.scss";
import './slide';
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/block-editor";

registerBlockType("iqor-blocks/home-vertical-slider", {
    title: __("Homepage Vertical Slider", "iqor-blocks"),

    description: __("Block showing homepage vertical slider.", "iqor-blocks"),

    icon: "images-alt2",

    category: "iqor-category",

    supports: {
        multiple: false
    },

    keywords: [ __("carousel", "iqor-blocks"), __("features", "iqor-blocks") ],

    edit({ className }) {
        return (
            <div className={className}>
                <InnerBlocks
                    allowedBlocks={["iqor-blocks/home-vertical-slider-slide"]}
                    template={[
                        ["iqor-blocks/home-vertical-slider-slide"],
                        ["iqor-blocks/home-vertical-slider-slide"],
                        ["iqor-blocks/home-vertical-slider-slide"],
                        ["iqor-blocks/home-vertical-slider-slide"],
                    ]}
                />
            </div>
        );
    },

    save({ className }) {
        return (
            <div className={className}>
                <InnerBlocks.Content />
            </div>
        );
    }
});