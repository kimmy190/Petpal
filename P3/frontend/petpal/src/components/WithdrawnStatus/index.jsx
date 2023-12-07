import React from 'react';
import { Badge } from 'flowbite-react';

const WithdrawnStatus = () => {
    return (
        <Badge color="failure" style={{ padding: '1em 5em' }}>
            Withdrawn
        </Badge>
    );
}

export default WithdrawnStatus;