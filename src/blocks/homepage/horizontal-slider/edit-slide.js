import { Component } from "@wordpress/element";
import {
    RichText,
    MediaPlaceholder,
    BlockControls,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls,
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

class HorizonatalSliderSlideEdit extends Component {
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
    onChangeSubtitle = subtitle => {
        this.props.setAttributes({ subtitle });
    };
    onChangeContent = content => {
        this.props.setAttributes({ content });
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
    render() {
        const { className, attributes, noticeUI } = this.props;
        const { subtitle, content, url, alt, id } = attributes;
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
                                    "Alternative text describes your icon to people can't see it. Add a short description with its key details."
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
                <div className="{className}">
                    { url ? (
                        <>
                            <div className={ "wp-block-iqor-blocks-home-horizontal-slider-slide__icon" }>
                                <img src={url} alt={alt} />
                                { isBlobURL(url) && <Spinner /> }
                            </div>
                        </>
                    ) : (
                        <MediaPlaceholder
                            className={ "wp-block-iqor-blocks-home-horizontal-slider-slide__icon-placeholder" }
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
                        className={ "wp-block-iqor-blocks-home-horizontal-slider-slide__subtitle" }
                        tagName="h3"
                        onChange={ this.onChangeSubtitle }
                        value={ subtitle }
                        placeholder={ __("Subtitle", "iqor-blocks") }
                    />
                    <RichText
                        className={ "wp-block-iqor-blocks-home-horizontal-slider-slide__content" }
                        tagName="p"
                        onChange={ this.onChangeContent }
                        value={ content }
                        placeholder={ __("Lorem Ipsum", "iqor-blocks") }
                    />
                </div>
            </>
        );
    }
}

export default withNotices(HorizonatalSliderSlideEdit);