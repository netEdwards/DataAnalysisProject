import sty from './adata.module.css';

const AssessmentRow = ({assessment, value}) => {
    return (
        <div className={sty.main}>
            <div className={sty.head}>
            <h3>{assessment} : </h3>
            </div>
            <div className={sty.value}>
            <p> {value}</p>
            </div>
        </div>
    )
}
export default AssessmentRow;