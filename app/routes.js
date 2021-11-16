export default (app) => {

  app.post('/calculatePrice', async (req, res) => {
    try {
      
      // res.send({status:'ok', data: ...})

      res.send({status: 'ok', data:{
        "MARGEN": 110000,
        "FEE": 210000
      }})

    } catch (e) {
      res.status(400).send({ status: 'error', message: e.message })
    }
  })
}