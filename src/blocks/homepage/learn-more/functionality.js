import edit from './edit-functionality';
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText, InnerBlocks } from "@wordpress/block-editor";

const attributes = {
    title: {
        type: "string",
        source: "html",
        selector: "h3"
    },
    content: {
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

registerBlockType("iqor-blocks/home-functionality", {
    title: __("Homepage Functionality", "iqor-blocks"),

    description: __("Block showing a single functions performed by iQor.", "iqor-blocks"),

    icon: "welcome-write-blog",

    parent: ["iqor-blocks/home-functionalities"],

    category: "iqor-category",

    keywords: [ __("learn", "iqor-blocks"), __("more", "iqor-blocks"), __("what", "iqor-blocks") ],

    attributes,
    
    edit,

    save({ attributes, className }) {
        const { title, content, url, alt, id, postField, postUrl } = attributes;
        return (
            <div className={className}>
                { url && (
                    <div className={ "wp-block-iqor-blocks-home-functionality__image" }>
                        <img
                            src={ url }
                            alt={ alt } 
                        />
                    </div>
                ) }
                { title && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-functionality__title" }
                        tagName="h3"
                        value={ title }
                    />
                ) }
                { content && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-functionality__content" }
                        tagName="p"
                        value={ content }
                    />
                ) }
                { postField && postUrl && (
                    <a href={ postUrl }>
                        <RichText.Content
                            className={ "wp-block-iqor-blocks-home-functionality__content-text" }
                            value={ postField }
                        />
                    </a>
                ) }
            </div>
        );
    }
});