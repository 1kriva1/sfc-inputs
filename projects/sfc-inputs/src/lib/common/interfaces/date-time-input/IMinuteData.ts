import IMinuteCircle from './IMinuteCircle';
import IMinuteText from './IMinuteText';

export default interface IMinuteData {
    value:number;
    circle: IMinuteCircle;
    text: IMinuteText;
}