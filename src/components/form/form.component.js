import React from 'react'
import { Container, Error, Base, Title, TextSmall, Text, Input, Submit, Link } from './form.styles'

const Form = ({ children, ...otherprops }) => {
    return (
        <Container {...otherprops}>
            {children}
        </Container>
    )
}

export default Form

Form.Error = ({ children, ...otherprops }) => {
    return (
        <Error {...otherprops}>
            {children}
        </Error>
    )

}

Form.Base = ({ children, ...otherprops }) => {
    return (
        <Base {...otherprops}>
            {children}
        </Base>

    )

}

Form.Title = ({ children, ...otherprops }) => {

    return (
        <Title {...otherprops}>
            {children}
        </Title>
    )

}

Form.Submit = ({ children, ...otherprops }) => {

    return (
        <Submit {...otherprops}>
            {children}
        </Submit>
    )

}

Form.Text = ({ children, ...otherprops }) => {

    return (
        <Text {...otherprops}>
            {children}
        </Text>
    )

}
Form.TextSmall = ({ children, ...otherprops }) => {

    return (
        <TextSmall {...otherprops}>
            {children}
        </TextSmall>
    )

}
Form.Link = ({ children, ...otherprops }) => {
    return (
        <Link {...otherprops}>
            {children}
        </Link>

    )
}

Form.Input = ({ children, ...otherprops }) => {
    return (
        <Input {...otherprops}>
            {children}
        </Input>
    )

}
