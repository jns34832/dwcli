arrayhijos= [{clase:'class', nombreclase:'hijo', idd: 'id', nombreid:"h01", arraynietos:[{clase:'class', nombreclase:'nieto', idd: 'id', nombreid:"nieto0101"},
                                                                                         {clase:'class', nombreclase:'nieto', idd: 'id', nombreid:"nieto0102"},
                                                                                         {clase:'class', nombreclase:'nieto', idd: 'id', nombreid:"nieto0103"}]}, 
             {clase:'class', nombreclase:'hijo', idd: 'id', nombreid:"h02", arraynietos:[{clase:'class', nombreclase:'nieto', idd: 'id', nombreid:"nieto0201"},
                                                                                         {clase:'class', nombreclase:'nieto', idd: 'id', nombreid:"nieto0202"},
                                                                                         {clase:'class', nombreclase:'nieto', idd: 'id', nombreid:"nieto0203"}]},
             {clase:'class', nombreclase:'hijo', idd: 'id', nombreid:"h03", arraynietos:[{clase:'class', nombreclase:'nieto', idd: 'id', nombreid:"nieto0301"},
                                                                                         {clase:'class', nombreclase:'nieto', idd: 'id', nombreid:"nieto0302"},
                                                                                         {clase:'class', nombreclase:'nieto', idd: 'id', nombreid:"nieto0303"}]}
            ];

function crearElementos(elemento,quien,donde) {  
    nuevoElemento= document.createElement("div");
    nuevoElemento.setAttribute(elemento.clase,elemento.nombreclase);
    nuevoElemento.setAttribute(elemento.idd, elemento.nombreid);
    quien.insertAdjacentElement(donde, nuevoElemento);
    return nuevoElemento; 
}

// CABECERA Y BODY
let cabecera=document.firstElementChild.children[0]; //cabecera

document.body=document.createElement('body');
let cuerpo=document.firstElementChild.children[1]; //body

//ABUELO
    let abuelo= document.createElement('div');
    abuelo.setAttribute("class", "abuelo");
    abuelo.setAttribute("id","el-abuelo");
    cuerpo.insertAdjacentElement("beforeend",abuelo);
    
//HIJOS
    arrayhijos.forEach(hijo => {
        nuevohijo=crearElementos(hijo,abuelo,"beforeend");
        hijo.arraynietos.forEach(nieto=>{
            crearElementos(nieto,nuevohijo,"beforeend");
        });
    });

//ESTILO
    let estilo=document.createElement('style');
    cabecera.insertAdjacentElement('beforeend',estilo);

    bodyEstilo='body {margin = 0;}';
    estilo.insertAdjacentHTML('beforeend',bodyEstilo);
    
    estiloGeneral='display: flex; margin: .5rem; padding: 1rem; border: 3px solid black; min-height: 1rem; flex-grow: 1;'; 

    abueloEstilo='.abuelo {'+estiloGeneral+'background-color: hsl(0, 50%, 50%); flex-direction: column;}';
    estilo.insertAdjacentHTML('beforeend',abueloEstilo);
    
    hijoEstilo='.hijo {'+estiloGeneral+' background-color: hsl(100,50%, 50%);}';
    estilo.insertAdjacentHTML('beforeend',hijoEstilo);

    nietoEstilo='.nieto {'+estiloGeneral+' background-color: hsl(200,50%, 50%);}';
    estilo.insertAdjacentHTML('beforeend',nietoEstilo);
