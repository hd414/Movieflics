import React, { createContext, useContext, useState } from 'react';
import { Container, Title, Frame, Item, Header, Body, Inner } from './accordion.styles';

const ToggleContext = createContext();

export const Accordion = ({ children, ...otherprops }) => {
    return (
        <Container {...otherprops}>
            <Inner>
                {children}
            </Inner>
        </Container>
    )
}




Accordion.Title = ({ children, ...otherprops }) => {

    return (

        <Title {...otherprops}>
            {children}
        </Title>
    )

}
Accordion.Frame = ({ children, ...otherprops }) => {


    return (

        <Frame {...otherprops}>
            {children}
        </Frame>
    )

}
Accordion.Item = function AccordionItem({ children, ...otherprops }) {
    const [toggleShow, setToggleshow] = useState(false);
    return (

        <ToggleContext.Provider value={{ toggleShow, setToggleshow }}>
            < Item {...otherprops}>
                {children}
            </Item >
        </ToggleContext.Provider>


    )


}

Accordion.Header = function AccordionHeader({ children, ...otherprops }) {
    const { toggleShow, setToggleshow } = useContext(ToggleContext);
    return (
        < Header onClick={() => setToggleshow(!toggleShow)
        } {...otherprops}>
            {children}
            {toggleShow ? (
                <img src="/images/icons/close-slim.png" alt="Close" />
            ) : (
                    <img src="/images/icons/add.png" alt="Open" />
                )}
        </Header >

    )

}

Accordion.Body = function AccordionBody({ children, ...otherprops }) {
    const { toggleShow } = useContext(ToggleContext);

    return (
        <Body className={toggleShow ? 'open' : 'closed'} {...otherprops}>
            <span>{children}</span>
        </Body>
    )
}