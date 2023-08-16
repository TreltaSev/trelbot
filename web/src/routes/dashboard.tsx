/**
 * Path: www.local.xyz/dashboard
 * Description: Dashboard, look in github
 */

import React, { useEffect } from "react"
import { useParams } from "react-router-dom"

type DashType = "selector" | "editor";

const Selector: React.FC = () => {
    return (
        <div>
            Selector
        </div>
    )
}

const Editor: React.FC = () => {
    return (
        <div>
            Editor
        </div>
    )
}

const Dashboard: React.FC = () => {

    let { guildId } = useParams();

    const DashType: DashType = guildId === undefined ? "selector" : "editor";

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