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

    const fetchJournals = async () => {
        try {
            const response = await axios.get('/api/journals')
            setJournals(response.data.data)
        } catch (error) {
            setNotification(error.response?.data?.message || 'Something went wrong.')
        }
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
                                <button onClick={() => setIsModalddCreateTransferOpen(true)} className="bg-indigo-500 text-white py-2 px-6 rounded-lg">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionPage
