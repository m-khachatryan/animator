/**
 * @class Animator
 */
class Animator {

    /**
     * @constructor
     *
     * @param el HTMLElement
     * @param {object|object[]} options - Animation properties and keyframes
     */
    constructor(el, options) {
        this._init(el, options);
    }

    /**
     * CSS keyframes name
     *
     * @return {string}
     */
    static get cssKeyframePrefix() {
        return '@keyframes';
    }

    /**
     * Get default id prefix
     *
     * @return {string} Default id prefix
     */
    static get cssIdPrefix() {
        return 'animator_';
    }

    /**
     * Get default css class prefix
     *
     * @return {string} Default class prefix
     */
    static get cssDefaultClassPrefix() {
        return 'animator-';
    }

    /**
     * Exception function
     *
     * @static
     * @private
     *
     * @param message
     */
    static _exception(message) {
        throw new Error(`Animator: ${message}`)
    }

    /**
     * Generate unique Id
     *
     * @static
     * @private
     *
     * @return {string} Unique Id
     */
    static getUniqueId() {
        return Math.random().toString(36).substring(2);
    }

    /**
     * Initialization
     *
     * @private
     *
     * @param el HTMLElement
     * @param {object|object[]} options - Animation properties and keyframes
     *
     */
    _init(el, options) {

        if (typeof el === 'string') {
            this.element = document.querySelector(el);
        } else if (el instanceof HTMLElement) {
            this.element = el;
        }

        if (!this.element) {
            Animator._exception(`Expected 'HTMLElement' element or 'string' query, but got ${typeof el}`);
        }

        this.id = Animator.getUniqueId();

        if (!this.element.id) {
            this.element.id = Animator.cssIdPrefix + this.id;
        }

        this.element.classList.add(Animator.cssDefaultClassPrefix + this.id);

        this.computedStyle = getComputedStyle(this.element);

        this.buildCssStylesheets(options);
    }

    /**
     * Build CSS styles and insert into html head
     *
     * @private
     *
     * @param {object|object[]} options - Animation properties and keyframes
     * @return {HTMLStyleElement} Style element with animation styles
     */
    buildCssStylesheets(options) {
        // ToDo: This function Can be simplified :)

        let keyframes = '';
        let cssProperties = 'animation: ';

        if (options instanceof Array) {
            let length = options.length;

            options.forEach((option, i) => {
                cssProperties += Animator._parseAnimationStyles(option, (length - 1) !== i);
                keyframes += Animator._parseKeyFrames(option);
            })
        } else if (options instanceof Object) {
            cssProperties += Animator._parseAnimationStyles(options, false);
            keyframes += Animator._parseKeyFrames(options);
        } else {
            Animator._exception('Provide right options.');
        }

        let stylesheet = `.${Animator.cssDefaultClassPrefix + this.id} {${cssProperties}} ${keyframes}`;

        Animator._insertIntoHtml(stylesheet);
    }

    /**
     * Parse keyframes object to CSS string
     *
     * @static
     * @private
     *
     * @param {object} options Keyframe options object
     *
     * @returns {string} CSS string
     */
    static _parseKeyFrames(options) {

        if (!options.name) {
            Animator._exception('Keyframes name is missing!');
        }

        let keyframes = options.keyframes;

        let keyframeList = Object.keys(keyframes).reduce((style, key) => {
            return style + ` ${key} { ${Animator._parseObjectToCssProperties(keyframes[key])} }`;
        }, '');

        return `${Animator.cssKeyframePrefix} ${options.name} { ${keyframeList} }`;
    }

    /**
     * Parse animation object to CSS animation
     *
     * @static
     * @private
     *
     * @param {object} options - Animation properties object
     * @param {boolean} multiple - True if several animation options. Default is false.
     *
     * @returns {string} CSS @keyframes string
     */
    static _parseAnimationStyles(options, multiple = false) {
        return options.name +
            ' ' + (options.duration || '') +
            ' ' + (options.timingFunction || '') +
            ' ' + (options.delay || '') +
            ' ' + (options.iterationCount || '') +
            ' ' + (options.direction || '') +
            ' ' + (options.fillMode || '') +
            ' ' + (options.playState || '') +
            (multiple ? ',' : ';' );
    }

    /**
     * Insert CSS string into Html head
     *
     * @static
     * @private
     *
     * @param {string} styles - CSS animation styles
     *
     * @returns {Element}
     */
    static _insertIntoHtml(styles) {
        let styleElement = document.createElement('style');
        styleElement.innerHTML = styles;

        document.head.appendChild(styleElement);

        return styleElement;
    }

    /**
     * Parse object to CSS properties
     *
     * @static
     * @private
     *
     * @param {object} properties - CSS properties
     *
     * @returns {string} CSS properties
     */
    static _parseObjectToCssProperties(properties) {
        return Object.keys(properties)
            .reduce((style, key) => style + `${key}: ${properties[key]};`, '');
    }

    /**
     * Play the animation
     *
     * @public
     *
     * @returns {object} Instance
     */
    play() {
        this.element.style.animationPlayState = 'running';
        return this;
    }

    /**
     * Pause the animation
     *
     * @public
     *
     * @returns {object} Instance
     */
    pause() {
        this.element.style.animationPlayState = 'paused';
        return this;
    }

    /**
     * Toggle animating state
     *
     * @public
     *
     * @returns {object} Instance
     */
    toggle() {
        return this.computedStyle.animationPlayState != 'running'
            ? this.play() :
            this.pause();
    }

    /**
     * Point to a specific state
     *
     * @public
     *
     * @param value
     * @return {object} Instance
     */
    seek(value) {
        this.element.style.animationDelay = value;
        return this;
    }
}