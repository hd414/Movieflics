import React from 'react';
import { LockBody, ReleaseBody, Spinner, Picture } from './loading.styles';

const Loading = ({ src, ...otherprops }) => {
    return (
        <Spinner {...otherprops}>
            <LockBody />
            <Picture src={`/images/users/${src}.png`} />
        </Spinner>
    )
}

Loading.ReleaseBody = function LoadingReleaseBody() {
    return <ReleaseBody />;
};

export default Loading;
