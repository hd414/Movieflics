import React from 'react';
import { Container, Title, SubTitle } from './feature.styles';

const Feature = ({ children, ...otherprops }) => {
    return (
        <Container {...otherprops}>
            {children}
        </Container>
    )
}

export default Feature


Feature.Title = ({ children, ...otherprops }) => {
    return (
        <Title {...otherprops}>
            {children}
        </Title>
    )
}

Feature.SubTitle = ({ children, ...otherprops }) => {
    return (
        <SubTitle {...otherprops}>
            {children}
        </SubTitle>
    )
}