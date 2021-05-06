import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import edit from "./edit-headline-main";
import { RichText } from "@wordpress/block-editor";

const attributes = {
    title: {
        type: "string",
        source: "html",
        selector: "h6"
    },
    id: {
        type: "number"
    },
    alt: {
        type: "string",
        source: "attribute",
        selector: "img",
        attribute: "alt",
        default: ""
    },
    url: {
        type: "string",
        source: "attribute",
        selector: "img",
        attribute: "src"
    }
};

registerBlockType("iqor-blocks/home-headlines-main", {
    title: __("Homepage Headlines Main", "iqor-blocks"),

    description: __("BLock showing the latest headlines.", "iqor-blocks"),

    icon: "media-text",

    parent: ["iqor-blocks/home-headlines"],

    supports: {
        multiple: false
    },

    category: "iqor-category",

    attributes,

    edit,

    save: ({ attributes, className }) => {
        const { title, url, alt, id } = attributes;
        return (
            <div className={className}>
                { url && (
                    <div className={ "wp-block-iqor-blocks-home-headlines-main__image" }>
                        <img
                            src={ url }
                            alt={ alt } 
                        />
                    </div>
                ) }
                { title && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-headlines-main__title" }
                        tagName="h6"
                        value={ title }
                    />
                ) }
            </div>
        );
    }
});