import constants from 'src/logic/constants'

class ContractWork {
  /**
   * Kwota netto
   * @type {number}
   */
  net = 0
  /**
   * Kwota brutto
   * @type {number}
   */
  gross = 0
  /**
   * Kwota podatku
   * @type {number}
   */
  taxAmount = 0

  /**
   * Podstawa do obliczenia podatku
   * @type {number}
   */
  basisForTax = 0

  /**
   * Koszty uzyskania przychodu
   * @type {number}
   */
  expenses = 0

  /**
   * Stawka kosztow uzyskania przychodu
   * @type {number}
   */
  rateExpenses = 0

  /**
   * Maksymalne koszty przy 50% kosztow przychodu
   * @type {number}
   */
  maxExpenses = constants.CONTRACT_WORK.AMOUNT_TAX_THRESHOLD / 2

  /**
   * Stawka podatku
   * @type {number}
   */
  rateTax = constants.CONTRACT_WORK.RATE_TAX

  /**
   * Oblicza koszty uzyskania przychodu
   */
  calculateExpenses () {
    let expenses = (this.gross * this.rateExpenses).toFixed(2)
    expenses = parseFloat(expenses)

    if (this.rateExpenses === 0.5 && expenses > this.maxExpenses) {
      expenses = this.maxExpenses
    }
    this.expenses = expenses
  }

  /**
   * Oblicza podstawę opodatkowania
   */
  calculateBasisForTax () {
    this.basisForTax = Math.round(this.gross - this.expenses)
  }

  /**
   * Oblicza kwotę podatku
   */
  calculateTaxAmount () {
    this.taxAmount = Math.round(this.basisForTax * this.rateTax)
  }

  /**
   // * Oblicza kwotę brutto
   */
  calculateGross () {
    const gross = this.net / (1 - this.rateTax * (1 - this.rateExpenses
    ))
    this.gross = parseFloat(gross.toFixed(2))
  }

  /**
   * Oblicza kwotę netto
   */
  calculateNet () {
    this.net = this.gross - this.taxAmount
  }
}
export default ContractWork