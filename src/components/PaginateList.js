import React from 'react'

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange, className }) => {
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    // Handle page change
    const goToPage = page => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page) // Pass back the new page to the parent component
        }
    }

    return (
        <div className={`flex justify-between items-center mt-3 ${className}`}>
            <div className="w-1/2 text-slate-500">
                <span>
                    {currentPage} of {totalPages}
                </span>
            </div>

            <div className="flex justify-end items-center gap-1 w-1/2">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="border border-slate-300 rounded-lg py-1 px-4">
                    Prev
                </button>

                {/* Optional: Show individual page numbers */}
                <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToPage(index + 1)}
                            className={`border border-slate-300 rounded-lg py-1 px-4 ${currentPage === index + 1 ? 'bg-slate-600 text-white' : ''}`}>
                            {index + 1}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border border-slate-300 rounded-lg py-1 px-4">
                    Next
                </button>
            </div>
        </div>
    )
}

export default Pagination
