import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export function IsUserRedirect({ user, loggedInPath, children, ...otherprops }) {
    return (
        <Route {...otherprops}
            render={() => {
                if (!user.user)
                    return children
                else {
                    return (
                        <Redirect to={loggedInPath} />
                    )
                }
            }}
        />
    )
}


export function IsProtectedPage({ user, Path, children, ...otherprops }) {
    return (
        <Route {...otherprops}
            render={() => {
                if (user.user)
                    return children
                else {
                    return (
                        <Redirect to={Path} />
                    )
                }
            }}
        />
    )
}
