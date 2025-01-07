'use client'
import formatNumber from '@/lib/formatNumber'
import formatDateTime from '@/lib/formatDateTime'
import axios from '@/lib/axios'
import { useState, useEffect } from 'react'
import TimeAgo from '@/lib/formatDateDistance'

const CashBankBalance = ({ warehouse, fetchJournalsByWarehouse }) => {
    const [accounts, setAccounts] = useState([])
    const getAccountBalance = async () => {
        try {
            const response = await axios.get(`/api/get-cash-bank-balance/${warehouse}`)
            setAccounts(response.data.data)
        } catch (error) {
            setErrors(error.response?.data?.errors || ['Something went wrong.'])
        }
    }

    useEffect(() => {
        getAccountBalance()
    }, [fetchJournalsByWarehouse, warehouse])

    const [errors, setErrors] = useState([])
    const summarizeBalance = accounts?.reduce((total, account) => total + account.balance, 0)

    return (
        <div>
            <div className="flex justify-center items-center mb-3 flex-col bg-sky-950 hover:bg-sky-900 p-2 rounded-2xl text-orange-300 hover:text-white">
                <h1 className="text-sm">Total Saldo Kas & Bank</h1>
                <h1 className="text-2xl font-black">{formatNumber(summarizeBalance)}</h1>
            </div>
            {accounts?.length > 0 ? (
                accounts?.map(account => (
                    <div className="rounded-lg" key={account.id}>
                        <div className="mb-2">
                            <div className="flex flex-col hover:scale-105 justify-between py-2 px-4 rounded-2xl shadow-sm hover:shadow-lg bg-orange-200 hover:bg-orange-300 transition duration-150 ease-out">
                                <h1 className="text-xs">{account.acc_name}</h1>

                                <h1 className="text-lg font-bold text-end">{formatNumber(account.balance)}</h1>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex justify-center items-center mb-3 flex-col bg-sky-950 hover:bg-sky-900 p-2 rounded-2xl text-orange-300 hover:text-white">
                    <h1>No data</h1>
                </div>
            )}
        </div>
    )
}

export default CashBankBalance
