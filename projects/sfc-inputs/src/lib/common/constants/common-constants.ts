export enum StyleClass {
    Active = 'active',
    Valid = 'valid',
    Invalid = 'invalid',
};

export enum FileInputType {
    Input = 'input',
    Inline = 'inline'
};

export class CommonConstants{
    static DEFAULT_ERROR_MESSAGE = 'Invalid value'
    static MIN_LENGTH_VALIDATOR_KEY = 'minlength'
    static MAX_LENGTH_VALIDATOR_KEY = 'maxlength'
    static CSS_PIXELS = 'px'
}