const admin = require('../config/firebase')
const IPeriod = require('../interfaces/IPeriod')
const firestore = admin.firestore()

class Period extends IPeriod {
	constructor(id, dateStart, dateEnd, exclusive, request, approval, rejected, status) {
		super()
		this.id = id
    this.dateStart = dateStart
    this.dateEnd = dateEnd
    this.exclusive = exclusive
    this.request = request
    this.approval = approval
    this.rejected = rejected
    this.status = status
	}

  static async getAllPeriods() {
    try {
      const periods = await firestore.collection('periods').get()
      const periodsList = []
      periods.forEach((doc) => {
        periodsList.push(doc.data())
      })
      return periodsList
    }
    catch (err) {
      console.log('ERROR =>', err)
      throw new Error('ERROR AL OBTENER LOS PERIODOS')
    }
  }

  static async createPeriod(id, dateStart, dateEnd, exclusive, request, approval, rejected, status) {
    try {
      if (new Date(dateStart) >= new Date(dateEnd)) {
        throw new Error('LA FECHA DE INICIO DEBE SER MENOR A LA FECHA DE FIN')
      }

      const overlappingPeriods = await firestore.collection('periods')
        .where('dateStart', '<=', dateEnd)
        .where('dateEnd', '>=', dateStart)
        .get()

      if (!overlappingPeriods.empty) {
        throw new Error('EL RANGO DE FECHAS SE SUPERPONE CON UN PERIODO EXISTENTE')
      }

      const period = firestore.collection('periods').doc(id)

      await period.set({
          id,
          dateStart,
          dateEnd,
          exclusive,
          request,
          approval,
          rejected,
          status
      })

      return new Period(id, dateStart, dateEnd, exclusive, request, approval, rejected, status)
    } 
    catch (err) {
      console.log('ERROR =>', err)
      throw new Error(err.message || 'ERROR AL CREAR EL PERIODO')
    }
  }

  static async deletePeriod(id) {
    try {
      const period = await firestore.collection('periods').doc(id).get()
      if (!period.exists) {
        throw new Error('EL PERIODO NO EXISTE')
      }

      await firestore.collection('periods').doc(id).delete()
      return new Period(period.data())
    } 
    catch (err) {
      console.log('ERROR =>', err)
      throw new Error(err.message || 'ERROR AL ELIMINAR EL PERIODO')
    }
  }
}

module.exports = Period