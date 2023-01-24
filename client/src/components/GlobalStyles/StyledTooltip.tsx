import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const StyledTooltip = styled(({ className, children, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }}><div>{children}</div></Tooltip>
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#fff',
        color: '#000',
        maxWidth: 420,
        fontSize: 16,
        padding: 20,
        border: '1px solid #d1d7dc',
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: '#fff',
        "&:before": {
            border: '1px solid #d1d7dc'
        },
    }
}));

export default StyledTooltip