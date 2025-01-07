'use client'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import Label from '@/components/Label'
import Input from '@/components/Input'

const CreateMutationToHq = ({ isModalOpen, notification, fetchJournals, user }) => {
    const [cashBank, setCashBank] = useState([])
    const [formData, setFormData] = useState({
        debt_code: '',
        cred_code: '',
        amount: '',
        trx_type: 'Mutasi Kas',
        description: '',
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
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

    const hqAccount = cashBank.filter(cashBank => cashBank.warehouse_id === 1)
    const branchAccount = cashBank.filter(cashBank => cashBank.warehouse_id === user.role?.warehouse_id)

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post('/api/create-mutation', formData)
            notification(response.data.message)
            fetchJournals()
            isModalOpen(false)
        } catch (error) {
            notification(error.response?.data?.message || 'Something went wrong.')
        } finally {
            setLoading(false)
        }
    }
    return (
        <form>
            <div className="mb-2 grid grid-cols-3 gap-4 items-center">
                <Label>Dari (Cabang)</Label>
                <div className="col-span-2">
                    <select
                        onChange={e => setFormData({ ...formData, cred_code: e.target.value })}
                        value={formData.cred_code}
                        className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <option value="">--Pilih sumber dana--</option>
                        {branchAccount.map(br => (
                            <option key={br.id} value={br.id}>
                                {br.acc_name}
                            </option>
                        ))}
                    </select>
                    {errors.cred_code && <span className="text-red-500 text-xs">{errors.cred_code}</span>}
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-4 items-center">
                <Label>Ke (Pusat)</Label>
                <div className="col-span-2">
                    <select
                        onChange={e => setFormData({ ...formData, debt_code: e.target.value })}
                        value={formData.debt_code}
                        className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <option value="">--Pilih tujuan mutasi--</option>
                        {hqAccount.map(hq => (
                            <option key={hq.id} value={hq.id}>
                                {hq.acc_name}
                            </option>
                        ))}
                    </select>
                    {errors.debt_code && <span className="text-red-500 text-xs">{errors.debt_code}</span>}
                </div>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-4 items-center">
                <Label>Jumlah transfer</Label>
                <div className="col-span-2">
                    <Input type="number" placeholder="Rp." value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} />
                    {errors.amount && <span className="text-red-500 text-xs">{errors.amount}</span>}
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

export default CreateMutationToHq
