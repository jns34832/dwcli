var mascotas=[];
class Mascota{
    constructor (nombre, tipo, edad){ //el constructor se pone constructor delante
        this._nombre=nombre;
        this.edad=edad;
        this.tipo=tipo;
        this.baja=false;
        this.vacunas=[]
    }

    
    /* get nombre(){
        return this.nombre;
    }
    set nombre(nombre){
        this._nombre=nombre;
    }
    get tipo(){
        return this.nombre;
    }
    set tipo(tipo){
        this.tipo=tipo;
    }
    get edad(){
        return this.edad;
    }
    set edad(edad){
        this.tipo=tipo;
    } */
    
    set baja(nombre){
        console.log(mascotas);
       if (mascotas.find(nombrebuscar=>nombrebuscar=nombredebaja)==nombre){
        this.baja=true;
       };
    }

    mostrarTodo() { //muestra todas las propiedades del objeto
		
		for (let elem in this) {
			console.log(elem, " => ", this[elem]);
		}
	}
    // en los metodos, el nombre del metodo directamente
}

function altamascota(nombre,tipo,edad){
    var newnombre= prompt('nombre');
    var newtipo=prompt('tipo');
    var newedad=prompt('edad');
    const newmascota=new mascota(newnombre,newedad,newtipo); //creo el objeto
    mascotas.push(newmascota); //lo añado al array
}

function vacunar(){
    mascotas.forEach(element => {
        element.mostrarTodo();
    });
}



mascotas=[
    new mascota('hera','perro',6),
    new mascota('gala','perro',7),
    new mascota('sella','gato',1),
    new mascota('coco','gato',2)
];
vacunar;


