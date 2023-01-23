declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: true; // removes the `xs` breakpoint
        sm: true;
        md: true;
        lg: true;
        xl: true;
        mobile: true; // adds the `mobile` breakpoint
        tablet: true;
        laptop: true;
        desktop: true;
    }
}

export {}