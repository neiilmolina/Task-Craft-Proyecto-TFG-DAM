/**
 * Bibliografía: 
 *      Video: https://www.youtube.com/watch?v=LefcqnZHYeg&t=503s
 *      Repositorio: https://github.com/jamezmca/crud-node-firebase
 */

const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

const serviceAccount = require('./key.json')

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()

module.exports = { db }
