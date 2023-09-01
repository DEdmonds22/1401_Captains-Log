const React = require('react');

const New = () => {
    return (
        <>
            <h1>New Captain Log</h1>
            <form action='/logs' method='POST'>
                Title: <input type='text' name='title' />
                <br />
                Entry: <input type='textarea' name='entry' />
                <br />
                Is The Ship Broken? <input type='checkbox' name='shipIsBroken' />
                <br />
                <input type='submit' value="Enter Log" />
            </form>
        </>
    )
}

module.exports = New;