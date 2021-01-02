import React from "react"

export interface FirstLogoProps {}

const FirstLogo: React.FC<FirstLogoProps> = () => {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15.5" cy="15.5" r="15.5" fill="#636380" fill-opacity="0.1" />
      <circle
        cx="15.5"
        cy="15.5"
        r="14.5"
        stroke="#F0F0FF"
        stroke-opacity="0.1"
        stroke-width="2"
      />
    </svg>
  )
}
export interface SecondLogoProps {}

const SecondLogo: React.FC<SecondLogoProps> = () => {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15.5" cy="15.5" r="15.5" fill="#636380" fill-opacity="0.1" />
      <circle
        cx="15.5"
        cy="15.5"
        r="14.5"
        stroke="#F0F0FF"
        stroke-opacity="0.1"
        stroke-width="2"
      />
      <circle cx="15.4999" cy="15.5" r="6.79825" fill="#E4DC00" />
    </svg>
  )
}

export { FirstLogo, SecondLogo }
