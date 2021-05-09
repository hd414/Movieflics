import React from 'react'
import { Container, Inner, Pane, Image, Title, SubTitle, Item } from './jumbotron.styles'

const Jumbotron = ({ children, direction = "row", ...otherprops }) => {
    return (
        <div>
            <Item>
                <Inner direction={direction}>
                    {children}
                </Inner>

            </Item>

        </div>
    )
}

export default Jumbotron;

Jumbotron.Container = ({ children, ...otherprops }) => {
    return (
        <Container {...otherprops} >
            { children}
        </Container >
    )
}

Jumbotron.Pane = ({ children, ...otherprops }) => {
    return (
        <Pane {...otherprops} >
            { children}
        </Pane >
    )
}

Jumbotron.SubTitle = ({ children, ...otherprops }) => {
    return (
        <SubTitle {...otherprops} >
            { children}
        </SubTitle >
    )
}

Jumbotron.Title = ({ children, ...otherprops }) => {
    return (
        <Title {...otherprops} >
            { children}
        </Title >
    )
}

Jumbotron.Image = ({ ...otherprops }) => {
    return (
        <Image {...otherprops} />

    )
}
