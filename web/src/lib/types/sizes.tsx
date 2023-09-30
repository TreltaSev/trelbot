
export type strnum = string | number | undefined;

/**
 * Set values for diffenet screen sizes, defaults are not set.
 * @param desktop
 * @param phone 
 * @param tablet 
 * @returns 
 */
export const form = (desktop: strnum, phone: strnum, tablet?: strnum): strnum => {
    const _phoneThreshold: number = 500;
    const _desktopThreshold: number = 1280;

    // Width within desktop threshold
    if (window.innerWidth >= _desktopThreshold) {
        return desktop;
    }

    // Width within phone threshold
    if (window.innerWidth <= _phoneThreshold) {
        return phone;
    }    
    
    if (tablet === undefined) {
        tablet = phone;
    }

    // Width between 500 and 1280 meaning tablet
    return tablet;
}

export const text_normal: strnum = form(16, 64);
