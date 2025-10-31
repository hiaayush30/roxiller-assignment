import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

function Dashboard() {
    const { user } = useAuthStore();
    return (
        <div>
            {JSON.stringify(user)}
        </div>
    )
}


export default Dashboard
