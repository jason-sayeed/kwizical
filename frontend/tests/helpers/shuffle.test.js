import { shuffle } from '../../helpers/shuffle'

describe('shuffle function', () => {
    test('shuffles an array', () => {
        const inputArray = [1, 2, 3, 4, 5];
        const shuffledArray = shuffle([...inputArray]); // Create a copy to compare
        expect(shuffledArray).not.toEqual(inputArray); // Array should be shuffled
        console.log(shuffledArray)//Confirm shuffle in array after function
        expect(shuffledArray).toHaveLength(inputArray.length); // Length should remain the same
        inputArray.forEach((value) => {
        expect(shuffledArray).toContain(value); // All original values should be present
        console.log("Lenght Control:")
        console.log(inputArray.length)
        console.log(shuffledArray.length)
        });
});

describe('empty array on shuffle function', () => {
    test('empty array on shuffle function',() => {
        const EmptyArray = []; // Create an empty array
        const shuffledEmptyArray = shuffle(EmptyArray); // Create a shuffled version
        expect(shuffledEmptyArray).toEqual(EmptyArray); // Empty should be equal to empty
        console.log("Print Control:")
        console.log(EmptyArray)
        console.log(shuffledEmptyArray)
    })
})
});