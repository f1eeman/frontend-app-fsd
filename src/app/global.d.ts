declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.scss'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg' {
  import type React from 'react'

  const SVG: React.FC<React.SVGProps<SVGSVGElement>>
  export default SVG
}
declare const __IS_DEV__: boolean
declare const __API__: string
declare const __PROJECT__: 'sb' | 'front' | 'jest'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
declare type AppRouteObject = import('react-router').RouteObject & {
  authOnly?: boolean
  children?: AppRouteObject[]
}
