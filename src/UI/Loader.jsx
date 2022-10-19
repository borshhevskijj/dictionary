// import React from 'react'
import { CircularProgress } from "@mui/material"
import cl from "./Loader.module.css"

export const Loader = () => {
  return (
    <div className={cl.loaderContainer}>
      <CircularProgress className={cl.loader} />
    </div>
  )
}
