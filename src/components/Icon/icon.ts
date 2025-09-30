import type { IconProps } from 'webcoreui/astro'

export type CustomIconProps = {
    type: 'accessoires' | 'depannage' | 'devis' | 'truck' | 'whoweare' | 'velux'
    | IconProps['type']
} & Omit<IconProps, 'type'>
