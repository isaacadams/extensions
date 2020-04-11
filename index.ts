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

import './src/Array';
import './src/String';