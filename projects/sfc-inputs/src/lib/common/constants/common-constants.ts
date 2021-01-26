export enum StyleClass {
    Active = 'active',
    Valid = 'valid',
    Invalid = 'invalid',
    Disabled = 'disabled',
    Selected = 'selected',
    Empty = 'empty',
    Focus = 'focus',
    Open = 'open',
    Loading = 'loading'
};

export enum FileInputType {
    Input = 'input',
    Inline = 'inline'
};

export enum RadioButtonsInputLabelType {
    Circle = 'circle',
    Icons = 'icons'
};

export enum InputPosition {
    Horizontal = 'horizontal',
    Vertical = 'vertical'
};

export enum LoadDropdownPosition {
    Uppon = 'uppon',
    Below = 'below'
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

export enum IconType {
    Negative = 'fa fa-times',
    Positive = 'fa fa-check'
}

export enum TooltipType {
    Hover = 'hover',
    Click = 'click'
}

export enum LocationType {
    Top = 'top',
    Bottom = 'bottom',
    Left = 'left',
    Right = 'right'
}

export enum StarType {
    Highlighted = 'highlighted',
    HighlightedMax = 'highlighted-max',
    HighlightedMin = 'highlighted-min'
}

export enum DateTimeViewTypes {
    Calendar = 0,
    Hours = 1,
    Minutes = 2,
    Years = 3
}

export type ImageFormat = 'gif' | 'jpeg' | 'jpg' | 'tiff' | 'png' | 'webp' | 'bmp';

export enum CropperDragModes {
    Crop = 'crop',
    Move = 'move'
}

export class CommonConstants {
    static DEFAULT_ERROR_MESSAGE = 'Invalid value';
    static COMMON_TEXT_DELIMETER = '/';

    static MIN_LENGTH_VALIDATOR_KEY = 'minlength';
    static MAX_LENGTH_VALIDATOR_KEY = 'maxlength';
    static BASE_REQUIRED_VALIDATOR_KEY = 'required';
    static TEXT_AREA_REQUIRED_VALIDATOR_KEY = 'textAreaRequired';
    static DUPLICATE_VALIDATOR_KEY = 'sfc-duplicate';
    static EMPTY_VALIDATOR_KEY = 'sfc-empty';
    static MAX_VALIDATOR_KEY = 'sfc-max';
    static MIN_VALIDATOR_KEY = 'sfc-min';
    static DATA_VALIDATOR_KEY = 'sfc-data';
    static FORMAT_VALIDATOR_KEY = 'sfc-format';

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

    static DEFAULT_PAGE_SIZE = 5;

    static DAYS_IN_WEEK = 7;
    static HOURS_IN_SHORT_TIME = 12;
    static MINUTES_IN_HOUR = 60;
    static DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];
    static DAYS_OF_WEEK_3 = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    static SELECT_INPUT = {
        // class name for group option
        OPT_GROUP_OPTION_CLASS: "optgroup-option",

        // class name for group deliminator
        OPT_GROUP_CLASS: "optgroup",

        DEFAULT_OPTION_VALUE: "Choose your option"
    }

    static TAGS_INPUT = {
        NEW_TAG_PLACEHOLDER_DEFAULT: '+ Tag'
    }

    static PHOTO_INPUT = {
        DEFAULT_ICON: 'fa fa-user-circle-o',
        DEFAULT_PHOTO_IMAGE: '../../assets/5c5efa98-f863-4fcd-877d-68eaf11927d1.png',
        DEFAULT_FORMAT: 'png',
        DEFAULT_IMAGE_QUALITY: 90,
        IMAGE_ROTATE_ANGLE: 45,
        ZOOM_VALUE: 0.1
    }
}