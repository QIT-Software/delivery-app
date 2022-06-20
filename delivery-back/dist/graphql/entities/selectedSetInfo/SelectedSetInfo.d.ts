import Set from 'graphql/entities/set/Set';
export default class SelectedSetInfo {
    constructor(set: Set, quantity: number, numberOfDays: number);
    set: Set;
    quantity: number;
    numberOfDays: number;
}
