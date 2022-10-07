const utils = require('./utils')
const db = require('./db')
const test = require('./test.js')

const movimiento = async(req,res)=>{
    const {codigo,user,p} = req.body
    const pro = ['creacion','ingreso','prepa','salida','entrega']

    //prod
    //const consulta = await db.query(`Select id,fecha_${pro[p]},fecha_${pro[p-1]} from productos where cod = '${codigo}' `)

    //dev
    //console.log(`Select id,fecha_${pro[p]},fecha_${pro[p-1]} from productos where cod = '${codigo}' `)
    const consulta =test.simulados.filter((i)=>i.id===codigo)

    let disponible = consulta.filter(i=>i[`fecha_${pro[p]}`] === null&&i[`fecha_${pro[p-1]}`] !== null)
    if(consulta.length===0){
        return res.json({a:'Objeto no registrado en la BD'})
    }else if(disponible.length===0){
        return consulta.filter(i=>i[`fecha_${pro[p-1]}`] === null).length>0?res.json({a:`Objeto existe en bd pero no se registra ${pro[p-1]}`}):res.json({a:`Objeto registra ${pro[p]}`})    
    }else{
        const t = await utils.tiempoquery()
        await db.query(`update productos set fecha_${pro[p]} = ${t},responsable_${pro[p]} = ${user} where id = '${disponible[0].id}'`)
        res.json({a:`${pro[p]} ok`})
    }
}

module.exports = {
    movimiento
}