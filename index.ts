declare global {
    interface Array<T> {
        take(amountToTake: number): T[];
        takeFromEnd(amountToTake: number): Array<T>;
        takeRandomly(amountToTake: number): Array<T>;
    }

    interface String {
        isNullOrWhitespace(): boolean;
    }
}

Array.prototype.take = function(amountToTake) {
    return this.splice(0, amountToTake);
};

Array.prototype.takeFromEnd = function (amountToTake) {
    return this.splice(this.length - amountToTake, amountToTake);
};

Array.prototype.takeRandomly = function(amountToTake) {
    let itemsRemoved: any[] = [];

    while(itemsRemoved.length < amountToTake) {
        let indexToGetItem = getRandomInt(0, this.length - 1);
        itemsRemoved = itemsRemoved.concat(this.splice(indexToGetItem, 1));
    }

    return itemsRemoved;
};

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

String.prototype.isNullOrWhitespace = function() {
    if(!this) return true;
    return this.match(/^\s*$/) !== null;
}