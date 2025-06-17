// src/ClienteServices.js
import axios from 'axios'

export async function obtener_articulo(values) {
  try {
    const response = await axios.post('http://localhost:8000/api/Ventas/obtener_articulo' , { values }) 
    return response.data
  } catch (error) {
    console.error('Error al obtener clientes:', error)
    throw error
  }
}
export async function obtener_ventas(values) {
  try {
    const response = await axios.post('http://localhost:8000/api/Ventas/obtener_ventas', { values })
    return response.data
  } catch (error) {
    console.error('Error al obtener cliente por ID:', error)
    throw error
  }
}   
export async function obtenerInformacionArticulo(values) {
  try {
    const response = await axios.post('http://localhost:8000/api/Ventas/obtener_articulo', { values })
    return response.data
  } catch (error) {
    console.error('Error al obtener cliente por ID:', error)
    throw error
  }
}   
 
export async function SaveVentas(values) {
  try {
    const response = await axios.post('http://localhost:8000/api/Ventas/crear_ventas', { values })
    return response.data
  } catch (error) {
    console.error('Error al obtener cliente por ID:', error)
    throw error
  }
}   
