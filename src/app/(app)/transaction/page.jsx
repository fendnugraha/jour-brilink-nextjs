'use client'
import Modal from '@/components/Modal'
import CreateTransfer from './components/CreateTransfer'
import Header from '../Header'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import Notification from '@/components/notification'
import { useAuth } from '@/hooks/auth'
import Loading from '../Loading'
import formatNumber from '@/lib/formatNumber'
import Paginator from '@/components/Paginator'
import Link from 'next/link'
import formatDateTime from '@/lib/formatDateTime'
import { ArrowRightIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid'

const TransactionPage = () => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }
    const [journals, setJournals] = useState([])
    const [isModalddCreateTransferOpen, setIsModalddCreateTransferOpen] = useState(false)
    const [notification, setNotification] = useState('')
    const closeModal = () => {
        setIsModalddCreateTransferOpen(false)
    }

    const fetchJournals = async (url = '/api/journals') => {
        try {
            const response = await axios.get(url)
            setJournals(response.data.data)
        } catch (error) {
            setNotification(error.response?.data?.message || 'Something went wrong.')
        }
    }

    useEffect(() => {
        fetchJournals()
    }, [])

    const handleChangePage = url => {
        fetchJournals(url)
    }
    return (
        <>
            <Header title="Transaction" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {notification && <Notification notification={notification} onClose={() => setNotification('')} />}
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="mb-2">
                                <button
                                    onClick={() => setIsModalddCreateTransferOpen(true)}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg">
                                    Tansfer Uang <PlusCircleIcon className="size-4 inline" />
                                </button>
                                <Modal isOpen={isModalddCreateTransferOpen} onClose={closeModal} modalTitle="Transfer">
                                    <CreateTransfer
                                        isModalOpen={setIsModalddCreateTransferOpen}
                                        notification={message => setNotification(message)}
                                        fetchJournals={fetchJournals}
                                        user={user}
                                    />
                                </Modal>
                            </div>
                            <table className="table w-full text-xs mb-2">
                                <thead className="">
                                    <tr className="">
                                        <th className="">Keterangan</th>
                                        <th>Jumlah</th>
                                        <th className="hidden sm:table-cell">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {journals.data?.map((journal, index) => (
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
                                                <span className="text-xs text-blue-600 block">{formatNumber(journal.fee_amount)}</span>
                                            </td>
                                            <td className="hidden sm:table-cell">
                                                <span className="flex justify-center">
                                                    <button className="bg-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded-lg text-white mr-2">
                                                        <PencilIcon className="size-4" />
                                                    </button>
                                                    <button className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg text-white">
                                                        <TrashIcon className="size-4" />
                                                    </button>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {journals?.links && <Paginator links={journals} handleChangePage={handleChangePage} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionPage
