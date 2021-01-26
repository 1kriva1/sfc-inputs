import IHourData from './IHourData';
import IMinuteData from './IMinuteData';

export default interface IClock {
    hours: IHourData[],
    minutes: IMinuteData[]
}