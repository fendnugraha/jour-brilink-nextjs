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
// import CreateCashWithdrawal from './components/CreateCashWithdrawal'
// import CreateVoucher from './components/CreateVoucher'
import JournalTable from './components/JournalTable'
import Dropdown from '@/components/Dropdown'
// import CreateDeposit from './components/CreateDeposit'
// import CreateMutationToHq from './components/CreateMutationToHq'
// import CreateBankAdminFee from './components/CreateBankAdminFee'
// import CreateExpense from './components/CreateExpense'
// import CashBankBalance from './components/CashBankBalance'
import formatNumber from '@/lib/formatNumber'

const getCurrentDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0') // Month is 0-indexed
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}
const TransactionPage = () => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }
    const [journalsByWarehouse, setJournalsByWarehouse] = useState([])
    const [loading, setLoading] = useState(false)
    const [cashBank, setCashBank] = useState([])
    const [accountBalance, setAccountBalance] = useState([])
    const [isModalCreateTransferOpen, setIsModalCreateTransferOpen] = useState(false)
    const [isModalCreateCashWithdrawalOpen, setIsModalCreateCashWithdrawalOpen] = useState(false)
    const [isModalCreateDepositOpen, setIsModalCreateDepositOpen] = useState(false)
    const [isModalCreateVoucherOpen, setIsModalCreateVoucherOpen] = useState(false)
    const [isModalCreateExpenseOpen, setIsModalCreateExpenseOpen] = useState(false)
    const [isModalCreateBankAdminFeeOpen, setIsModalCreateBankAdminFeeOpen] = useState(false)
    const [isModalCreateMutationToHqOpen, setIsModalCreateMutationToHqOpen] = useState(false)
    const [notification, setNotification] = useState('')
    const getDailyDashboard = () => JSON.parse(localStorage.getItem('dailyDashboard')) || []
    const [dailyDashboard, setDailyDashboard] = useState(getDailyDashboard)

    const closeModal = () => {
        setIsModalCreateTransferOpen(false)
        setIsModalCreateCashWithdrawalOpen(false)
        setIsModalCreateDepositOpen(false)
        setIsModalCreateVoucherOpen(false)
        setIsModalCreateMutationToHqOpen(false)
        setIsModalCreateBankAdminFeeOpen(false)
        setIsModalCreateExpenseOpen(false)
    }
    const warehouse = user.role?.warehouse_id
    const [startDate, setStartDate] = useState(getCurrentDate())
    const [endDate, setEndDate] = useState(getCurrentDate())

    const fetchJournalsByWarehouse = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/get-journal-by-warehouse/${warehouse}/${startDate}/${endDate}`)
            setJournalsByWarehouse(response.data)
        } catch (error) {
            console.error(error)
            setNotification(error.response?.data?.message || 'Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchJournalsByWarehouse()
    }, [])

    const getAccountBalance = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/get-cash-bank-balance/${warehouse}`)
            setAccountBalance(response.data.data)
        } catch (error) {
            setErrors(error.response?.data?.errors || ['Something went wrong.'])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAccountBalance()
    }, [journalsByWarehouse])

    const fetchCashBank = async () => {
        try {
            const response = await axios.get(`/api/get-cash-and-bank`)
            setCashBank(response.data.data) // Commented out as it's not used
        } catch (error) {
            notification(error.response?.data?.message || 'Something went wrong.')
        }
    }

    useEffect(() => {
        fetchCashBank()
    }, [])

    const filteredCashBankByWarehouse = cashBank.filter(cashBank => cashBank.warehouse_id === user.role.warehouse_id)
    return (
        <>
            <Header title="Transaction" />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6">
                    {notification && <Notification notification={notification} onClose={() => setNotification('')} />}
                    <div className="overflow-hidden sm:rounded-lg">
                        <div className="mb-2 flex justify-start gap-2">
                            <button
                                onClick={() => setIsModalCreateTransferOpen(true)}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg">
                                Tansfer Uang <PlusCircleIcon className="size-4 inline" />
                            </button>
                            <Modal isOpen={isModalCreateTransferOpen} onClose={closeModal} modalTitle="Transfer Uang">
                                <CreateTransfer
                                    filteredCashBankByWarehouse={filteredCashBankByWarehouse}
                                    isModalOpen={setIsModalCreateTransferOpen}
                                    notification={message => setNotification(message)}
                                    fetchJournalsByWarehouse={fetchJournalsByWarehouse}
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
                                    filteredCashBankByWarehouse={filteredCashBankByWarehouse}
                                    isModalOpen={setIsModalCreateCashWithdrawalOpen}
                                    notification={message => setNotification(message)}
                                    fetchJournalsByWarehouse={fetchJournalsByWarehouse}
                                    user={user}
                                />
                            </Modal>
                            <Modal isOpen={isModalCreateVoucherOpen} onClose={closeModal} modalTitle="Penjualan Voucher & Kartu">
                                <CreateVoucher
                                    isModalOpen={setIsModalCreateVoucherOpen}
                                    notification={message => setNotification(message)}
                                    fetchJournalsByWarehouse={fetchJournalsByWarehouse}
                                    user={user}
                                />
                            </Modal>
                            <Modal isOpen={isModalCreateDepositOpen} onClose={closeModal} modalTitle="Penjualan Deposit">
                                <CreateDeposit
                                    isModalOpen={setIsModalCreateDepositOpen}
                                    notification={message => setNotification(message)}
                                    fetchJournalsByWarehouse={fetchJournalsByWarehouse}
                                />
                            </Modal>
                            {/* Expenses */}
                            <Modal isOpen={isModalCreateMutationToHqOpen} onClose={closeModal} modalTitle="Pengembalian Saldo Kas & Bank">
                                <CreateMutationToHq
                                    cashBank={cashBank}
                                    isModalOpen={setIsModalCreateMutationToHqOpen}
                                    notification={message => setNotification(message)}
                                    fetchJournalsByWarehouse={fetchJournalsByWarehouse}
                                    user={user}
                                />
                            </Modal>
                            <Modal isOpen={isModalCreateBankAdminFeeOpen} onClose={closeModal} modalTitle="Biaya Administrasi Bank">
                                <CreateBankAdminFee
                                    filteredCashBankByWarehouse={filteredCashBankByWarehouse}
                                    isModalOpen={setIsModalCreateBankAdminFeeOpen}
                                    notification={message => setNotification(message)}
                                    fetchJournalsByWarehouse={fetchJournalsByWarehouse}
                                />
                            </Modal>
                            <Modal isOpen={isModalCreateExpenseOpen} onClose={closeModal} modalTitle="Biaya Operasional">
                                <CreateExpense
                                    isModalOpen={setIsModalCreateExpenseOpen}
                                    notification={message => setNotification(message)}
                                    fetchJournalsByWarehouse={fetchJournalsByWarehouse}
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
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <div className="col-span-3 bg-white py-6 rounded-2xl">
                                <h1 className="text-red-500">Profit: {formatNumber(dailyDashboard?.profit)} </h1>
                                <JournalTable
                                    cashBank={cashBank}
                                    journalsByWarehouse={journalsByWarehouse}
                                    fetchJournalsByWarehouse={fetchJournalsByWarehouse}
                                    notification={message => setNotification(message)}
                                    user={user}
                                />
                            </div>
                            <div>
                                <CashBankBalance warehouse={warehouse} accountBalance={accountBalance} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionPage
