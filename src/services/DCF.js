const DCF1 = require("../dummyData");

module.exports = {
  buildDCF
}

const INPUT_KEYS = [
  "forecasts",
  "assumptions",
  "taxRate",
  "valDate",
  "periods"
]

/**
 *  Class for each forecast within the input object
 * @param {Object} forecastObj - An object containing forecast input line items
 */

class Forecast {
  constructor(forecastObj = {}) {
    this.forecastPeriod = forecastObj.forecastPeriod
    this.revenue = forecastObj.revenue
    this.cogs = forecastObj.cogs
    this.opEx = forecastObj.opEx
    this.depreciation = forecastObj.depreciation
    this.amortization = forecastObj.amortization
    this.capex = forecastObj.capex
    this.taxRate = forecastObj.taxRate

    this.gp = null
    this.ebitda = null
    this.ebit = null
    this.taxes = null
    this.nopat = null
    this.fcf = null
  }

  initForecast() {
    this.gp = this.calcGP()
    this.ebitda = this.calcEBITDA()
    this.ebit = this.calcEBIT()
    this.taxes = this.calcTaxes()
    this.nopat = this.calcNOPAT()
    this.fcf = this.calcFCF() 
  }

  calcGP() {
    return this.revenue - this.cogs;
  }

  calcEBITDA() {
    return this.gp - this.opEx;
  }

  calcEBIT() {
    return this.ebitda - this.amortization - this.depreciation;
  }

  calcTaxes() {
    return this.taxRate * this.ebit;
  }

  calcNOPAT() {
    return this.ebit - this.taxes
  }

  calcFCF() {
    return this.nopat + this.amortization + this.depreciation
  }

}


function buildDCF(DCFInput) {
  const { forecasts } = DCFInput;

  const initializedForecasts = forecasts.map(forecastInput => {
    const newForecast = new Forecast(forecastInput);
    newForecast.initForecast();
    return newForecast;
  })
  // test = new Forecast(DCF1.forecasts[0]);
  // test.initForecast()
  console.log(initializedForecasts)
}


buildDCF(DCF1);