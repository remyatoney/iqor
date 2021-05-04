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

class IntroductionEdit extends Component {
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
    updateAnimation = animation => {
        this.props.setAttributes({
            animation
        });
    };
    render() {
        const { className, attributes, noticeUI } = this.props;
        const { title, heading, info, url, alt, id, animation } = attributes;
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
                                    "Alternative text describes your image to people can't see it. Add a short description with its key details."
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
                            <div className={ "wp-block-iqor-blocks-home-intro__icon" }>
                                <img src={url} alt={alt} />
                                { isBlobURL(url) && <Spinner /> }
                            </div>
                        </>
                    ) : (
                        <MediaPlaceholder
                            className={ "wp-block-iqor-blocks-home-intro__icon-placeholder" }
                            labels = { { title: 'Upload Icon Image' } }
                            icon="format-image"
                            onSelect={ this.onSelectImage }
                            onSelectURL={ this.onSelectURL }
                            onError={ this.onUploadError }
                            allowedTypes={ ["image"] }
                            notices={ noticeUI }
                        />
                    ) }
                    <RichText
                        className={ "wp-block-iqor-blocks-home-intro__title" }
                        tagName="h6"
                        onChange={ this.onChangeTitle }
                        value={ title }
                        placeholder={ __("INTRODUCTION", "iqor-blocks") }
                        formatingControls={ [] }
                    />
                    <RichText
                        className={ "wp-block-iqor-blocks-home-intro__heading" }
                        tagName="h1"
                        onChange={ this.onChangeHeading }
                        value={ heading }
                        placeholder={ __("Heading", "iqor-blocks") }
                        formatingControls={ [] }
                    />
                    <RichText
                        className={ "wp-block-iqor-blocks-home-intro__info" }
                        tagName="p"
                        onChange={ this.onChangeInfo }
                        value={info}
                        placeholder={ __("Info", "iqor-blocks") }
                        formatingControls={ [] }
                    />
                    <div className={ "wp-block-iqor-blocks-home-intro__animation-placeholder" }>
                        {!animation &&
                            <p>Enter Lottie Animation URL:</p>
                        }
                        <RichText
                            className={ "wp-block-iqor-blocks-home-intro__animation-url-placeholder" }
                            tagName="p"
                            onChange={ this.updateAnimation }
                            value={animation}
                            label="Lottie Animation URL"
                            placeholder={ __("https://assets4.lottiefiles.com/private_files/lf30_qaln3hii.json", "iqor-blocks") }
                            formatingControls={ [] }
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default withNotices(IntroductionEdit);