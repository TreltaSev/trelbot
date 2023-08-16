/**
 * Path: www.local.xyz/dashboard
 * Description: Dashboard, look in github
 */

import React, { useEffect } from "react"
import { useParams } from "react-router-dom"

const Dashboard: React.FC = () => {

    let { guildId } = useParams();

    useEffect(() => {
        console.log(guildId)
    }, [])

    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard