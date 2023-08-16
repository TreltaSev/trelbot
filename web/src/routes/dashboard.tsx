/**
 * Path: www.local.xyz/dashboard
 * Description: Dashboard, look in github
 */

import React from "react"
import { useParams } from "react-router-dom"

const Dashboard: React.FC = () => {

    let { guildId } = useParams();
    
    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard