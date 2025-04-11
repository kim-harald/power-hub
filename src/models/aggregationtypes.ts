export enum AggregationType {
    Avg = 1,
    Min = 2,
    Max = 3,
}

export type AggregationTypeString = 'avg' | 'min' | 'max';
export type AggregationTypeMap = {
    [key in AggregationType]: AggregationTypeString;
};
export const AggregationTypeMap: AggregationTypeMap = {
    [AggregationType.Avg]: 'avg',
    [AggregationType.Min]: 'min',
    [AggregationType.Max]: 'max',
};
export const AggregationTypeStrings: AggregationTypeString[] = [
    'avg',
    'min',
    'max',
];
export const AggregationTypeKeys: Record<AggregationTypeString, AggregationType> = {
    avg: AggregationType.Avg,
    min: AggregationType.Min,
    max: AggregationType.Max,
};
