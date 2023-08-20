const _form = (desktop: number, phone: number, tablet?: number): number => {
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

export const text_normal: number = _form(16, 20, 18);