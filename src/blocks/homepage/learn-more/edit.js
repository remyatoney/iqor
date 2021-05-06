import { Component } from "@wordpress/element";
import {
    RichText,
    MediaPlaceholder,
    BlockControls,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls,
    InnerBlocks,
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

class FunctionalitiesEdit extends Component {
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
    onSelectIcon = ({ id, url, alt }) => {
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
    removeIcon = () => {
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
        const { title, heading, url, alt, id, animation } = attributes;
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__("Icon Settings", "iqor-blocks")}>
                        {url && !isBlobURL(url) && (
                            <TextareaControl
                                label={__(
                                    "Alt Text (Alternative Text)",
                                    "iqor-blocks"
                                )}
                                value={alt}
                                onChange={this.updateAlt}
                                help={__(
                                    "Alternative text describes your icon to people who can't see it. Add a short description with its key details."
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
                                        onSelect={this.onSelectIcon}
                                        allowedTypes={["image"]}
                                        value={id}
                                        render={({ open }) => {
                                            return (
                                                <IconButton
                                                    className="components-icon-button components-toolbar__control"
                                                    label={__(
                                                        "Edit Icon",
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
                                label={ __("Remove Icon", "iqor-blocks") }
                                onClick={ this.removeIcon }
                                icon="trash"
                            />
                        </Toolbar>
                    )}
                </BlockControls>
                <div className={className}>
                    { url ? (
                        <>
                            <div className={ "wp-block-iqor-blocks-home-functionality-main__icon" }>
                                <img src={url} alt={alt} />
                                { isBlobURL(url) && <Spinner /> }
                            </div>
                        </>
                    ) : (
                        <MediaPlaceholder
                            className={ "wp-block-iqor-blocks-home-functionality-main__icon-placeholder" }
                            labels = { { title: 'Upload Icon' } }
                            icon="format-image"
                            onSelect={ this.onSelectIcon }
                            onSelectURL={ this.onSelectURL }
                            onError={ this.onUploadError }
                            allowedTypes={ ["image"] }
                            notices={ noticeUI }
                        />
                    ) }
                    <RichText
                        className={ "wp-block-iqor-blocks-home-functionality-main__title" }
                        tagName="h6"
                        onChange={ this.onChangeTitle }
                        value={ title }
                        placeholder={ __("WHAT WE DO", "iqor-blocks") }
                        
                    />
                    <RichText
                        className={ "wp-block-iqor-blocks-home-functionality-main__heading" }
                        tagName="h1"
                        onChange={ this.onChangeHeading }
                        value={ heading }
                        placeholder={ __("Heading", "iqor-blocks") }
                    />
                    <div className={ "wp-block-iqor-blocks-home-functionality-main__animation-placeholder" }>
                        {!animation &&
                            <p className={ "wp-block-iqor-blocks-home-functionality-main__animation-field" }>Enter Lottie Animation URL:</p>
                        }
                        <RichText
                            className={ "wp-block-iqor-blocks-home-functionality-main__animation-url-placeholder" }
                            onChange={ this.updateAnimation }
                            value={animation}
                            label="Lottie Animation URL"
                            placeholder={ __("https://assets4.lottiefiles.com/private_files/lf30_qaln3hii.json", "iqor-blocks") }
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default withNotices(FunctionalitiesEdit);