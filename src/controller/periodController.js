const jwt = require('jsonwebtoken')
const Period = require('../models/periodModel')

const getAllPeriods = async (req, res) => {
  try {
    const periods = await Period.getAllPeriods()
    res.status(200).json({
      periods,
      success: true,
      message: 'PERIODOS OBTENIDOS CORRECTAMENTE'
    })
  } 
  catch (err) {
    res.status(500).json({
      message: err.message,
      success: false
    })
  }
}

const createPeriod = async (req, res) => {
  const { id, dateStart, dateEnd, exclusive, request, approval, rejected, status } = req.body
  try {
    const period = await Period.createPeriod(id, dateStart, dateEnd, exclusive, request, approval, rejected, status)
    res.status(201).json({
      period,
      success: true,
      message: 'PERIODO CREADO CORRECTAMENTE'
    })
  } 
  catch (err) {
    res.status(500).json({
      message: err.message,
      success: false
    })
  }

}

const deletePeriod = async (req, res) => {
  const { id } = req.params
  try {
    const period = await Period.deletePeriod(id)
    res.status(201).json({
      period,
      success: true,
      message: 'PERIODO ELIMINADO CORRECTAMENTE'
    })
  } 
  catch (err) {
    res.status(500).json({
      message: err.message,
      success: false
    })
  }
}

module.exports = {
  getAllPeriods,
  createPeriod,
  deletePeriod
}
