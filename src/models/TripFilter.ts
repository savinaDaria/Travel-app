interface TripFilterProps {
    searchValue:string,
    duration:string,
    level:string,
    onSearchValueChange:(value: string)=> void;
    onLevelChange:(value: string)=> void;
    onDurationChange:(value: string)=> void;
}

export type {TripFilterProps};