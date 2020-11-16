import React from 'react';
import Profile from './Profile'

export default ({ match: { params: { id } } }) => (
    <div>
        <Profile id={id}/>
    </div>
)