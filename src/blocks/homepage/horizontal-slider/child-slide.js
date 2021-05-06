import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import edit from "./edit-slide";
import { RichText } from "@wordpress/block-editor";

const attributes = {
    subtitle: {
        type: "string",
        source: "html",
        selector: "h3"
    },
    content: {
        type: "string",
        source: "html",
        selector: "p"
    },
    backgroundColor: {
        type: 'string',
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

registerBlockType("iqor-blocks/home-horizontal-slider-slide", {
    title: __("Homepage Horizontal Slider Slide", "iqor-blocks"),

    description: __("Block showing slide of homepage horizontal slider. ", "iqor-blocks"),

    icon: "welcome-add-page",

    parent: ["iqor-blocks/home-horizontal-slider"], //only displays team member block inside parent-team members block

    category: "iqor-category",

    keywords: [__("title", "iqor-blocks"), __("heading",  "iqor-blocks"), __("icon",  "iqor-blocks")],

    attributes,

    edit,

    save: ({ attributes, className }) => {
        const { subtitle, content, url, alt, id, backgroundColor } = attributes;

        return (
            <div className={className} style={{ backgroundColor: backgroundColor }}>
                { url && (
                    <div className={ "wp-block-iqor-blocks-home-horizontal-slider-slide__icon" }>
                        <img
                            src={ url }
                            alt={ alt } 
                        />
                    </div>
                ) }
                { subtitle && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-horizontal-slider-slide__subtitle" }
                        tagName="h3"
                        value={ subtitle }
                    />
                ) }
                { content && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-horizontal-slider-slide__content" }
                        tagName="p"
                        value={ content }
                    />
                ) } 
            </div>
        );
    }
});