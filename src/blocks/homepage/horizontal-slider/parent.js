import { registerBlockType, createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { InnerBlocks, InspectorControls } from "@wordpress/block-editor";
import { panelBody, RangeControl } from "@wordpress/components";

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

registerBlockType("iqor-blocks/home-horizontal-slider", {
    title: __("Homepage Horizontal Slider", "iqor-blocks"),

    description: __("Block showing a Team Members.", "iqor-blocks"),

    icon: "grid-view",

    category: "iqor-category",

    // keywords: [__("home", "iqor-blocks"), __("intro",  "iqor-blocks")],


    attributes,

    edit({ className, attributes, setAttributes }) {
        const { title, heading, activity, id, alt, url } = attributes;
        const onChangeTitle = (title) => {
            setAttributes({ title });
        }
        const onChangeHeading = (heading) => { //shortcut instead of the the code written for the above content function
            setAttributes({ heading });
        }
        const onChangeActivity = (activity) => { 
            setAttributes({ activity });
        }
        const onSelectImage = ({ id, url, alt }) => { 
            setAttributes({ 
                id,
                url,
                alt 
            });
        }
        const onSelectURL = (url) => {
            setAttributes({
                url,
                id: null,
                alt: ""
            });
        };
        const onUploadError = (message) => {
            const { noticeOperations } = props;
            noticeOperations.createErrorNotice(message);
        };
        const removeImage = () => {
            setAttributes({
                id: null,
                url: "",
                alt: ""
            });
        };
        const updateAlt = (alt) => {
            setAttributes({ alt });
        };

        return (
            <>  
                
            </>
        )
    },
    save({ attributes }) {
        const { title, heading, activity, id, alt, url } = attributes;
        return (
            <div className={`has-${columns}-columns`}>
                <InnerBlocks.Content />
            </div>
        );
    }
});