import "./style.editor.scss";
import './child-top';
import './child-headline-main';
import './child-headline';
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText, InnerBlocks } from "@wordpress/block-editor";

registerBlockType("iqor-blocks/home-headlines", {
    title: __("Homepage Headlines", "iqor-blocks"),

    description: __("Block showing latest headlines.", "iqor-blocks"),

    icon: "welcome-widgets-menus",

    category: "iqor-category",

    supports: {
        multiple: false
    },

    keywords: [ __("news", "iqor-blocks"), __("press", "iqor-blocks"), __("latest", "iqor-blocks") ],

    edit({ className }) {
        return (
            <div className={className}>
                <InnerBlocks
                    allowedBlocks={["iqor-blocks/home-headlines-top"], ["iqor-blocks/home-headlines-main"], ["iqor-blocks/home-headlines-headline"]}
                    template={[
                        ["iqor-blocks/home-headlines-top"],
                        ["iqor-blocks/home-headlines-main"],
                        ["iqor-blocks/home-headlines-headline"],
                    ]}
                    templateLock="all"
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