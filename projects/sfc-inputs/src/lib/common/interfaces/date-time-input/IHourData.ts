import IHourCircle from './IHourCircle';
import IHourText from './IHourText';

export default interface IHourData {
    value: number;
    circle: IHourCircle;
    text: IHourText;
}