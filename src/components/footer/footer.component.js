import React from 'react';
import { Container, Row, Column, Title, Text, Break, Link } from './footer.styles';

export const Footer = ({ children, ...otherprops }) => {
    return (
        <Container {...otherprops}>
            {children}
        </Container>
    )
}

Footer.Row = ({ children, ...otherprops }) => {
    return (
        <Row {...otherprops}>
            {children}
        </Row>
    )
}

Footer.Column = ({ children, ...otherprops }) => {
    return (
        <Column {...otherprops}>
            {children}
        </Column>
    )
}

Footer.Link = ({ children, ...otherprops }) => {
    return (
        <Link {...otherprops}>
            {children}
        </Link>
    )
}

Footer.Title = ({ children, ...otherprops }) => {
    return (
        <Title {...otherprops}>
            {children}
        </Title>
    )
}

Footer.Text = ({ children, ...otherprops }) => {
    return (
        <Text {...otherprops}>
            {children}
        </Text>
    )
}

Footer.Break = ({ children, ...otherprops }) => {
    return (
        <Break {...otherprops}>
            {children}
        </Break>
    )
}

