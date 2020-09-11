export enum StyleClass {
    Active = 'active',
    Valid = 'valid',
    Invalid = 'invalid',
    Disabled = 'disabled',
    Selected = 'selected',
    WithIcon = 'withIcon',
    Empty = 'empty'
};

export enum FileInputType {
    Input = 'input',
    Inline = 'inline'
};

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST'
}

export enum ComponentSizeType {
    Small = 'small',
    Medium = 'medium',
    Large = 'large'
};

export class CommonConstants {
    static DEFAULT_ERROR_MESSAGE = 'Invalid value';
    static COMMON_TEXT_DELIMETER = '/';

    static MIN_LENGTH_VALIDATOR_KEY = 'minlength';
    static MAX_LENGTH_VALIDATOR_KEY = 'maxlength';
    static BASE_REQUIRED_VALIDATOR_KEY = 'required';
    static TEXT_AREA_REQUIRED_VALIDATOR_KEY = 'textAreaRequired';

    static CSS_PIXELS = 'px';
    static CSS_WIDTH = 'width';
    static CSS_LEFT = 'left';
    static CSS_CLASS_FIXED = 'fixed';
    static CSS_CLASS_BACKGROUND = 'background';
    static CSS_CLASS_TOP = 'top';

    static GLOBAL_LOADER_ID = 'global';
    static SECONDARY_LOADER_ID = 'secondary';
    static NOT_FOUND_INDEX = -1;

    static ENTER_KEY_CODE = 13;
    static BACKSPACE_KEY_CODE = 8;

    static SELECT_INPUT = {
        // class name for group option
        OPT_GROUP_OPTION_CLASS: "optgroup-option",

        // class name for group deliminator
        OPT_GROUP_CLASS: "optgroup",

        DEFAULT_OPTION_VALUE: "Choose your option"
    }
}