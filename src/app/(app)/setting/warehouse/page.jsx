'use client'

import Header from '@/app/(app)/Header'
import Modal from '@/components/Modal'
import Paginator from '@/components/Paginator'
import axios from '@/lib/axios'
import { EyeIcon, MapPinIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import CreateWarehouse from './CreateWarehouse'
import formatDateTime from '@/lib/formatDateTime'
import Notification from '@/components/notification'
import Link from 'next/link'

const Warehouse = () => {
    const [warehouses, setWarehouses] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [isModalCreateWarehouseOpen, setIsModalCreateWarehouseOpen] = useState(false)
    const [notification, setNotification] = useState(null)
    const [errors, setErrors] = useState([]) // Store validation errors
    const closeModal = () => setIsModalCreateWarehouseOpen(false)

    const fetchWarehouses = async (url = '/api/warehouse') => {
        setLoading(true)
        try {
            const response = await axios.get(url)
            setWarehouses(response.data.data)
        } catch (error) {
            setErrors(error.response?.data?.errors || ['Something went wrong.'])
        }
    }

    useEffect(() => {
        fetchWarehouses()
        setLoading(false)
    }, [])

    const handleChangePage = url => {
        fetchWarehouses(url)
    }
    return (
        <>
            <Header title="Warehouse" />
            <div className="py-12">
                {notification && <Notification notification={notification} onClose={() => setNotification('')} />}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-end gap-2">
                            <button className="btn-primary" onClick={() => setIsModalCreateWarehouseOpen(true)}>
                                Tambah Gudang <PlusCircleIcon className="w-5 h-5 inline" />
                            </button>
                            <Modal isOpen={isModalCreateWarehouseOpen} onClose={closeModal} modalTitle="Create warehouse">
                                <CreateWarehouse
                                    isModalOpen={setIsModalCreateWarehouseOpen}
                                    notification={message => setNotification(message)}
                                    fetchWarehouses={fetchWarehouses}
                                />
                            </Modal>
                        </div>
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Warehouse Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {warehouses?.data?.length === 0 ? (
                                    <tr>
                                        <td colSpan="7">No warehouse found</td>
                                    </tr>
                                ) : (
                                    warehouses?.data?.map(warehouse => (
                                        <tr key={warehouse.id}>
                                            <td>
                                                <span className="font-bold text-green-600">{warehouse.name}</span>
                                                <span className="block text-xs">
                                                    {warehouse.code} | {warehouse.chart_of_account.acc_name} | {formatDateTime(warehouse.created_at)}
                                                </span>
                                                <span className="block text-xs">
                                                    <MapPinIcon className="w-4 h-4 inline" /> {warehouse.address}
                                                </span>
                                            </td>
                                            <td className="w-32">
                                                <div className="flex gap-2">
                                                    <Link
                                                        className="bg-blue-600 hover:bg-blue-400 p-2 rounded-lg text-white"
                                                        href={`/setting/warehouse/detail/${warehouse.id}`}>
                                                        <EyeIcon className="size-5" />
                                                    </Link>
                                                    <button className="bg-red-600 hover:bg-red-400 p-2 rounded-lg text-white">
                                                        <TrashIcon className="size-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {warehouses?.links && <Paginator links={warehouses} handleChangePage={handleChangePage} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Warehouse