import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from "react-router-dom"
import Sidebar from '../components/core/Dashboard/Sidebar'
import Loading from '../components/common/Loading'
import {ACCOUNT_TYPE} from '../utils/constants'

const Dashboard = () => {

    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);


    if (profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                <Loading />
            </div>
        )
    }

    // Scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    // Check the user's role to determine which content should be displayed
    const renderContent = () => {
        if (user?.accountType === ACCOUNT_TYPE.ADMIN) {
            return <Outlet />;
        }
        if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            return <Outlet />;
        }
        if (user?.accountType === ACCOUNT_TYPE.STUDENT) {
            return <Outlet />;
        }

        // Default case if no valid account type is found
        
        return <p>You do not have permission to access this dashboard.</p>;
    }
    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)] '>
            <Sidebar />

            <div className='h-[calc(100vh-3.5rem)] overflow-auto w-full'>
                <div className='mx-auto w-11/12 max-w-[1000px] py-10 '>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
