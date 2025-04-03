import { getPaginationRange } from "../../Utils/PaginationRange";
import "./Pagination.css";

const Pagination = ({ paginationStates }) => {
    const paginationRangeArray = getPaginationRange(paginationStates.totalPage, paginationStates.currentPage, paginationStates.siblings);

    function handlePageChange(value) {
        if (value === "&laquo" || value === " ...") {
            paginationStates.setCurrentPage(1);
        } else if (value === "&lsaquo") {
            if (paginationStates.currentPage !== 1) {
                paginationStates.setCurrentPage(paginationStates.currentPage - 1);
            }
        } else if (value === "&rsaquo") {
            if (paginationStates.currentPage !== paginationStates.totalPage) {
                paginationStates.setCurrentPage(paginationStates.currentPage + 1);
            }
        } else if (value === "&raquo" || value === "... ") {
            paginationStates.setCurrentPage(paginationStates.totalPage);
        } else {
            paginationStates.setCurrentPage(value);
        }
    }

    return (
        <div className="d-flex flex-wrap justify-content-end">
            <div className="d-flex flex-wrap align-items-center px-3 py-2 secondary-bg" aria-label="Page navigation example">
                <select className="form-select select margin-y" value={paginationStates.pageStrength} onChange={(e) => {
                    paginationStates.setPageStrength(e.target.value);
                    paginationStates.setCurrentPage(1);
                }}>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <ul className="pagination flex-wrap margin-y">
                    <li className="page-item">
                        <span className="page-link" aria-hidden="true" aria-label="First" onClick={() => handlePageChange("&laquo")}>&laquo;</span>
                    </li>
                    <li className="page-item">
                        <span className="page-link" aria-hidden="true" aria-label="Previous" onClick={() => handlePageChange("&lsaquo")}>&lsaquo;</span>
                    </li>
                    {paginationRangeArray.map((value) => {
                        return (
                            <li key={value} className={`page-item ${value === paginationStates.currentPage ? "active" : ""}`}>
                                <span className="page-link" onClick={() => handlePageChange(value)}>{value}</span>
                            </li>
                        );
                    })}
                    <li className="page-item">
                        <span className="page-link" aria-hidden="true" aria-label="Next" onClick={() => handlePageChange("&rsaquo")}>&rsaquo;</span>
                    </li>
                    <li className="page-item">
                        <span className="page-link" aria-hidden="true" aria-label="Last" onClick={() => handlePageChange("&raquo")}>&raquo;</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Pagination;