'use client'

import Header from '@/app/(app)/Header'
import Modal from '@/components/Modal'
import Paginator from '@/components/Paginator'
import axios from '@/lib/axios'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import CreateWarehouse from './CreateWarehouse'

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
    console.log(warehouses)
    return (
        <>
            <Header title="Warehouse" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-end gap-2">
                            <button className="btn-primary" onClick={() => setIsModalCreateWarehouseOpen(true)}>
                                Tambah Gudang <PlusCircleIcon className="w-5 h-5 inline" />
                            </button>
                            <Modal isOpen={isModalCreateWarehouseOpen} onClose={closeModal} modalTitle="Create warehouse">
                                <CreateWarehouse
                                    isModalOpen={isModalCreateWarehouseOpen}
                                    notification={message => setNotification(message)}
                                    fetchWarehouses={fetchWarehouses}
                                />
                            </Modal>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Warehouse Name</th>
                                    <th>Address</th>
                                    <th>Created At</th>
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
                                            <td>{warehouse.id}</td>
                                            <td>{warehouse.name}</td>
                                            <td>{warehouse.address}</td>
                                            <td>{warehouse.created_at}</td>
                                            <td>
                                                <button className="btn-primary">Edit</button>
                                                <button className="btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Warehouse
