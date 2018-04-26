///////////////////////
//////////////////////
// API Controller

const knex  = require('../db');

let self = {

    /////////////////////////////////////////////////////////
    // 1. Makes an async db query with zipcode
    // 2. Sends json payload as response
    /////////////////////////////////////////////////////////
    findByZip: async (req, res, next) => {

        let queryResults = 
            await knex('zips').where({
                zipCode: parseInt(req.params.zipCode),
            }).select()
            .catch(err => {
                res.status(200).json({
                    err: {
                        msg: 'Please make sure that you are sending your request with a zipcode.',
                    }
                });
            })

        res.send({
            dataModel: {
                pageDetails: { 
                    totalRows: queryResults.length 
                },  
                queryResults: queryResults 
            }
        })

    },

    //////////////////////////////////////////////////////////////////////
    // 1. Set custom and default query params
    // 2. Makes the following async db queries
    //  a. Count the total amount of records for the state
    //  b. Gets the result set based upon the custom or default params
    // 3. Sends json payload as response
    ////////////////////////////////////////////////////////////////////
    findByState: async (req, res, next) => {
        
        let limit = req.query.limit ? parseInt(req.query.limit) : 50,
            orderBy = req.query.orderby ? req.query.orderby : 'city',
            sort = req.query.sort ? req.query.sort : 'asc',
            offset = req.query.offset ? parseInt(req.query.offset) : 0

        let queryTotalResults = 
            await knex('zips').select().count('*').where({
                stateAb: req.params.stateAb.toUpperCase(),
            }).catch(err => {
                next(err)
            })

        let queryResults = 
            await knex('zips').select()
            .where({
                stateAb: req.params.stateAb.toUpperCase(),
            })
            .orderBy(orderBy, sort)
            .limit(limit)
            .offset(offset)
            .catch(err => {
                res.status(200).json({
                    err: {
                        msg: 'Please make sure that you are sending the correct query params.',
                    }
                });
            })
        
        // Pageinate First and Last Page Fix 
        let totalResults = parseInt(queryTotalResults[0].count),
            currentPage = Math.ceil(offset/limit),
            totalPages = Math.ceil(totalResults/limit)
        
        
        if(currentPage > totalPages)
            currentPage = totalPages
        
        if(currentPage === 0)
            currentPage = 1
         // /Pageinate First and Last Page Fix 

        res.json({
            dataModel: {
                pageDetails: { 
                    totalResults: totalResults ,
                    totalResultsPage: queryResults.length,
                    currentPage: currentPage,
                    totalPages: totalPages
                },  
                queryResults: queryResults 
            }
        })
    }
}
module.exports = self