import fs from 'fs'
import path from 'path'
import PriceIndex from '../helpers/PriceIndex'

let priceIndex

const setup = () => {
  const pricesFile = fs.readFileSync(path.join(__dirname, '../precios.json'))
  const prices = JSON.parse(pricesFile)

  // se utiliza un índice para acelerar la busqueda de precios
  priceIndex = new PriceIndex(prices)
}

setup()

export default (app) => {

  app.post('/calculatePrice', async (req, res) => {
    try {
      if (!req.body.cotizacion) {
        return res.status(400).send({ 
          status: 400,
          message: 'No se ha enviado la cotización'
        })
      }
      const quote = req.body.cotizacion

      const details = await priceIndex.searchQuote(quote)

      if (!details) {
        return res.status(400).send({ 
          status: 400,
          message: 'No se contiene valores para la cotización recibida'
        })
      } else {
        res.send({status: 'ok', data:{
          "MARGEN": details.MARGEN,
          "FEE": details.FEE
        }})
      }
    } catch (error) {
      res.status(500).send({ status: 'error', message: e.message })
    }
  })
}