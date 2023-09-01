const React = require('react');

const Show = ({log}) => {
    return (
        <>
            <h1>{log.title}</h1>
            <h3>Repairs Needed: {log.shipIsBroken ? 'Yes' : "No"}</h3>
            <p>"{log.entry}" - <strong>Captain Fizzle</strong></p>
            <a href='/logs'>back to logs</a>
        </>
    )
}

module.exports = Show;