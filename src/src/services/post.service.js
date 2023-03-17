const PostService = {
    getAll: (setPost) => {
        return fetch(`${process.env.REACT_APP_API_URL}/posts`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.log(error))
    },
    getById: (id, setPost) => {
        return fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.log(error))
    },
    getByLocation: (lat, lng, setPost) => {
        return fetch(`${process.env.REACT_APP_API_URL}/posts?lat=${lat}&lng=${lng}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.log(error))
    },
    create: (post, setPost, handleNext, setError) => {
        return fetch(`${process.env.REACT_APP_API_URL}/posts`, {
            method: 'POST',
            body: post
        })
            .then(response => response.json())
            .then(data => {
                setPost((posts) => [...posts, data])
                handleNext()
            })
            .catch(error => {
                setError(error)
                console.log(error)
            })
    },
    update: (id, post, setPost, handleNext, setError) => {
        return fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
            method: 'PUT',
            body: post
        })
            .then(response => response.json())
            .then(data => {
                setPost((posts) => {
                    const index = posts.findIndex(post => post._id === id);
                    posts[index] = data;
                    return posts;
                })
                handleNext()
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })
    },
    delete: (id, setPost) => {
        return fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    setPost((posts) => posts.filter(post => post._id !== id))
                })
    }
}

export default PostService