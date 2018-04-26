const { assert, expect } = require('chai');
const knex  = require('../db');

describe('findByZip', function() {

  let zipCode = parseInt(55944)

  it('Should display 1 record', async function() {
    const zip = await knex('zips').where({ zipCode: zipCode })
    assert.lengthOf(zip, 1, 'returned 1 record');
  })
})

describe('findByState', function() {
  it('Should display more than 50+ records', async function() {
    
    let stateAb = 'fl'

    const zips = await knex('zips').where({
                    stateAb: stateAb.toUpperCase(),
                  })
                  .orderBy('city', 'asc')
                  .limit(50)
                  .offset(0)
    
    expect(zips).to.be.an('array')
    expect(zips.length).to.be.gte(50)
  })
})