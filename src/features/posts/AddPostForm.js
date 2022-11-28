import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";
import React from "react";

const AddPostForm = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const users = useSelector(selectAllUsers)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onDateChanged = e => setDate(e.target.value)
    const onLocationChanged = e => setLocation(e.target.value)


    const canSave = [title, content, date, location].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, body: content, date, location })).unwrap()

                setTitle('')
                setContent('')
                setDate('')
                setLocation('')
                navigate('/')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }

    }

    // const usersOptions = users.map(user => (
    //     <option key={user.id} value={user.id}>
    //         {user.name}
    //     </option>
    // ))

    return (
        <section>
            <h2>Add a New Event</h2>
            <form>
                <label htmlFor="postTitle">Event Name:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Date:</label>
                <input
                    type="text"
                    id="postDate"
                    name="postDate"
                    value={date}
                    onChange={onDateChanged}
                />
                <label htmlFor="postAuthor">Location:</label>
                <input
                    type="text"
                    id="postLocation"
                    name="postLocation"
                    value={location}
                    onChange={onLocationChanged}
                />
                <label htmlFor="postContent">Description:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
    )
}
export default AddPostForm