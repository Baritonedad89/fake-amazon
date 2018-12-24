let number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let value = "cody4";
const func = () => {

        for (let i = 0; i < value.length; i++) {
            return value[i];
            console.log(value[i])

            for (let j = 0; j < number.length; j++) {

                if (value[i] === number[j]) {
                    return true;
                }

            }
            // return false;

        }
    }

console.log(func())