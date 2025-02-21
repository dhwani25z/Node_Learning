const name1 = 'Dhwani';
let age1 = 20;
const hasHobbies = true;
age1 = 31;

console.log(name1);

// function summarizesUser(userName, userAge, userHasHobbies){
//     return ('Name is ' + userName + ' age is ' + userAge + ' hobbies are ' + userHasHobbies)
// }

// const summarizesUser = function(userName, userAge, userHasHobbies){
//     return ('Name is ' + userName + ' age is ' + userAge + ' hobbies are ' + hasHobbies);
// }

const summarizesUser = (userName, userAge, userHasHobbies) => {
    return ('Name is ' + userName + ' age is ' + userAge + ' hobbies are ' + userHasHobbies );

}

console.log(summarizesUser(name1, age1, hasHobbies));

const person = {
    name : 'Dhwani',
    age : 21,
    greet : function(){
        console.log("Hi I'm " + this.name);
    },
    greet1() {
        console.log("Hello I'm " + this.age + ' years old.');  
    }
};

person.greet();
person.greet1();

const printName = ({name}) => {
    console.log(name);
}
printName(person);

const {name,age} = person;
console.log(name, age);

const hobbies = ['Sports', 'Cooking', 123, true];
// for(let hobby of hobbies){
//     console.log(hobby);
// }
console.log(hobbies.map(hobby => 'Hobby : ' + hobby));
console.log(hobbies);
hobbies.push('Programming');
console.log(hobbies);
const copyarray = hobbies.slice();
console.log(copyarray);
const copyarray1 = [hobbies];
console.log(copyarray1);
const copyarray2 = [...hobbies]
console.log(copyarray2);
const[hobby1, hobby2] = hobbies
console.log(hobby1, hobby2);

const copyarray3 = {...person};
console.log(copyarray3);
const toArray = (...args) => {
    return args;
}
console.log(toArray(1,2,3,4));

setTimeout(() => {
    console.log('It will print after 2 seconds');
}, 2000);

const numbers = [1,2,3,4,5];
const doubled = numbers.map(numbers => numbers * 2);
console.log(doubled);
const evens = numbers.filter(numbers => numbers % 2 == 0);
console.log(evens);

const fetchData = callback => {
    const promises = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hello promises!')
        }, 2500);
    });
    return promises;
};

setTimeout(() => {
    console.log('Timer is done !');
    fetchData()
    .then (text => {
        console.log(text);
        return fetchData();
    })
    .then (text2 => {
        console.log(text2)
    })    
}, 2000);