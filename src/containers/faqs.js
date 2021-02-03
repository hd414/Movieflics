import React from 'react';
import { Accordion } from '../components/accordion/accordion.component';
import FaqData from '../../src/fixtures/faq.json';
import OptForm from '../components/opt-form/optform.component';

const FaqsContainer = () => {
    return (
        <Accordion>
            <Accordion.Title>Frequently Asked Questions</Accordion.Title>
            <Accordion.Frame>
                {
                    FaqData.map(({ id, header, body }) => {
                        return (
                            <Accordion.Item key={id}>
                                <Accordion.Header>{header}</Accordion.Header>
                                <Accordion.Body>{body}</Accordion.Body>
                            </Accordion.Item>
                        )
                    })
                }
            </Accordion.Frame>

            <OptForm>
                <OptForm.Input placeholder="Email address" />
                <OptForm.Button>Try it now</OptForm.Button>
                <OptForm.Break />
                <OptForm.Text>Ready to watch? Enter your email to create or restart your membership.</OptForm.Text>
            </OptForm>
        </Accordion >
    )
}

export default FaqsContainer
