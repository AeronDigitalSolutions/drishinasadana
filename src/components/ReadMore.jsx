import React, { useState } from 'react';

const ReadMore = ({ text, limit = 150 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // If the text is shorter than the limit, just return the text
    if (text.length <= limit) {
        return <p>{text}</p>;
    }

    const displayText = isExpanded ? text : `${text.substring(0, limit)}...`;

    return (
        <div>
            <p>
                {displayText}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent)',
                        cursor: 'pointer',
                        padding: '0 4px',
                        fontWeight: '600',
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            </p>
        </div>
    );
};

export default ReadMore;
