// Helper functions.
import BackgroundImage, { IBackgroundImageProps, IFixedObject, IFluidObject } from 'gatsby-background-image'
import { getImage } from 'gatsby-plugin-image'
import React, { CSSProperties } from 'react'
import { FunctionComponent } from 'react'

const getBgImageType = (imageData) => (imageData.layout === 'fixed' ? 'fixed' : 'fluid')
const getAspectRatio = (imageData) => imageData.width / imageData.height
const getPlaceholder = (imageData) => {
  if (imageData.placeholder) {
    return imageData.placeholder.fallback.includes(`base64`)
      ? { base64: imageData.placeholder.fallback }
      : { tracedSVG: imageData.placeholder.fallback }
  }
  return {}
}

/**
 * Tries to Backport the new `gatsbyImageData` type to the classic `fluid` / `fixed` form.
 *
 * @param imageData   {object}    The image data to convert.
 * @returns {{}}
 */
export function convertToBgImage(imageData){
  if (imageData && imageData.layout) {
    const returnBgObject= {}
    const bgType = getBgImageType(imageData)
    const aspectRatio = getAspectRatio(imageData)
    const placeholder = getPlaceholder(imageData)
    // @ts-ignore
    returnBgObject[bgType] = {
      ...imageData.images.fallback,
      ...placeholder,
      aspectRatio,
    }
    return returnBgObject
  }
  return {}
}



/**
 * This is a temporary stopgap solution until `<BackgroundImage>` natively supports `gatsby-plugin-image`,
 * see [https://github.com/timhagn/gatsby-background-image/issues/141](https://github.com/timhagn/gatsby-background-image/issues/141).
 * @param {React.PropsWithChildren<IBgImageProps>} props
 * @return {JSX.Element}
 * @constructor
 */
export const BgImage = (props) => {
  const { fluid, children, ...args } = props
  if (fluid) {
    const image = getImage(fluid)
    const bgImage = image && convertToBgImage(image)
    return (
      <BackgroundImage {...bgImage} {...args}>
        {children}
      </BackgroundImage>
    )
  } else {
    return <div>{children}</div>
  }
}