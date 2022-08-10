import "./styles/main.scss";
import logo from "./assets/babel.svg";

// Load an image on the home page.
const logoImg = document.getElementById("logoImg");
logoImg.src = logo;
const a = {
    name: "Harrison",
};
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
