import { SvgIcon, type SvgIconProps } from '@mui/material';

export function LogoutIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M10 17v-2h4v-2h-4V11l-4 3 4 3Zm9-12h-8a2 2 0 0 0-2 2v2h2V7h8v10h-8v-2H9v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"
      />
    </SvgIcon>
  );
}

