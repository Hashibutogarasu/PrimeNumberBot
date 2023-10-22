export function isPrime(inputNumber: number): boolean {
    if (inputNumber < 2) {
        return false;
    }
    for (let i = 2; i < inputNumber; i++) {
        if (inputNumber % i === 0) {
            return false;
        }
    }
    return true;
};