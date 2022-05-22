/*

Herencia

Permite extender las propiedades y métodos de una clase a otra
heredada.

*/

// Partimos de una Clase general

class Persona {
	constructor(nombre, fechaNacimiento) {
		this.nombre = nombre;
		this.fechaNacimiento = fechaNacimiento;
	}

	get nombre() {
		return this._nombre;
	}

	set nombre(valor) {
		this._nombre = valor;
	}

	get fechaNacimiento() {
		return this._fechaNacimiento;
	}

	set fechaNacimiento(valor) {
		this._fechaNacimiento = valor;
	}

	get edad() {
		// propiedad calculada por getter
		let edad = Math.floor((Date.now() - this.fechaNacimiento) / 31556926000);
		return edad;
	}

	mostrarTodo() {
		// iteramos sobre todas sus propiedades (los métodos
		// en el caso de las clases no son enumerables y por
		// lo tanto no aparecen en el bucle. )
		for (let elem in this) {
			console.log(elem, " => ", this[elem]);
		}
	}
	static compararEdades(personaA, personaB) {
		// método estático (utilizable a nivel de clase)
		if (personaA.fechaNacimiento > personaB.fechaNacimiento) {
			return 1;
		}
		if (personaA.fechaNacimiento < personaB.fechaNacimiento) {
			return -1;
		}
		return 0;
	}
}

let lucas = new Persona("Lucas Gonzalez", new Date(1965, 11, 25));

console.log(lucas.nombre, ": ", lucas.edad, " años"); // utilizando getter, no la utilizamos como un método

// Creamos una clase nueva que extiende la anterior
//
// La clase 'Empleado' extiende la clase 'Persona' añadiendo propiedades y métodos
// propios de la clase.
//

class Empleado extends Persona {
	static categorias = ["A", "B", "C", "D"]; // propiedad estática, sólo accesible desde la clase

	constructor(nombre, fechaNacimiento, categoriaProfesional, salario, incorporacion, fechaBaja, activo) {
		super(nombre, fechaNacimiento); // Llamada al constructor de la clase superior
		this.categoriaProfesional = categoriaProfesional; // propiedad específica de la clase
		this._vacacionesPendientes = 24;
		this.salario = salario;
		this.incorporacion = incorporacion;
		this.fechaBaja = fechaBaja;
		this.activo = activo;
		this.historial = [];
		this.nuevaentradahistorial("alta", this.incorporacion, this.categoriaProfesional, this.salario);
	}

	get categoriaProfesional() {
		return this._categoriaProfesional;
	}
	set categoriaProfesional(valor) {
		if (Empleado.categorias.indexOf(valor) != -1) {
			// Utilización de la propiedad estática
			this._categoriaProfesional = valor;
		}
	}
	get vacacionesPendientes() {
		return this._vacacionesPendientes;
	}

	tomarDiasVacaciones(dias) {
		if (dias <= this.vacacionesPendientes) {
			this._vacacionesPendientes -= dias;
			return this._vacacionesPendientes;
		}
		return -1; // error no quedan días suficientes.
	}

	reestablecerDiasVacaciones() {
		this._vacacionesPendientes = 24;
	}

	get salario() {
		return this._salario;
	}

	set salario(valor) {
		this._salario = valor;
	}

	get incorporacion() {
		return this._incorporacion;
	}

	set incorporacion(valor) {
		if (valor == null) {
			const hoy = new Date();
			valor = hoy;
		}
		this._incorporacion = valor;
	}

	get fechaBaja() {
		return this._fechaBaja;
	}

	set fechaBaja(valor) {
		this._fechaBaja = valor;
	}

	get activo() {
		return this._activo;
	}

	set activo(valor) {
		if (this.fechaBaja == null) {
			valor = true;
		} else {
			valor = false;
		}
		this._activo = valor;
	}

	static compararCategorias(empleadoA, empleadoB) {
		// método estático (utilizable a nivel de clase)
		if (empleadoA.categoriaProfesional > empleadoB.categoriaProfesional) {
			return 1;
		}
		if (empleadoA.categoriaProfesional < empleadoB.categoriaProfesional) {
			return -1;
		}
		return 0;
	}

	nuevaentradahistorial(operacion, fecha, categoria, salario) {
		let nuevaentrada = {
			operation: operacion,
			date: fecha,
			category: categoria,
			salary: salario,
		};
		this.historial.push(nuevaentrada);
	}

	nuevaentradaPromocion(nuevosalario, nuevacategoria) {
		if (nuevosalario != null && nuevosalario > this.salario) {
			this._salario = nuevosalario;
		}

		//pasar categoria, categoria no mayor que D y salto no mayor que 1
		if (
			nuevacategoria != null
			&& nuevacategoria < "D"
			&& nuevacategoria.charCodeAt(0) == this._categoriaProfesional.charCodeAt(0) + 1
		) {
			this._categoriaProfesional = nuevacategoria;
		}

		if (this._salario == nuevosalario || this._categoriaProfesional == nuevacategoria) {
			this.nuevaentradahistorial("promocion", new Date(), this._categoriaProfesional, this._salario);
		}
	}

	situacion(fecha) {
		for (let i = this.historial.length - 1; i >= 0; i--) {
			if (fecha > this.historial[i].date) {
				return this.historial[i];
			}
		}
	}
}

const juan = new Empleado("Juan Pérez", new Date(1965, 11, 25), "A", 1500, new Date(1985, 11, 25), null);

juan.categoriaProfesional = "J"; // categoría no válida por lo que no se mueve

const plantilla = [
	juan,
	new Empleado("Lucía López", new Date(1987, 10, 22), "B", 2500, new Date(2019, 4, 5), new Date(2020, 7, 5)),
	new Empleado("Santiago Segura", new Date(1992, 6, 12), "D", 1400, new Date(2018, 5, 6), null),
	new Empleado("Noelia Rodríguez", new Date(1997, 1, 7), "A", 1700, new Date(2019, 9, 1), new Date(2021, 2, 23)),
	new Empleado("Felipe Sánchez", new Date(2001, 2, 20), "A", 1500, new Date(2019, 5, 8), null),
	new Empleado("Elena López", new Date(2000, 11, 10), "B", 2000, new Date(2018, 6, 5), new Date(2021, 5, 8)),
	new Empleado("Nuria García", new Date(1999, 8, 26), "C", 2100, new Date(2019, 6, 5), new Date(2020, 7, 1)),
	new Empleado("Leonor Pantaleón", new Date(1986, 11, 10), "C", 1000, new Date(2022, 1, 7), null),
	new Empleado("Alberto Martín", new Date(1980, 6, 10), "B", 500, new Date(2016, 3, 16), new Date(2018, 3, 16)),
	new Empleado("Sara Soto", new Date(2001, 3, 14), "D", 1250, new Date(2019, 4, 5), null),
];

plantilla.sort(Empleado.compararCategorias); // Utilizando un método estático para realizar el ordenamiento
// Ver el método Array.sort()
plantilla.sort(Persona.compararEdades); // Utilizando un método estático para realizar el ordenamiento

juan.tomarDiasVacaciones(4); // Juan toma 4 días de vacaciones

juan.nuevaentradaPromocion(1800, "B");

juan.mostrarTodo();

console.log(juan.situacion(new Date(1995, 10, 5)));

console.log(plantilla);
console.log();
