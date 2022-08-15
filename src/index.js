//@ts-check
// Import this project's type definitions for JSDoc and IDE linters.
import _ from '../typedefs';
import './styles/main.scss';
import logo from './assets/babel.svg';

/** @type {_.Person} foo */
const foo = {};

// Load an image on the home page.
/**
 * Define the home page logo.
 *
 * @member  logoImg
 */
const logoImg = document.getElementById('logoImg');
logoImg.src = logo;
const a = foo;
console.log(a);

// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     sayName(){
//         console.log(this.name);
//         document.body.appendChild(document.createTextNode("\n" + this.name + "\n"));
//     }
// }
// const Harrison = new Person('Harrison', 6);
// Harrison.sayName();
// Harrison.sayName();
