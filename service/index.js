const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function getAllMenu(page=1) {
    const offset = helper.getOffset(page,config.listPerPage)
    const data = await db.query(
        `SELECT * FROM menu LIMIT ${offset}, ${config.listPerPage}`
    )
    const result = helper.isEmpty(data)
    const meta = {
        page
    }

    if(data.length) {
        return {
            ...helper.requestSuccess('Success get all menu',false,result)
        }
    } else {
        return {
            ...helper.requestFail('Fail to get all menu')
        }
    }
}

async function getSinglemenu(id) {
    const data = await db.query(
        `SELECT * FROM menu WHERE idMenu=${id}`
    )
    const result = helper.isEmpty(data)
    

    if(data.length) {
        return {
            ...helper.requestSuccess('Success get single menu',false,result)
        }
    } else {
        return {
            ...helper.requestFail('Fail to get single menu')
        }
    }
}

async function createTakeaway(data) {
    const result = await db.query(
        `INSERT  INTO transaksi_takeaway (id_pesanan, nama_pemesan, no_telp, tanggal, no_antrian) VALUES ('${data.id_pesanan}','${data.nama_pemesan}','${data.no_telp}','${data.tanggal}','${data.no_antrian}')`
    )

    let message = 'Error in adding '

    if (result.affectedRows) {
        message = 'Success in adding transaksi_takeaway'
        return {
            ...helper.requestSuccess(message, true)
        }
    } else {
        return {
            ...helper.requestFail('Fail to add transaksi_takeaway')
        }
    }
}

async function createDinein(data) {
    const result = await db.query(
        `INSERT  INTO transaksi_dinein (id_pesanan, nama_pemesan, no_telp, no_meja) VALUES ('${data.id_pesanan}','${data.nama_pemesan}','${data.no_telp}','${data.no_meja}')`
    )

    let message = 'Error in adding '

    if (result.affectedRows) {
        message = 'Success in adding transaksi_dinein'
        return {
            ...helper.requestSuccess(message, true)
        }
    } else {
        return {
            ...helper.requestFail('Fail to add transaksi_dinein')
        }
    }
}

module.exports = {
    getAllMenu,
    getSinglemenu,
    createTakeaway,
    createDinein
}