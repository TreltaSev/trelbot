/**
 * web.src.components.Global
 * Holds global methods and variables such as svg objects in host for other files
 * to easily access them
 */
import React, {ReactNode} from "react"
import styling from "@assets/styling.module.css"

export const JsonForm = (method: string, object: Object): RequestInit => {
    return {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object),
        mode: "cors"
    }
}

// Logo with background and circle not visible
export const PartialLogo = () => {
    return (
        <>
            <svg width="72" height="65" viewBox="0 0 72 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_31_93" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="72" height="65">
                    <path d="M27.3398 5C31.1888 -1.66666 40.8114 -1.66667 44.6604 5L70.6411 50C74.4901 56.6667 69.6789 65 61.9809 65H10.0193C2.32127 65 -2.48993 56.6667 1.35907 50L27.3398 5Z" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_31_93)">
                    <path d="M86.0001 -10H-13.9999V90H86.0001V-10Z" fill="#FDEAFE"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M-74.8912 140.241L-71.1396 133.739C-67.5648 127.415 -60.2385 114.588 -44.6623 110.012C-28.9094 105.259 -5.08344 108.932 3.61787 97.481C12.3192 86.0297 5.89577 59.4538 17.347 50.7525C28.7983 42.0512 58.3009 51.0478 68.3772 40.9715C78.4535 30.8952 69.2801 1.5693 75.2315 -12.6319C81.1828 -26.833 102.259 -25.9095 118.012 -30.6627C133.588 -35.2391 143.664 -45.3153 148.614 -50.2651L153.74 -55.3916L178.49 -30.6421L173.363 -25.5156C168.414 -20.5658 158.337 -10.4896 148.261 -0.41328C138.008 9.8398 127.932 19.916 117.856 29.9923C107.779 40.0686 97.7031 50.1449 87.6271 60.2211C77.5506 70.2974 67.2975 80.5504 57.2212 90.627C47.145 100.703 37.0687 110.779 26.9924 120.856C16.9162 130.932 6.83986 141.008 -3.41324 151.261C-13.4895 161.337 -23.5657 171.414 -28.5155 176.363L-33.642 181.49L-74.8912 140.241Z" fill="#1A181B"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M-104 179L-96.7521 180.237C-89.681 181.652 -75.1853 184.127 -71.473 176.172C-67.7607 168.217 -74.4782 149.478 -64.4019 147.887C-54.3256 146.296 -27.102 161.499 -13.8438 163.09C-0.585478 164.681 -0.939076 152.307 2.77322 144.352C6.48552 136.397 14.6173 132.508 22.5722 128.795C30.5272 125.083 38.6589 121.194 44.4925 115.36C50.3262 109.527 54.2152 101.395 53.6849 89.1974C53.1546 76.9998 48.5584 60.3828 55.4527 55.6099C62.347 50.8369 81.0853 57.5544 85.8583 50.6601C90.6311 43.7658 81.7924 22.9062 83.3834 12.8299C84.9744 2.7536 97.3491 3.1072 104.243 -1.66578C111.137 -6.43875 112.905 -16.6918 113.612 -21.6415L114.496 -26.7681L159.044 17.7797L156.039 20.7849C153.21 23.6133 147.2 29.6237 141.366 35.4573C135.532 41.291 129.522 47.3014 123.688 53.135C117.855 58.9686 111.844 64.979 106.011 70.8127C100.177 76.6463 94.1671 82.6567 88.3331 88.4903C82.4995 94.324 76.4891 100.334 70.6555 106.168C64.8218 112.002 58.8114 118.012 52.9778 123.846C47.1442 129.679 41.1338 135.69 35.3001 141.523C29.4665 147.357 23.4561 153.367 17.6225 159.201C11.7888 165.035 5.77842 171.045 -0.0551758 176.879C-5.88882 182.712 -11.8992 188.723 -17.7328 194.556C-23.5665 200.39 -29.5769 206.4 -35.4105 212.234C-41.2442 218.068 -47.2546 224.078 -50.083 226.906L-53.0882 229.912L-104 179Z" fill="#8C52FF"/>
                </g>
                <mask id="mask1_31_93" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="21" y="25" width="31" height="30">
                    <path d="M36.0001 55C44.2844 55 51.0001 48.2843 51.0001 40C51.0001 31.7157 44.2844 25 36.0001 25C27.7159 25 21.0001 31.7157 21.0001 40C21.0001 48.2843 27.7159 55 36.0001 55Z" fill="#C68BDF"/>
                </mask>
                <g mask="url(#mask1_31_93)">
                    <path d="M51.0002 25H21.0002V55H51.0002V25Z" fill="#1A181B"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M-74.8911 140.241L-71.1395 133.739C-67.5647 127.415 -60.2384 114.588 -44.6622 110.012C-28.9093 105.259 -5.08332 108.932 3.61799 97.481C12.3193 86.0297 5.89589 59.4538 17.3471 50.7525C28.7984 42.0512 58.301 51.0478 68.3773 40.9715C78.4536 30.8952 69.2802 1.5693 75.2316 -12.6319C81.1829 -26.833 102.259 -25.9095 118.012 -30.6627C133.588 -35.2391 143.664 -45.3153 148.614 -50.2651L153.74 -55.3916L178.49 -30.6421L173.363 -25.5156C168.414 -20.5658 158.337 -10.4896 148.261 -0.41328C138.008 9.8398 127.932 19.916 117.856 29.9923C107.779 40.0686 97.7032 50.1449 87.6272 60.2211C77.5507 70.2974 67.2976 80.5504 57.2213 90.627C47.1451 100.703 37.0688 110.779 26.9925 120.856C16.9163 130.932 6.83998 141.008 -3.41312 151.261C-13.4893 161.337 -23.5656 171.414 -28.5154 176.363L-33.6419 181.49L-74.8911 140.241Z" fill="#8C52FF"/>
                </g>
            </svg>
        </>
    )
}

