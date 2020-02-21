export enum StyleClass {
    Active = 'active',
    Valid = 'valid',
    Invalid = 'invalid',
    WithIcon = "withIcon"
};

export enum FileInputType {
    Input = 'input',
    Inline = 'inline'
};

export class CommonConstants{
    static DEFAULT_ERROR_MESSAGE = 'Invalid value'
    static MIN_LENGTH_VALIDATOR_KEY = 'minlength'
    static MAX_LENGTH_VALIDATOR_KEY = 'maxlength'
    static BASE_REQUIRED_VALIDATOR_KEY = 'required'
    static TEXT_AREA_REQUIRED_VALIDATOR_KEY = 'textAreaRequired'
    static CSS_PIXELS = 'px'
}