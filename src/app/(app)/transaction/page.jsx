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
import CreateCashWithdrawal from './components/CreateCashWithdrawal'
import CreateVoucher from './components/CreateVoucher'
import JournalTable from './components/JournalTable'
import Dropdown from '@/components/Dropdown'
import CreateDeposit from './components/CreateDeposit'
import CreateMutationToHq from './components/CreateMutationToHq'
import CreateBankAdminFee from './components/CreateBankAdminFee'
import CreateExpense from './components/CreateExpense'

const TransactionPage = () => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }
    const [journals, setJournals] = useState([])
    const [isModalCreateTransferOpen, setIsModalCreateTransferOpen] = useState(false)
    const [isModalCreateCashWithdrawalOpen, setIsModalCreateCashWithdrawalOpen] = useState(false)
    const [isModalCreateDepositOpen, setIsModalCreateDepositOpen] = useState(false)
    const [isModalCreateVoucherOpen, setIsModalCreateVoucherOpen] = useState(false)
    const [isModalCreateExpenseOpen, setIsModalCreateExpenseOpen] = useState(false)
    const [isModalCreateBankAdminFeeOpen, setIsModalCreateBankAdminFeeOpen] = useState(false)
    const [isModalCreateMutationToHqOpen, setIsModalCreateMutationToHqOpen] = useState(false)
    const [notification, setNotification] = useState('')
    const closeModal = () => {
        setIsModalCreateTransferOpen(false)
        setIsModalCreateCashWithdrawalOpen(false)
        setIsModalCreateDepositOpen(false)
        setIsModalCreateVoucherOpen(false)
        setIsModalCreateMutationToHqOpen(false)
        setIsModalCreateBankAdminFeeOpen(false)
        setIsModalCreateExpenseOpen(false)
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
                            <div className="mb-2 flex justify-start gap-2">
                                <button
                                    onClick={() => setIsModalCreateTransferOpen(true)}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg">
                                    Tansfer Uang <PlusCircleIcon className="size-4 inline" />
                                </button>
                                <Modal isOpen={isModalCreateTransferOpen} onClose={closeModal} modalTitle="Transfer Uang">
                                    <CreateTransfer
                                        isModalOpen={setIsModalCreateTransferOpen}
                                        notification={message => setNotification(message)}
                                        fetchJournals={fetchJournals}
                                        user={user}
                                    />
                                </Modal>
                                <button
                                    onClick={() => setIsModalCreateCashWithdrawalOpen(true)}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg">
                                    Tarik Tunai <PlusCircleIcon className="size-4 inline" />
                                </button>
                                <Modal isOpen={isModalCreateCashWithdrawalOpen} onClose={closeModal} modalTitle="Tarik Tunai">
                                    <CreateCashWithdrawal
                                        isModalOpen={setIsModalCreateCashWithdrawalOpen}
                                        notification={message => setNotification(message)}
                                        fetchJournals={fetchJournals}
                                        user={user}
                                    />
                                </Modal>
                                <Modal isOpen={isModalCreateVoucherOpen} onClose={closeModal} modalTitle="Penjualan Voucher & Kartu">
                                    <CreateVoucher
                                        isModalOpen={setIsModalCreateVoucherOpen}
                                        notification={message => setNotification(message)}
                                        fetchJournals={fetchJournals}
                                        user={user}
                                    />
                                </Modal>
                                <Modal isOpen={isModalCreateDepositOpen} onClose={closeModal} modalTitle="Penjualan Deposit">
                                    <CreateDeposit
                                        isModalOpen={setIsModalCreateDepositOpen}
                                        notification={message => setNotification(message)}
                                        fetchJournals={fetchJournals}
                                    />
                                </Modal>
                                {/* Expenses */}
                                <Modal isOpen={isModalCreateMutationToHqOpen} onClose={closeModal} modalTitle="Pengembalian Saldo Kas & Bank">
                                    <CreateMutationToHq
                                        isModalOpen={setIsModalCreateMutationToHqOpen}
                                        notification={message => setNotification(message)}
                                        fetchJournals={fetchJournals}
                                        user={user}
                                    />
                                </Modal>
                                <Modal isOpen={isModalCreateBankAdminFeeOpen} onClose={closeModal} modalTitle="Biaya Administrasi Bank">
                                    <CreateBankAdminFee
                                        isModalOpen={setIsModalCreateBankAdminFeeOpen}
                                        notification={message => setNotification(message)}
                                        fetchJournals={fetchJournals}
                                        user={user}
                                    />
                                </Modal>
                                <Modal isOpen={isModalCreateExpenseOpen} onClose={closeModal} modalTitle="Biaya Operasional">
                                    <CreateExpense
                                        isModalOpen={setIsModalCreateExpenseOpen}
                                        notification={message => setNotification(message)}
                                        fetchJournals={fetchJournals}
                                        user={user}
                                    />
                                </Modal>

                                <Dropdown
                                    trigger={<button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg">Voucher & Deposit</button>}
                                    align="left">
                                    <ul className="min-w-max">
                                        <li className="border-b hover:bg-slate-100 ">
                                            <button className="w-full text-left py-2 px-4 " onClick={() => setIsModalCreateVoucherOpen(true)}>
                                                Voucher & SP
                                            </button>
                                        </li>
                                        <li className="border-b hover:bg-slate-100 ">
                                            <button className="w-full text-left py-2 px-4" onClick={() => setIsModalCreateDepositOpen(true)}>
                                                Penjualan Pulsa dll.
                                            </button>
                                        </li>
                                    </ul>
                                </Dropdown>
                                <Dropdown
                                    trigger={<button className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg">Pengeluaran (Biaya)</button>}
                                    align="left">
                                    <ul className="min-w-max">
                                        <li className="border-b hover:bg-slate-100 ">
                                            <button className="w-full text-left py-2 px-4 " onClick={() => setIsModalCreateMutationToHqOpen(true)}>
                                                Pengembalian Saldo Kas & Bank
                                            </button>
                                        </li>
                                        <li className="border-b hover:bg-slate-100 ">
                                            <button className="w-full text-left py-2 px-4" onClick={() => setIsModalCreateExpenseOpen(true)}>
                                                Biaya Operasional
                                            </button>
                                        </li>
                                        <li className="border-b hover:bg-slate-100 ">
                                            <button className="w-full text-left py-2 px-4" onClick={() => setIsModalCreateBankAdminFeeOpen(true)}>
                                                Biaya Admin Bank
                                            </button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                            <JournalTable
                                journals={journals}
                                handleChangePage={handleChangePage}
                                fetchJournals={fetchJournals}
                                notification={message => setNotification(message)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionPage
