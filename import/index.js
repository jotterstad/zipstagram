'use strict'

const fs            = require('fs')
let txtSrcFile      = './US.txt'
const knex          = require('../db')

let self = {
    index: () => {
        /////////////////////////////////////////////////////////
        // 1. Reads the source Geocode file
        // 2. Converts to JSON
        /////////////////////////////////////////////////////////
        fs.readFile(txtSrcFile, 'utf8', (err, tabData) => {
            if (err) throw err
            
            let jsonPayload = tabData.split('\n').map(function(data){
                    let dataItem = data.split('\t')
                    return {
                        countryCode: dataItem[0],
                        zipCode: dataItem[1],
                        city: dataItem[2],
                        state: dataItem[3],
                        stateAb: dataItem[4],
                        county: dataItem[5],
                        stateCountyCode: dataItem[6],
                        lat: dataItem[9],
                        long: dataItem[10]
                    }
                })

            jsonPayload.pop() // Pops last empty obj from \n in array.
            self.doKnex(jsonPayload)
        })
    },
    doKnex: (data) => {
        /////////////////////////////////////////////////////////
        // 1. Makes the connection to PG
        // 2. Recieves json payload
        // 3. Drops and recreates the zips table
        // 4. Does bulk create in chuncks of 1,500
        /////////////////////////////////////////////////////////
        
        return knex.schema.dropTableIfExists('zips').then( onDrop => {
            return knex.schema.createTable('zips', table => {
                table.increments()
                table.string('countryCode')
                table.integer('zipCode')
                table.string('city')
                table.string('state')
                table.string('stateAb')
                table.string('county')
                table.string('stateCountyCode')
                table.float('lat')
                table.float('long')
                table.timestamps()
            }).then( onCreated => {
                console.log('Now Importing Data')
                knex.batchInsert('zips', data, 1500).then(function() {
                    console.log('Import Complete');
                    process.exit(0);
                })
                .catch(err => {
                    console.log(error)
                    process.exit(0);
                });
            })
        })
    }
};

module.exports = self;