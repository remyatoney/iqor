import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import edit from './edit';
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
    },
    animation: {
        type: "string"
    }
};

registerBlockType("iqor-blocks/home-functionality-main", {
    title: __("Homepage Main Section", "iqor-blocks"),

    description: __("Block showing main section of functionalities block.", "iqor-blocks"),

    icon: "editor-textcolor",

    parent: ["iqor-blocks/home-functionalities"],

    category: "iqor-category",

    supports: {
        multiple: false
    },

    keywords: [ __("learn", "iqor-blocks"), __("more", "iqor-blocks"), __("what", "iqor-blocks") ],

    attributes,
    
    edit,

    save: ({ attributes, className }) => {
        const { title, heading, url, alt, id, animation } = attributes;
        return (
            <div className={className}>
                { url && (
                    <div className={ "wp-block-iqor-blocks-home-functionality-main__icon" }>
                        <img
                            src={ url }
                            alt={ alt } 
                        />
                    </div>
                ) }
                { title && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-functionality-main__title" }
                        tagName="h6"
                        value={ title }
                    />
                ) }
                { heading && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-functionality-main__heading" }
                        tagName="h1"
                        value={ heading }
                    />
                ) } 
                <div className={ "wp-block-iqor-blocks-home-functionality-main__animation" }>
                    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
                    <lottie-player src={ animation }  background="transparent"  speed="1" loop autoplay></lottie-player>
                </div>
            </div>
        );
    }
});