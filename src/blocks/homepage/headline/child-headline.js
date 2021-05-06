import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

registerBlockType("iqor-blocks/home-headlines-headline", {
    title: __("Latest headlines", "iqor-blocks"),

    description: __("BLock showing the latest posts.", "iqor-blocks"),

    icon: "admin-post",
    
    parent: ["iqor-blocks/home-headlines"],

    supports: {
        multiple: false
    },

    category: "iqor-category",

    save() {
        return null;
    }
});