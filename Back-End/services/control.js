

class DataControl {

    async sortByAssessmentType(data){
        //all data is in data [for now because I dont have last weeks reports! Also we can keep like this until we have thousands if that ever happens] 
        const eRQAnum = 0;
        const SAFEnum = 0;
        for (let i = 0; i < data.length; i++){
            const dataPoint = data[i];
            if (dataPoint.aType === 'eRQA'){
                eRQAnum++;
            }else if (dataPoint.aType === 'SAFE Daily Critical'){
                SAFEnum++;
            }
            return {eRQA: eRQAnum, SAFE: SAFEnum}
        }
    }
}

module.exports = DataControl;