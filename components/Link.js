import React from 'react'
import stylesButton from './Button.module.css'
import stylesLink from './Link.module.css'

export function MultiLink() {
    return (
        <React.Fragment>
            <a href='#' className={stylesButton.error}>
                Link1
            </a>
            <a href='#' className={stylesLink.error}>
                Link2
            </a>
            <a href='#' className={stylesButton.error}>
                Link3
            </a>
        </React.Fragment>
    )
}