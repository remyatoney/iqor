import "./style.editor.scss";
import './functionality';
import './main';
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText, InnerBlocks } from "@wordpress/block-editor";

registerBlockType("iqor-blocks/home-functionalities", {
    title: __("Homepage Functionalities", "iqor-blocks"),

    description: __("Block showing various functions performed by iQor.", "iqor-blocks"),

    icon: "admin-multisite",

    category: "iqor-category",

    supports: {
        multiple: false
    },

    keywords: [ __("learn", "iqor-blocks"), __("more", "iqor-blocks"), __("what", "iqor-blocks") ],

    edit({ className }) {
        return (
            <div className={className}>
                <InnerBlocks
                    allowedBlocks={["iqor-blocks/home-functionality-main"], ["iqor-blocks/home-functionality"]}
                    template={[
                        ["iqor-blocks/home-functionality-main"],
                        ["iqor-blocks/home-functionality"],
                        ["iqor-blocks/home-functionality"],
                        ["iqor-blocks/home-functionality"],
                        ["iqor-blocks/home-functionality"],
                    ]}
                    templateLock="insert"
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