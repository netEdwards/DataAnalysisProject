import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import sy from "./index.module.css"



const ReportBoard = () => {
    // Create a way to get the report info,
    // Lets have
    // aType, Assessment, Observer, Question, Finding, Priority, Date
    const sheeticon = <i class="fa-solid fa-file-arrow-down"></i>
    const [hiramReports, setHiramReports] = useState(null);
    const [dallasReports, setDallasReports] = useState(null);
    const [currentReports, setCurrentReports] = useState(null); // this will be the current report that will be interchanged between hiram and dallas by the user.
    const [selected, setSelected] = useState(1);
    const[download, setDownload] = useState(false);
    const isDemo = localStorage.getItem('isDemo') === 'true';
    useEffect(() => {
        axios.get('/grdHiram').then(res => {
          setHiramReports(res.data)//setting the hiram reports to its useState value
        }).catch(err => {console.error(err)});
        axios.get('/grdDallas').then(res => {
          setDallasReports(res.data)//setting the dallas reports to its useState value
          console.log(res.data);
        }).catch(err => {console.error(err)});
    }, []);

    const handleClick = () => {
      setDownload(true);
      let url = selected === 1 ? '/grdHiramSheet' : '/grdDallasSheet';
      let filename = selected === 1 ? 'HiramReports.csv' : 'DallasReports.csv';
    
      axios({
        url: url,
        method: 'GET',
        responseType: 'blob', // Important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        setDownload(false);
      }).catch(err => {
        console.error(err);
      });
    }

    useEffect(() => {
        if(selected === 1) {
          setCurrentReports(hiramReports)
        } else {
          setCurrentReports(dallasReports)
        }
    }, [selected, hiramReports, dallasReports]);
    const options = [
        {value: 1, label: 'Hiram'},
        {value: 2, label: 'Dallas'}
    ]
    const handleSelect = (selected) => {
      setSelected(selected[0].value);
    }

    const ReportDisplay = ({report}) => {
      return (
        <tr>
          <td>{report.store}</td>
          <td>{report.aType}</td>
          <td>{report.assessment}</td>
          <td>{report.obsever}</td>
          <td>{report.question}</td>
          <td>{report.finding}</td>
          <td>{report.priority}</td>
          <td>{report.date}</td>
          <td>{report.time}</td>
        </tr>
      )
    }
    // const ReportDisplay = ({store, aType, assessment, observer, question, finding, priority, date, time}) => {
    //   return (
    //     <div className={sy.object}>
    //       <h1>{store}</h1>
    //       <p>{aType}</p>
    //       <p>{assessment}</p>
    //       <p>{observer}</p>
    //       <p>{question}</p>
    //       <p>{finding}</p>
    //       <p>{priority}</p>
    //       <p>{date}</p>
    //       <p>{time}</p>
    //     </div>
    //   )
    // }


    return (
      <div className={sy.main}>
        <div className={sy.info}>
          <h1>Reports</h1>
          <p>
            This is a secondary feed displaying only the previous 7 days worth of reports.
            Just a quick visual, however if you click the download button it will create a sheet.
            A google sheet, it will be download to your computer, however one day it will email you
            a link to the sheet, but, this is still a work in progress, as getting permissions
            setup on google drive's api is a bit of a pain.
          </p>
        </div>
        {!isDemo && <div className={sy.controls}>
          {download && <p>Downloading....</p>}
          <button title="Download Selected Store Sheet" onClick={handleClick} >{sheeticon}</button>
          <Select
            style={{
            width: "15em",
            textAlign: "center",
            borderRadius: "0.5em",
            borderColor: "white",                            
            colors: {
                background: "black",
                placeholder: "white",
                search: "red",
                arrow: "blue",
                arrowOpen: "green",
                text: "White",
                itemAndGroupHeader: "yellow"
            }
          }}
          className={sy.sel}
          options={options}
            onChange={handleSelect}
          />
        </div>}
        {isDemo && <h1 style={{fontFamily: "Karla"}}>UNAVAILABLE IN DEMO MODE</h1>}
        {!isDemo && <div className={sy.feed}>
            <table className={sy.datatable}>
              <thead>
                <tr>
                  <th>Store</th>
                  <th>Type</th>
                  <th>Assessment</th>
                  <th>Observer</th>
                  <th>Question</th>
                  <th>Finding</th>
                  <th>Priority</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {currentReports && currentReports.map((report, index) => 
                  <ReportDisplay
                    key={index}
                    report={report}
                  />
                )}
              </tbody>
            </table>
        </div>}
      </div>
        
  )}

export default ReportBoard;