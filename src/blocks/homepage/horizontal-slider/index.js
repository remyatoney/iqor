import "./style.editor.scss";
import './child-top';
import './child-slide';
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/block-editor";

registerBlockType("iqor-blocks/home-horizontal-slider", {
    title: __("Homepage Horizontal Slider", "iqor-blocks"),

    description: __("Block showing homepage horizontal slider.", "iqor-blocks"),

    icon: "list-view",

    category: "iqor-category",

    supports: {
        multiple: false
    },

    keywords: [ __("carousel", "iqor-blocks"), __("features", "iqor-blocks") ],

    edit({ className }) {
        return (
            <div className={className}>
                <InnerBlocks
                    allowedBlocks={["iqor-blocks/home-horizontal-slider-top", "iqor-blocks/home-horizontal-slider-slide"]}
                    template={[
                        ["iqor-blocks/home-horizontal-slider-top"],
                        ["iqor-blocks/home-horizontal-slider-slide"]
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