// Discord logo where you can change the width and height
interface DiscordLogoProps {
    width?  : number;
    height? : number;
}

export const DiscordLogo: React.FC<DiscordLogoProps> = ({width, height}) => {
    width  = width  === undefined ? 16 : width;
    height = height === undefined ? 16 : height;
    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_31_104)">
                <path d="M14.0535 2.81854C13.0178 2.33396 11.9104 1.98178 10.7526 1.78125C10.6104 2.03832 10.4443 2.38409 10.3298 2.65915C9.099 2.47406 7.87956 2.47406 6.67144 2.65915C6.55693 2.38409 6.38704 2.03832 6.24357 1.78125C5.08454 1.98178 3.97584 2.33525 2.94013 2.8211C0.851095 5.97791 0.284793 9.0563 0.567944 12.091C1.9535 13.1257 3.29627 13.7542 4.61638 14.1655C4.94233 13.7169 5.23302 13.2401 5.48345 12.7375C5.0065 12.5563 4.54969 12.3326 4.11805 12.073C4.23256 11.9882 4.34457 11.8995 4.45279 11.8082C7.08546 13.0396 9.94593 13.0396 12.5472 11.8082C12.6566 11.8995 12.7686 11.9882 12.8819 12.073C12.449 12.3339 11.9909 12.5576 11.514 12.7388C11.7644 13.2401 12.0538 13.7182 12.381 14.1668C13.7024 13.7555 15.0464 13.127 16.432 12.091C16.7642 8.57301 15.8644 5.52289 14.0535 2.81854ZM5.84212 10.2247C5.05181 10.2247 4.4037 9.48688 4.4037 8.58843C4.4037 7.68998 5.03797 6.95091 5.84212 6.95091C6.64628 6.95091 7.29437 7.68868 7.28053 8.58843C7.28178 9.48688 6.64628 10.2247 5.84212 10.2247ZM11.1578 10.2247C10.3675 10.2247 9.71941 9.48688 9.71941 8.58843C9.71941 7.68998 10.3537 6.95091 11.1578 6.95091C11.962 6.95091 12.6101 7.68868 12.5962 8.58843C12.5962 9.48688 11.962 10.2247 11.1578 10.2247Z" fill="white"/>
            </g>
            <defs>
                <clipPath id="clip0_31_104">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)"/>
                </clipPath>
            </defs>
        </svg>
    )
}

// Text template
interface TextProps {
    children: ReactNode;
    size? : number | string;
    color?: string;
}

export const Text: React.FC<TextProps> = ({ children, size, color }) => {
    size  = size  === undefined ? 16 : size;
    color = color === undefined ? "#fff" : color;    
    return (
        <span style={{fontFamily: "Lato", color: color, fontSize: size}}>{children}</span>
    )
}

// Main template for all new routes
interface DefaultTemplateProps {
    children: ReactNode;
    classNames: string;
}

export const DefaultTemplate: React.FC<DefaultTemplateProps> = ({ children, classNames }) => {    
    return (
        <div className={`${styling.fill_height} ${classNames}`}>
            {children}
        </div>
    )
}

interface NavTemplateProps {
    children: ReactNode;
    classNames: string;
}

export const NavTemplate: React.FC<NavTemplateProps> = ({ children, classNames }) => {
    return (
        <div>
            
            {/* NavBar */}
            <div style={{height:80}} className={`${styling.flex_row} ${styling.justify_content_center} ${styling.align_items_center} ${styling.fill_width} ${styling.dark}`}>
                
                {/* Top Left Corner */}
                <div style={{width: 250, padding: "5px 67px 5px 67px"}} className={`${styling.flex_row} ${styling.justify_content_center} ${styling.align_items_center}`}>
                    
                </div>

                {/* Username Dropdown */}
                <div></div>
            </div>

            <div className={`${styling.fill_height} ${classNames}`}>
                {children}
            </div>
        </div>
    )
}