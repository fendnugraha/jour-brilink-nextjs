'use client'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import Label from '@/components/Label'
import Input from '@/components/Input'

const CreateExpense = ({ isModalOpen, notification, fetchJournalsByWarehouse, user }) => {
    const [expense, setExpense] = useState([])
    const [formData, setFormData] = useState({
        debt_code: '',
        cred_code: user.role.warehouse.chart_of_account_id,
        amount: 0,
        fee_amount: '',
        trx_type: 'Pengeluaran',
        description: 'Biaya Operasional Toko',
    })
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchExpense = async () => {
        try {
            const response = await axios.get(`/api/get-expenses`)
            setExpense(response.data.data) // Commented out as it's not used
        } catch (error) {
            notification(error.response?.data?.message || 'Something went wrong.')
        }
    }

    useEffect(() => {
        fetchExpense()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post('/api/create-mutation', formData)
            notification(response.data.message)
            fetchJournalsByWarehouse()
            setFormData({
                debt_code: '',
                cred_code: user.role.warehouse.chart_of_account_id,
                amount: 0,
                fee_amount: '',
                trx_type: 'Pengeluaran',
                description: 'Biaya Operasional Toko',
            })
        } catch (error) {
            setErrors(error.response?.data?.errors || ['Something went wrong.'])
        } finally {
            setLoading(false)
        }
    }
    return (
        <form>
            <div className="mb-2 grid grid-cols-3 gap-4 items-center">
                <Label>Dari Rekening</Label>
                <div className="col-span-2">
                    <select
                        onChange={e => setFormData({ ...formData, debt_code: e.target.value })}
                        value={formData.debt_code}
                        className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <option value="">--Pilih Rekening--</option>
                        {expense.map(expense => (
                            <option key={expense.id} value={expense.id}>
                                {expense.acc_name}
                            </option>
                        ))}
                    </select>
                    {errors.debt_code && <span className="text-red-500 text-xs">{errors.debt_code}</span>}
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-4 items-center">
                <Label>Jumlah</Label>
                <div className="col-span-2">
                    <Input
                        type="number"
                        placeholder="Rp."
                        value={formData.fee_amount}
                        onChange={e => setFormData({ ...formData, fee_amount: -e.target.value })}
                    />
                    {errors.fee_amount && <span className="text-red-500 text-xs">{errors.fee_amount}</span>}
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-4 items-center">
                <Label>Keterangan</Label>
                <div className="col-span-2">
                    <textarea
                        className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        type="text"
                        placeholder="(Optional)"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                    {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className="bg-indigo-500 hover:bg-indigo-600 rounded-xl px-8 py-3 text-white disabled:bg-slate-300 disabled:cursor-not-allowed"
                disabled={loading}>
                {loading ? 'Loading...' : 'Simpan'}
            </button>
        </form>
    )
}

export default CreateExpense
