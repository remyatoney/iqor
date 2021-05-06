import { Component } from "@wordpress/element";
import {
    RichText,
    MediaPlaceholder,
    BlockControls,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import { decodeEntities } from "@wordpress/html-entities";
import { isBlobURL } from "@wordpress/blob";
import {
    Spinner,
    withNotices,
    Toolbar,
    IconButton,
    PanelBody,
    TextareaControl,
} from "@wordpress/components";

class HeadlinesMainEdit extends Component {
    componentDidMount() {
        const { attributes, setAttributes, headlines, className } = this.props;
        console.log(this.props);
        const { url, id } = attributes;
        if (url && isBlobURL(url) && !id) {
            setAttributes({
                url: "",
                alt: ""
            });
        }
    };
    onChangeTitle = title => {
        this.props.setAttributes({ title });
    };
    onSelectImage = ({ id, url, alt }) => {
        this.props.setAttributes({
            id,
            url,
            alt
        });
    };
    onSelectURL = url => {
        this.props.setAttributes({
            id: null,
            url,
            alt: ""
        });
    };
    onUploadError = message => {
        const { noticeOperations } = this.props;
        noticeOperations.createErrorNotice(message);
    };
    removeImage = () => {
        this.props.setAttributes({
            id: null,
            url: "",
            alt: ""
        });
    };
    updateAlt = alt => {
        this.props.setAttributes({
            alt
        });
    };
    render() {
        const { className, attributes, noticeUI } = this.props;
        const { title, heading, url, alt, id} = attributes;
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__("Image Settings", "iqor-blocks")}>
                        {url && !isBlobURL(url) && (
                            <TextareaControl
                                label={__(
                                    "Alt Text (Alternative Text)",
                                    "iqor-blocks"
                                )}
                                value={alt}
                                onChange={this.updateAlt}
                                help={__(
                                    "Alternative text describes your image to people who can't see it. Add a short description with its key details."
                                )}
                            />
                        )}
                    </PanelBody>
                </InspectorControls>
                <BlockControls>
                    {url && (
                        <Toolbar>
                            {id && (
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={this.onSelectImage}
                                        allowedTypes={["image"]}
                                        value={id}
                                        render={({ open }) => {
                                            return (
                                                <IconButton
                                                    className="components-icon-button components-toolbar__control"
                                                    label={__(
                                                        "Edit Image",
                                                        "iqor-blocks"
                                                    )}
                                                    onClick={open}
                                                    icon="edit"
                                                />
                                            );
                                        }}
                                    />
                                </MediaUploadCheck>
                            )}
                            <IconButton
                                className="components-icon-button components-toolbar__control"
                                label={ __("Remove Image", "iqor-blocks") }
                                onClick={ this.removeImage }
                                icon="trash"
                            />
                        </Toolbar>
                    )}
                </BlockControls>
                <div className={className}>
                    { url ? (
                        <>
                            <div className={ "wp-block-iqor-blocks-home-headlines-main__image" }>
                                <img src={url} alt={alt} />
                                { isBlobURL(url) && <Spinner /> }
                            </div>
                        </>
                    ) : (
                        <MediaPlaceholder
                            className={ "wp-block-iqor-blocks-home-headlines-main__image-placeholder" }
                            labels = { { title: 'Upload Image' } }
                            icon="format-image"
                            onSelect={ this.onSelectImage }
                            onSelectURL={ this.onSelectURL }
                            onError={ this.onUploadError }
                            allowedTypes={ ["image"] }
                            notices={ noticeUI }
                        />
                    ) }
                    <RichText
                        className={ "wp-block-iqor-blocks-home-headlines-main__title" }
                        tagName="h6"
                        onChange={ this.onChangeTitle }
                        value={ title }
                        placeholder={ __("HEADLINES", "iqor-blocks") }
                        
                    />
                </div>
            </>
        );
    }
}

export default withNotices(HeadlinesMainEdit);