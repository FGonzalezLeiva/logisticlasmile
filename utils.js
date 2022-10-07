const moment = require('moment')

const tiempoquery = ()=>{
    const hora = new Date()
    return moment(hora).format("YYYY-MM-DD HH:mm:ss")
}

module.exports = {
    tiempoquery
}