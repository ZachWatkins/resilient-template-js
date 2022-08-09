function hello() {
	console.log('global','hello()');
}
const HasEvents = {
	sayHello: hello,
	listeners: {},
	listen: function(event, callback){
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}
		this.listeners[event].push(callback);
	},
	trigger: function(event, params){
		this.listeners[event].forEach(callback => {
			callback(this, ...params);
		});
	}
};
const HasEventsFunc = function(){
	this.sayHello = hello;
	this.listeners = {};
	this.listen = function(event, callback){
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}
		this.listeners[event].push(callback);
	};
	this.trigger = function(event, params){
		this.listeners[event].forEach(callback => {
			callback(this, ...params);
		});
	};
};

function Foo(name) {
	function hello() {
		console.log('encapsulated', 'hello()');
	}
	this.name = name;
	this.sayHello = hello;
}

const bar = new Foo('bar');
bar.sayHello();
Object.assign(bar, HasEvents);
bar.sayHello();

function FooGlobal(name) {
	function hello() {
		console.log('encapsulated', 'hello()');
	}
	HasEventsFunc.apply(this);
	this.name = name;
	this.sayHello = hello;
}
const barGlobal = new FooGlobal('bar');
console.log(barGlobal instanceof HasEventsFunc);
bar.sayHello();
Object.assign(barGlobal, HasEvents);
bar.sayHello();
