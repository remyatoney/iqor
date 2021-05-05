import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import edit from "./edit-slide";
import { RichText } from "@wordpress/block-editor";

const attributes = {
    title: {
        type: "string",
        source: "html",
        selector: "h1"
    },
    subtitle: {
        type: "string",
        source: "html",
        selector: "h3"
    },
    heading: {
        type: "string",
        source: "html",
        selector: "h4"
    },
    info: {
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
    },
    postField: {
        type: "string"
    },
    postUrl: {
        type: "string"
    }
};

registerBlockType("iqor-blocks/home-vertical-slider-slide", {
    title: __("Homepage Vertical Slider Slide", "iqor-blocks"),

    description: __("Slide of vertical slider in the homepage", "iqor-blocks"),

    icon: "welcome-add-page",

    parent: ["iqor-blocks/home-vertical-slider"],

    category: "iqor-category",

    keywords: [__("smile", "iqor-blocks"), __("partner",  "iqor-blocks")],

    attributes,

    edit,

    save: ({ attributes, className }) => {
        const { title, subtitle, heading, info, url, alt, id, postField, postUrl } = attributes;
        return (
            <div className={className}>
                { url && (
                    <div className={ "wp-block-iqor-blocks-home-vertical-slider-slide__image" }>
                        <img
                            src={ url }
                            alt={ alt } 
                        />
                    </div>
                ) }
                { title && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-vertical-slider-slide__title" }
                        tagName="h1"
                        value={ title }
                    />
                ) }
                { subtitle && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-vertical-slider-slide__subtitle" }
                        tagName="h3"
                        value={ subtitle }
                    />
                ) }
                { heading && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-vertical-slider-slide__heading" }
                        tagName="h4"
                        value={ heading }
                    />
                ) } 
                { info && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-vertical-slider-slide__info" }
                        tagName="p"
                        value={ info }
                    />
                ) }
                { postField && postUrl && (
                    <a href={ postUrl } className="wp-block-iqor-blocks-home-vertical-slider-slide__button">
                        <RichText.Content
                            className={ "wp-block-iqor-blocks-home-vertical-slider-slide__content-text" }
                            value={ postField }
                        />
                        <span className="wp-block-iqor-blocks-home-vertical-slider-slide__right-arrow dashicons dashicons-arrow-right-alt"></span>
                    </a>

                ) }
                
            </div>
        );
    }

});