'use client'
import { useState, useEffect } from 'react'
import Header from '../../Header'

const User = () => {
    const [notification, setNotification] = useState('')
    return (
        <>
            <Header title="User Management" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {notification && <Notification notification={notification} onClose={() => setNotification('')} />}
                        <div className="p-6 bg-white border-b border-gray-200"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User
