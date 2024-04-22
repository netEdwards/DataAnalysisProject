const mg = require('mongoose');
const Report = require('../models/cfareports');
const path = require('path');
require('dotenv').config({path: (__dirname, '../.env')});

// Create queries to get data from MongoDB
// We need to ensure that we have general queries that can be used to get predefined data groups from MongoDB
// AKA, allowing for dynamic and in-the-moment data queries is nice, 
//     but we need to have some predefined queries that can be used to get data that is commonly used, for speed and efficiency.

class Query {

    constructor(){
        this.mainQuery();
    }

    async  mainQuery(){
        try{
            await mg.connect(process.env.MONGO_URI);
            console.log('Connected to the database');
        }catch (err){
            console.error('Error connecting to the database', err);
        }
    }
    async getDallasReports() {
    //Return all reports for Dallas using the string "CFA - 02679 Dallas (GA) FSU"
        try{
            const results = await Report.find({store: 'CFA - 02679 Dallas (GA) FSU'})
            return results;
        }catch (err){
            console.error('Error getting reports for Dallas', err);
    }
    
    }
    async getHiramReports() {
        //Return all reports for Hiram using the string "CFA - 04866 Hiram FSU"
        try{
            const results = await Report.find({store: 'CFA - 04866 Hiram FSU'})
            return results;
        }catch (err){
            console.error('Error getting reports for Hiram', err);
        }
    
    }
    async getPreviousWeeksReports(){
    //Return all reports from the previous week
        try{
            const results = await Report.find({oDate: {$lt: new Date(), $gt: new Date() - 7}})
            return results;
        }catch (err){
            console.error('Error getting reports from the previous week', err);
        }
    
    }
    async getReportByDateRange(begdate, enddate){
    //Return all reports from the given date
    //Date format should be 'YYYY-MM-DD'
        try{
            const results = await Report.find({oDate:
                {
                    $gte: new Date(begdate),
                    $lt: new Date(enddate)
                }})
            return results;
        }catch (err){
            console.error('Error getting reports from the given date', err);
        }
    }
    //Basic queries to get mass data for specifics.
    async getReportByDate(date){
    try{
        const results = await Report.find({oDate: new Date(date)})
        return results;
    }catch (err){
        console.error('Error getting reports from the given date', err);
    }
    }
        async getReportByAssessmentType(aType){
        try{
            const results = await Report.find({aType: aType})
            return results;
        }catch (err){
            console.error('Error in getting report by assessment type: \n', err);
        }
    }

    async getReportByObserver(observer){
    //Format : 'FirstName[space]LastName'
        try{
            const results = await Report.find({observer: observer})
        }catch (err){
            console.error('Error in getting report by observer: \n', err);
        }
    }

    async getRiskReports(){
        try{
            const results = await Report.find({priority: 'HIGH RISK' || 'IMMEDIATE ACTION'})
        }catch(err){
            console.error('Error in getting reports with risks: \n', err);
        }
    }
    async getReportByRisk(risk){
        //Format : 'HIGH RISK' || 'IMMEDIATE ACTION || 'LOW RISK || 'MODERATE RISK' || ' ' 
        try{
            const results = await Report.find({priority: risk})
        }catch(err){
            console.error('Error in getting reports by risk level: \n', err);
        }
    }

    async getReportByCategory(category){
        try{
            const results = await Report.find({category: category})
        }catch(err){
            console.error('Error in getting reports by category: \n', err);
        }
    }

    async getReportBySubCategory(subCategory){
        try{
            const results = await Report.find({subCategory: subCategory})
        }catch(err){
            console.error('Error in getting reports by sub category: \n', err);
        }
    }

    async getReportByAssessment(assessment){
        try{
            const results = await Report.find({assessment: assessment})
        }
        catch(err){
            console.error('Error in getting reports by assessment: \n', err);
        }
    }

    async getFixedReports(){
        try{
            const results = await Report.find({fixed: "yes"})
        }catch(err){
            console.error('Error in getting reports marked fixed: \n', err);
        }
        }
    //Be careful calling this, it will return all reports in the database, which could cause major data load times. 
    async getAllReports(){
        try{
            const results = await Report.find({})
            return results;
        }catch(err){
            console.error('Error in getting all reports: \n', err);
        }
    }
}

module.exports = { Query };
