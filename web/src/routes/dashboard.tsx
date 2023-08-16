/**
 * Path: www.local.xyz/dashboard
 * Description: Dashboard, look in github
 */

import { NavTemplate } from "@components/Global";
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import styling from "@assets/styling.module.css"

type DashType = "selector" | "editor";

const Selector: React.FC = () => {
    return (
        <NavTemplate classNames={`${styling.dark}`}>
            <div>
                Selector
            </div>
        </NavTemplate>
    )
}

const Editor: React.FC = () => {
    return (
        <NavTemplate classNames={`${styling.dark}`}>
            <div>
                Editor
            </div>
        </NavTemplate>
    )
}

const Dashboard: React.FC = () => {

    let { guildId } = useParams();

    const DashType: DashType = guildId === undefined ? "selector" : "editor";

    switch(DashType) {
        case "selector":
            return <Selector/>

        case "editor":
            return <Editor/>
    }
}

export default Dashboard