'use client'
import formatNumber from '@/lib/formatNumber'
import formatDateTime from '@/lib/formatDateTime'
import axios from '@/lib/axios'
import { useState, useEffect } from 'react'
import TimeAgo from '@/lib/formatDateDistance'

const DailyDashboard = ({ user, notification }) => {
    const [data, setData] = useState([])
    const warehouse = user.role?.warehouse_id
    const [loading, setLoading] = useState(false)

    const getDailyDashboard = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/daily-dashboard/${warehouse}`)
            setData(response.data.data)
            localStorage.setItem('dailyDashboard', JSON.stringify(response.data.data))
        } catch (error) {
            notification(error.response?.data?.message || 'Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getDailyDashboard()
    }, [])
    return (
        <div className="relative">
            <div className="min-h-[28rem] grid grid-cols-1 sm:grid-cols-5 sm:grid-rows-4 gap-1 sm:gap-3">
                <div className="bg-gray-800 w-full h-full p-3 rounded-lg sm:rounded-3xl flex flex-col gap-6 items-center justify-center col-span-2 row-span-2">
                    <div className="flex gap-2 flex-col justify-center items-center">
                        <h4 className="text-md sm:text-xl font-bold text-white">Saldo Kas Tunai</h4>
                        <h1 className="text-2xl sm:text-4xl font-black text-yellow-300">{loading ? 'Loading...' : formatNumber(data?.totalCash)}</h1>
                    </div>
                    <div className="flex gap-2 w-full justify-evenly">
                        <div>
                            <h4 className="text-xs text-white">Saldo Bank</h4>
                            <h1 className="text-sm font-bold text-white">{loading ? 'Loading...' : formatNumber(data?.totalBank)}</h1>
                        </div>
                        <div>
                            <h4 className="text-xs text-yellow-400">Total Kas & Bank</h4>
                            <h1 className="text-sm font-bold text-white">{loading ? 'Loading...' : formatNumber(data?.totalCash + data?.totalBank)}</h1>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 w-full h-full p-3 rounded-lg sm:rounded-3xl flex flex-col gap-2 items-center justify-center col-span-2 row-span-2">
                    <div className="flex gap-10 justify-between items-center">
                        <div className="flex gap-2 flex-col justify-center items-center">
                            <h4 className="text-md sm:text-lg font-bold text-white">Voucher & SP</h4>
                            <h1 className="text-2xl sm:text-3xl font-black text-yellow-300">{loading ? 'Loading...' : formatNumber(data?.totalVoucher)}</h1>
                        </div>
                        {/* <div className="flex gap-2 flex-col justify-center items-center">
                    <h4 className="text-md sm:text-lg font-bold text-white">Accessories</h4>
                    <h1 className="text-2xl sm:text-3xl font-black text-yellow-300">100000
                    </h1>
                </div> */}
                    </div>
                </div>
                <div className="bg-violet-700 rounded-lg sm:rounded-3xl w-full h-full p-3 flex flex-col gap-1 items-center justify-center">
                    <h4 className="text-md sm:text-xl text-white">Total Setoran</h4>
                    <h1 className="text-2xl font-extrabold text-white">
                        {loading ? 'Loading...' : formatNumber(data?.totalCashDeposit + data?.profit + data?.totalCash + data?.totalVoucher)}
                    </h1>
                </div>
                <div className="bg-orange-500 rounded-lg sm:rounded-3xl w-full h-full p-3 flex flex-col gap-1 items-center justify-center">
                    <h4 className="text-md sm:text-xl text-white">Fee (Admin)</h4>
                    <h1 className="text-2xl font-extrabold text-white">{loading ? 'Loading...' : formatNumber(data?.totalFee)}</h1>
                </div>
                <div className="bg-gray-800 w-full h-full p-3 rounded-lg sm:rounded-3xl flex flex-col gap-4 sm:gap-6 items-center justify-center col-span-2 row-span-2">
                    <div className="flex gap-2 flex-col justify-center items-center">
                        <h4 className="text-md sm:text-xl font-bold text-white">Laba (Profit)</h4>
                        <h1 className="text-2xl sm:text-4xl font-black text-yellow-300">{loading ? 'Loading...' : formatNumber(data?.profit)}</h1>
                    </div>
                    <div className="flex gap-2 w-full justify-evenly">
                        <div>
                            <h4 className="text-xs text-white">Transfer Uang</h4>
                            <h1 className="text-sm font-bold text-white">{loading ? 'Loading...' : formatNumber(data?.totalTransfer)}</h1>
                        </div>
                        <div>
                            <h4 className="text-xs text-white">Tarik Tunai</h4>
                            <h1 className="text-sm font-bold text-white">{loading ? 'Loading...' : formatNumber(data?.totalCashWithdrawal)}</h1>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 w-full h-full p-3 rounded-lg sm:rounded-3xl flex flex-col gap-2 items-center justify-center col-span-2 row-span-2">
                    <h4 className="text-md sm:text-xl font-bold text-white">Deposit</h4>
                    <h1 className="text-2xl sm:text-4xl font-black text-yellow-300">{loading ? 'Loading...' : formatNumber(data?.totalCashDeposit)}</h1>
                </div>
                <div className="bg-red-600 rounded-lg sm:rounded-3xl w-full h-full p-3 flex flex-col gap-1 items-center justify-center">
                    <h4 className="text-md sm:text-xl text-white">Biaya</h4>
                    <h1 className="text-2xl font-extrabold text-white">{loading ? 'Loading...' : formatNumber(data?.totalExpense)}</h1>
                </div>
                <div className="bg-gray-700 rounded-lg sm:rounded-3xl w-full h-full p-3 flex flex-col gap-1 items-center justify-center">
                    <h4 className="text-md sm:text-xl text-white">Transaksi</h4>
                    <h1 className="text-2xl font-extrabold text-white">{loading ? 'Loading...' : formatNumber(data?.salesCount)}</h1>
                </div>
            </div>
            {/* <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm h-full w-full flex items-center justify-center gap-2">
                    <i className="fa-solid fa-spinner animate-spin text-white text-3xl"></i>
                    <p className="text-white text-sm font-bold">Loading data, please wait...</p>
                </div>
            </div> */}
        </div>
    )
}

export default DailyDashboard
