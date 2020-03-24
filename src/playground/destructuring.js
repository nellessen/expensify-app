// Object Desctrucuring
const person = {
  name: 'David',
  age: 34,
  location: {
    city: 'Hamburg',
    temp: 3,
  }
}

const { name, age, notSet = 'Not Set' } = person;
const { city, temp: temperature } = person.location;
console.log(`${name} is from ${city} and ${age} years old where it has ${temperature} degrees`);
console.log('Unset destructed value: ' + notSet);

// Array Destructuring
const address = ['Lutterothstraße 546', 'Münster', 'NRW', '23456'];
const [, town, state = 'Hamburg'] = address;
console.log(`You are in ${town}, ${state}`);