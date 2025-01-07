'use client'
import Header from '@/app/(app)/Header'
import Modal from '@/components/Modal'
import { useEffect, useState } from 'react'
import Notification from '@/components/notification'
import axios from '@/lib/axios'
import DailyDashboard from './components/DailyDashboard'
import { useAuth } from '@/hooks/auth'

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const [notification, setNotification] = useState('')

    return (
        <>
            {notification && <Notification notification={notification} onClose={() => setNotification('')} />}
            <div className="">
                {/* <h1 className="text-2xl font-bold mb-4">Point of Sales - Add to Cart</h1> */}
                <Header title={'Dashboard'} />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <DailyDashboard user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
