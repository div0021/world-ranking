export function formatIndianNumber(number: number): string {
    const numStr: string = number.toString();

    let result: string = '';
    let count: number = 0;

    for (let i: number = numStr.length - 1; i >= 0; i--) {
        if (count === 2) {
            result = ',' + result;
            count = 0;
        }

        result = numStr[i] + result;
        count++;
    }

    return result;
}