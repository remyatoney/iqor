import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import edit from "./edit-top";
import { RichText } from "@wordpress/block-editor";

const attributes = {
    title: {
        type: "string",
        source: "html",
        selector: "h6"
    },
    heading: {
        type: "string",
        source: "html",
        selector: "h1"
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

registerBlockType("iqor-blocks/home-headlines-top", {
    title: __("Homepage Headlines Top", "iqor-blocks"),

    description: __("Block showing top portion of headlines. ", "iqor-blocks"),

    icon: "editor-textcolor",

    parent: ["iqor-blocks/home-headlines"],

    supports: {
        multiple: false
    },
    
    category: "iqor-category",

    attributes,

    edit,

    save: ({ attributes, className }) => {
        const { title, heading, url, alt, id } = attributes;
        return (
            <div className={className}>
                { url && (
                    <div className={ "wp-block-iqor-blocks-home-headlines-top__icon" }>
                        <img
                            src={ url }
                            alt={ alt } 
                        />
                    </div>
                ) }
                { title && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-headlines-top__title" }
                        tagName="h6"
                        value={ title }
                    />
                ) }
                { heading && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-headlines-top__heading" }
                        tagName="h1"
                        value={ heading }
                    />
                ) } 
            </div>
        );
    }

});