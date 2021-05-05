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
    activity: {
        type: "string",
        source: "html",
        selector: "p"
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

registerBlockType("iqor-blocks/home-horizontal-slider-top", {
    title: __("Homepage Horizontal Slider Top", "iqor-blocks"),

    description: __("Block showing top portion of homepage horizontal slider. ", "iqor-blocks"),

    icon: "editor-textcolor",

    parent: ["iqor-blocks/home-horizontal-slider"], //only displays team member block inside parent-team members block

    category: "iqor-category",

    supports: {
        multiple: false
    },

    keywords: [__("title", "iqor-blocks"), __("heading",  "iqor-blocks"), __("icon",  "iqor-blocks")],

    attributes,

    edit,

    save: ({ attributes, className }) => {
        const { title, heading, activity, url, alt, id } = attributes;
        return (
            <div className={className}>
                { url && (
                    <div className={ "wp-block-iqor-blocks-home-horizontal-slider-top__icon" }>
                        <img
                            src={ url }
                            alt={ alt } 
                        />
                    </div>
                ) }
                { title && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-horizontal-slider-top__title" }
                        tagName="h6"
                        value={ title }
                    />
                ) }
                { heading && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-horizontal-slider-top__heading" }
                        tagName="h1"
                        value={ heading }
                    />
                ) } 
                { activity && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-horizontal-slider-top__activity" }
                        tagName="p"
                        value={ activity }
                    />
                ) }
                <span className="wp-block-iqor-blocks-home-horizontal-slider-top__left-arrow dashicons dashicons-arrow-left-alt"></span>
                <span className="wp-block-iqor-blocks-home-horizontal-slider-top__right-arrow dashicons dashicons-arrow-right-alt"></span>
            </div>
        );
    }
});