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
import { isBlobURL } from "@wordpress/blob";
import {
    Spinner,
    withNotices,
    Toolbar,
    IconButton,
    PanelBody,
    TextareaControl,
} from "@wordpress/components";

class VerticalSliderSlideEdit extends Component {
    componentDidMount() {
        const { attributes, setAttributes } = this.props;
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
    onChangeSubtitle = subtitle => {
        this.props.setAttributes({ subtitle });
    };
    onChangeHeading = heading => {
        this.props.setAttributes({ heading });
    };
    onChangeInfo = info => {
        this.props.setAttributes({ info });
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
    updatePostUrl = postUrl => {
        this.props.setAttributes({
            postUrl
        });
    };
    updatePostField = postField => {
        this.props.setAttributes({
            postField
        });
    };
    render() {
        const { className, attributes, noticeUI } = this.props;
        const { title, subtitle, heading, info, url, alt, id, postUrl, postField } = attributes;
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
                            <div className={ "wp-block-iqor-blocks-home-vertical-slider-slide__image" }>
                                <img src={url} alt={alt} />
                                { isBlobURL(url) && <Spinner /> }
                            </div>
                        </>
                    ) : (
                        <MediaPlaceholder
                            className={ "wp-block-iqor-blocks-home-vertical-slider-slide__image-placeholder" }
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
                        className={ "wp-block-iqor-blocks-home-vertical-slider-slide__title" }
                        tagName="h1"
                        onChange={ this.onChangeTitle }
                        value={ title }
                        placeholder={ __("Smile", "iqor-blocks") }
                        
                    />
                    <RichText
                        className={ "wp-block-iqor-blocks-home-vertical-slider-slide__subtitle" }
                        tagName="h3"
                        onChange={ this.onChangeSubtitle }
                        value={ subtitle }
                        placeholder={ __("With iQor ", "iqor-blocks") }
                        
                    />
                    <RichText
                        className={ "wp-block-iqor-blocks-home-vertical-slider-slide__heading" }
                        tagName="h4"
                        onChange={ this.onChangeHeading }
                        value={ heading }
                        placeholder={ __("Heading..", "iqor-blocks") }
                    />
                     <RichText
                        className={ "wp-block-iqor-blocks-home-vertical-slider-slide__info" }
                        onChange={ this.onChangeInfo }
                        value={ info }
                        placeholder={ __("Lorem ipsum..", "iqor-blocks") }
                    />
                    <div className={ "wp-block-iqor-blocks-home-vertical-slider-slide__content-placeholder" }>
                        {!postField &&
                            <p className={ "wp-block-iqor-blocks-home-vertical-slider-slide__content-field-text" }>Enter text which will redirect to the post:</p>
                        }
                        <RichText
                            className={ "wp-block-iqor-blocks-home-vertical-slider-slide__content-text" }
                            tagName="p"
                            onChange={ this.updatePostField }
                            value={ postField }
                            label="Text to redirect to post"
                            placeholder={ __("Learn More", "iqor-blocks") }
                        />
                        {!postUrl &&
                            <p className={ "wp-block-iqor-blocks-home-vertical-slider-slide__content-field-url" }>Enter Post URL:</p>
                        }
                        <RichText
                            className={ "wp-block-iqor-blocks-home-vertical-slider-slide__content-url" }
                            tagName="p"
                            onChange={ this.updatePostUrl }
                            value={ postUrl }
                            label="URL to redirect to post"
                            placeholder={ __("http://xyz.com/project/post.php?post=1", "iqor-blocks") }
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default withNotices(VerticalSliderSlideEdit);