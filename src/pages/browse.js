import React from 'react'
import BrowseContainer from '../containers/Browse/browse.container';
import { UseContent } from '../hooks/use-content'
import selectionMap from '../utils/selection-map';

const Browse = () => {
    const { series } = UseContent('series');
    const { films } = UseContent('films');
    const slides = selectionMap({ series, films });

    return (
        <div>
            <BrowseContainer slides={slides} />
        </div>
    )
}

export default Browse
