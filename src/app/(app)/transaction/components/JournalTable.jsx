import Paginator from '@/components/Paginator'
import { ArrowRightIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import formatNumber from '@/lib/formatNumber'
import formatDateTime from '@/lib/formatDateTime'
import axios from '@/lib/axios'

const JournalTable = ({ journals, handleChangePage, fetchJournals, notification }) => {
    const handleDeleteJournal = async id => {
        try {
            const response = await axios.delete(`/api/journals/${id}`)
            notification(response.data.message)
            fetchJournals()
        } catch (error) {
            notification(error.response?.data?.message || 'Something went wrong.')
        }
    }
    return (
        <>
            <table className="table w-full text-xs">
                <thead className="">
                    <tr className="">
                        <th className="">Keterangan</th>
                        <th>Jumlah</th>
                        <th className="hidden sm:table-cell">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {journals?.data?.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="text-center">
                                <span className="text-sm text-slate-500">Tidak ada transaksi</span>
                            </td>
                        </tr>
                    ) : (
                        journals.data?.map((journal, index) => (
                            <tr className="" key={index}>
                                <td className="">
                                    <span className="text-xs text-slate-500 block">
                                        {formatDateTime(journal.created_at)} | {journal.invoice} | {journal.trx_type}
                                    </span>
                                    ID: {journal.id} {journal.description}
                                    <span className="block font-bold text-xs">
                                        {journal.cred.acc_name} <ArrowRightIcon className="size-4 inline" /> {journal.debt.acc_name}
                                    </span>
                                </td>
                                <td className="font-bold">
                                    {formatNumber(journal.amount)}
                                    {journal.fee_amount !== 0 && <span className="text-xs text-blue-600 block">{formatNumber(journal.fee_amount)}</span>}
                                </td>
                                <td className="hidden sm:table-cell">
                                    <span className="flex justify-center">
                                        <button className="bg-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded-lg text-white mr-2">
                                            <PencilIcon className="size-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteJournal(journal.id)}
                                            className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg text-white">
                                            <TrashIcon className="size-4" />
                                        </button>
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {journals.last_page > 1 && <Paginator links={journals} handleChangePage={handleChangePage} />}
        </>
    )
}

export default JournalTable
