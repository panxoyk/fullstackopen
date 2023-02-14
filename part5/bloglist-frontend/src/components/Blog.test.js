import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {

    const blog = {
        title: 'Nuevo Blog de prueba',
        author: 'Mark Chille',
        url: 'google.com',
        likes: 4,
        user: {
            username: 'undefined',
            name: 'Francisco'
        },
    }

    test('Blog muestra el titulo y autor del Blog', () => {
        const component = render(
            <Blog blog={blog} />
        )

        const div = component.container.querySelector('.blog')

        expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
        expect(div).not.toHaveTextContent('google.com')
        expect(div).not.toHaveTextContent('likes 4')
    })
})