/* 
  Se trabaja con [MIN, MAX), el mínimo esta incluido dentro del
  intervalo pero el máximo no.

  Se usa un array con entradas representando intervalos regulares para acelerar la búsqueda.
  Cada intervalo contiene una lista de valores incluidos en el intervalo.
          
  Interesante explorar: Arbol AVL por intervalos
    - https://github.com/ShieldBattery/node-interval-tree
    - https://github.com/alexbol99/flatten-interval-tree

  Si la fee y el margen no cambia, se pueden también considerar mergear los intervalos.

  TODO: Sería deseable contar con una validación de que no haya intervalos solapados y
  que este completamente cubierto desde el valor menor al menor valor.
*/

export default class PriceIndex {
  entryIndex (value) {
    return Math.floor((value - this.minBound) / this.partition)
  }

  constructor (prices) {
    this.minBound = 30000 // ningun valor de precio ingresado podrá ser menor a este valor
    this.maxBound = 10000000 // ningun valor de precio ingresado podrá ser menor a este valor
    this.totalPartitions = 100 // cantidad de entradas que representan una particion/intervalos
  
    this.partition = (this.maxBound - this.minBound) / this.totalPartitions // $ en el que se particiona el intervalo total
    
    this.priceIndex = new Array(this.totalPartitions)
  
    // Se insertan los precios en todos los intervalos a los que pertenezca
    for (const price of prices) {
      const entryStart = this.entryIndex(price.MIN)
      const entryEnd = this.entryIndex(price.MAX - 1) // ya que es no se incluye el máximo en el intrevalo
      
      for (let i = entryStart; i <= entryEnd; i++) {
        if (!this.priceIndex[i]) this.priceIndex[i] = []
        this.priceIndex[i].push(price)
      }
    }
  }

  async searchQuote (quote) {
      const intervalList = this.priceIndex[this.entryIndex(quote)]
      return intervalList && intervalList.find(details => quote >= details.MIN && quote < details.MAX)
  }
}
