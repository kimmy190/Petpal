import React from 'react';
import { Badge } from 'flowbite-react';

const RejectedStatus = () => {
    return (
        <Badge color="failure" style={{ padding: '1em 5em' }}>Rejected</Badge>
    );
}

export default RejectedStatus;