const axios = require('axios')

const simulados = [
{id:'0001',fecha_ingreso:'2022-10-10',fecha_prepa:null,fecha_salida:null,fecha_entrega:null},
{id:'0002',fecha_ingreso:null,fecha_prepa:null,fecha_salida:null,fecha_entrega:null},
{id:'0003',fecha_ingreso:null,fecha_prepa:null,fecha_salida:null,fecha_entrega:null},
{id:'0004',fecha_ingreso:'2022-10-10',fecha_prepa:null,fecha_salida:null,fecha_entrega:null},
{id:'0005',fecha_ingreso:'2022-10-10',fecha_prepa:null,fecha_salida:null,fecha_entrega:null},
{id:'0006',fecha_ingreso:'2022-10-10',fecha_prepa:'2022-10-10',fecha_salida:null,fecha_entrega:null},
{id:'0007',fecha_ingreso:'2022-10-10',fecha_prepa:'2022-10-10',fecha_salida:'2022-10-10',fecha_entrega:null},
{id:'0008',fecha_ingreso:'2022-10-10',fecha_prepa:'2022-10-10',fecha_salida:'2022-10-10',fecha_entrega:'2022-10-10'},
]

const proof = async(n,r_es,body)=>{
    const prueba = await axios.post('http://localhost:8080/task',body)
    console.log(prueba.data.a==`${r_es}`?`Prueba ${n} ok`:`
    Prueba ${n} bad
    respuesta esperada : ${r_es}
    respuesta obtenida : ${prueba.data.a}`)
}


const pruebas = async()=>{
    setTimeout(async()=>{
        
        const prueba1 = await axios.get('http://localhost:8080/')
        console.log(prueba1.data.answer=='Todo bien por ahora'?'Prueba 1 ok':`
        Prueba 1 bad
        respuesta esperada : ${'Todo bien por ahora'}
        respuesta obtenida : ${prueba1.data.answer}
        `)

        await proof(2,'Objeto registra ingreso',{codigo:'0001',user:'Francisco',p:1})
        await proof(3,'ingreso ok',{codigo:'0002',user:'Francisco',p:1})
        await proof(4,'Objeto no registrado en la BD',{codigo:'No existe',user:'Francisco',p:1})

        //preparaciones
        await proof(5,'Objeto existe en bd pero no se registra ingreso',{codigo:'0003',user:'Francisco',p:2})
        await proof(6,'prepa ok',{codigo:'0004',user:'Francisco',p:2})
        await proof(7,'Objeto no registrado en la BD',{codigo:'no existe',user:'Francisco',p:2})

        //salidas
        await proof(8,'Objeto existe en bd pero no se registra prepa',{codigo:'0005',user:'Francisco',p:3})
        await proof(9,'salida ok',{codigo:'0006',user:'Francisco',p:3})
        await proof(10,'Objeto no registrado en la BD',{codigo:'no existe',user:'Francisco',p:3})

        //entregas
        await proof(11,'Objeto existe en bd pero no se registra salida',{codigo:'0006',user:'Francisco',p:4})
        await proof(12,'entrega ok',{codigo:'0007',user:'Francisco',p:4})
        await proof(13,'Objeto no registrado en la BD',{codigo:'no existe',user:'Francisco',p:4})

        //Ya gestionados
        await proof(14,'Objeto registra prepa',{codigo:'0006',user:'Francisco',p:2})
        await proof(15,'Objeto registra salida',{codigo:'0007',user:'Francisco',p:3})
        await proof(16,'Objeto registra entrega',{codigo:'0008',user:'Francisco',p:4})
    },2000)
    
}

pruebas()
/*
Casos de prueba
1:Llamada al servidor si funciona
2:Intentando ingresar un objeto ya ingresado
3:Ingresando validamente un objeto
4:Ingresando por p1 un objeto inexistente
5:Ingresando un p2 sin paso previo
6:Ingresando un p2 valido
7:ingresando en p2 un objeto inexistente
8:Ingresando un p3 sin paso previo
9:Ingresando un p3 valido
10:ingresando en p3 un objeto inexistente
11:Ingresando un p3 sin paso previo
12:Ingresando un p3 valido
13:ingresando en p3 un objeto inexistente
14:Ingresando una preparación a un objeto ya preparado
15:Ingresando una salida a un objeto que ya registra salida
16:Ingresando una entrega a un objeto que ya registra entrega
*/

module.exports = {
    simulados
}
