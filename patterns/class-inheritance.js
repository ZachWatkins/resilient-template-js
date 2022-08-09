function Person(name) {
	o.innerHTML += "<h2>new Person(name:" + name + ")</h2>";
	this.name = name ?? "Person";
	this.sayName = function () {
		o.innerHTML += "\nMy name is " + this.name;
	};
	this.sayInheritance = function () {
		let proto = Object.getPrototypeOf(this);
		let chain = [];
		while ((proto = Object.getPrototypeOf(proto))) {
			chain.push(proto.constructor.name);
		}
		let joiner = chain.length < 3 ? " and " : ", ";
		if (chain.length > 2) {
			chain[chain.length - 1] = "and " + chain[chain.length - 1];
		}
		o.innerHTML += "\nI am an instance of " + chain.join(joiner);
	};
}
o.innerHTML += "<h2>Person.prototype</h2>";
o.innerHTML += JSON.stringify(Person.prototype);
const GenericPerson = new Person();
GenericPerson.sayName();
GenericPerson.sayInheritance();
const JoePerson = new Person("Joe");
JoePerson.sayName();
JoePerson.sayInheritance();

// Demonstrate inheritance of Person by Student and student_object.
o.innerHTML += "<h2>Student.prototype</h2>";
function Student(name, homework, password) {
	o.innerHTML +=
		"<h2>new Student(name:" +
		name +
		", homework:" +
		(homework ? "true" : "false") +
		", password:" +
		password +
		")</h2>";
	const _password = password ?? "password";
	function secret() {
		o.innerHTML += "\n> The secret password is " + _password;
	}
	this.name = name ?? this.__proto__.name;
	this.homework = homework ?? false;
	// Call the prototype method within a child scope.
	this.sayName = function () {
		this.__proto__.sayName.apply(this);
		if (this.homework) {
			o.innerHTML += " and I have homework";
		}
		secret();
	};
}
Student.prototype = new Person("Student");
o.innerHTML += JSON.stringify(Student.prototype);
const GenericStudent = new Student();
GenericStudent.sayName();
GenericStudent.sayInheritance();
o.innerHTML += "<hr>";
const StudentZach = new Student("Zach", true, "apple");
StudentZach.sayName();
StudentZach.sayInheritance();

// Demonstrate co-inheritance between Student and Teacher.
function Teacher(name, subject) {
	o.innerHTML +=
		"<h2>new Teacher(name:" + name + ", subject:" + subject + ")</h2>";
	this.homework = false;
	this.subject = subject;
}
Teacher.prototype = new Person("Teacher");
o.innerHTML += "<h2>Teacher.prototype</h2>";
o.innerHTML += JSON.stringify(Teacher.prototype);
const TeacherHeather = new Teacher("Mrs. Watkins", "History");
TeacherHeather.sayName();
TeacherHeather.sayInheritance();

// Demonstrate correct approach to chained inheritance between DepartmentHead, Teacher, and Person.
o.innerHTML += "<h2>Chained inheritance: Teacher.prototype</h2>";
function TeacherSecond(name, subject) {
	Person.call(this, name);
	console.log("prototype", Object.getPrototypeOf(this));
	this.homework = false;
	this.subject = subject;
}
TeacherSecond.prototype = Object.create(Person.prototype);
TeacherSecond.prototype.constructor = TeacherSecond;
o.innerHTML += JSON.stringify(TeacherSecond.prototype);
const TeacherHeather2 = new TeacherSecond("Mrs. Watkins", "History");
o.innerHTML += JSON.stringify(TeacherHeather2);
TeacherHeather2.sayName();
TeacherHeather2.sayInheritance();
function DepartmentHead(name, subject) {
	o.innerHTML +=
		"<h2>new DepartmentHead(name:" + name + ", subject:" + subject + ")</h2>";
		TeacherSecond.call(this, name, subject);
	this.homework = false;
	this.subject = subject;
}
DepartmentHead.prototype = Object.create(TeacherSecond.prototype);
o.innerHTML += "<h2>DepartmentHead.prototype</h2>";
o.innerHTML += JSON.stringify(DepartmentHead.prototype);
const DepartmentHeadHeather = new DepartmentHead("Mrs. Watkins", "History");
o.innerHTML += JSON.stringify(DepartmentHeadHeather);
DepartmentHeadHeather.sayName();
DepartmentHeadHeather.sayInheritance();
