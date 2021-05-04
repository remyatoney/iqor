import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import edit from "./edit";
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
    animation: {
        type: "string"
    }
};

registerBlockType("iqor-blocks/home-intro", {
    title: __("Homepage Introduction", "iqor-blocks"),

    description: __(" Block showind introduction of iQor. ", "iqor-blocks"),

    icon: "yes-alt",

    category: "iqor-category",

    // keywords: [__("home", "iqor-blocks"), __("intro",  "iqor-blocks")],

    attributes,

    edit,

    save: ({ attributes }) => {
        const { title, heading, info, url, alt, id, animation } = attributes;
        console.log(heading);
        return (
            <div>
                
                { url && (
                    <div className={ "wp-block-iqor-blocks-home-intro__icon" }>
                        <img
                            src={ url }
                            alt={ alt } 
                            className={ id ? `wp-image-${id}` : null }
                        />
                    </div>
                ) }
                { title && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-intro__title" }
                        tagName="h6"
                        value={ title }
                    />
                ) }
                { heading && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-intro__heading" }
                        tagName="h1"
                        value={ heading }
                    />
                ) } 
                { info && (
                    <RichText.Content
                        className={ "wp-block-iqor-blocks-home-intro__info" }
                        tagName="p"
                        value={ info }
                    />
                ) }
                <div className={ "wp-block-iqor-blocks-home-intro__animation" }>
                    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
                    <lottie-player src={ animation }  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>
                </div>
            </div>
        );
    }

});