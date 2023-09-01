const React = require('react');

const Show = ({log}) => {
    return (
        <>
            <h1>{log.title}</h1>
            <h3>Ship's Status: {log.shipIsBroken ? 'Yes' : "No"}</h3>
            <p>"{log.entry}" - Captain Fizzle</p>
            <a href='/logs'>back to logs</a>
        </>
    )
}

module.exports = Show;