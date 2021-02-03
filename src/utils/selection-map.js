import React from 'react'

export default function SelectionMap({ series, films }) {

    if (series === undefined || films === undefined)
        return;
    const Series = [
        {
            title: 'Documentaries',
            data: series.filter((item) => item.genre == 'documentaries')
        },
        {
            title: 'Comedies',
            data: series.filter((item) => item.genre == 'comedies')
        },
        {
            title: 'Children',
            data: series.filter((item) => item.genre == 'children')
        },
        {
            title: 'Crime',
            data: series.filter((item) => item.genre == 'crime')
        },
        {
            title: 'Feel Good',
            data: series.filter((item) => item.genre == 'feel-good')
        },
    ]
    const Films = [
        {
            title: 'Drama',
            data: films.filter((item) => item.genre == 'drama'),
        },
        {
            title: 'Thriller',
            data: films.filter((item) => item.genre == 'thriller'),
        },
        {
            title: 'Children',
            data: films.filter((item) => item.genre == 'children'),
        },
        {
            title: 'Crime',
            data: films.filter((item) => item.genre == 'crime'),
        },
        {
            title: 'Suspense',
            data: films.filter((item) => item.genre == 'suspense'),
        },
        {
            title: 'Romance',
            data: films.filter((item) => item.genre == 'romance'),
        },
    ]
    return { Series, Films }

};

