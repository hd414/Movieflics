import React from 'react'
import { Container, Title, List, Item, Picture, Name } from './profiles.styles';

const Profiles = ({ children, ...otherprops }) => {
    return (
        <Container {...otherprops}>
            {children}
        </Container>
    )
}

export default Profiles;

Profiles.Title = ({ children, ...otherprops }) => {
    return (
        <Title {...otherprops}>
            {children}
        </Title>
    )
}
Profiles.List = ({ children, ...otherprops }) => {
    return (
        <List {...otherprops}>
            {children}
        </List>
    )
}
Profiles.User = ({ children, ...otherprops }) => {
    return (
        <Item {...otherprops}>
            {children}
        </Item>
    )
}
Profiles.Picture = ({ children, src, ...otherprops }) => {
    return (
        <Picture {...otherprops} src={src ? `/images/users/${src}.png` : '/images/misc/loading.gif'}>
            {children}
        </Picture>
    )
}
Profiles.Name = ({ children, ...otherprops }) => {
    return (
        <Name {...otherprops}>
            {children}
        </Name>
    )
}
