const React = require('react');

const Edit = ({log}) => {
    return (
        <>
            <form action={`/logs/${log._id}?_method=PUT`} method='POST' >
                <fieldset>
                    <legend>Edit Log</legend>
                    <label>Title: <input type='text' name='title' placeholder={log.title} value={log.title} /></label>
                    <br />
                    <label>Entry: <input type='text' name='entry' placeholder={log.entry} value={log.entry} /></label>
                    <br />
                    <label>Is the Ship Broken: <input type='checkbox' name='shipIsBroken' value={log.shipIsBroken} /></label>
                </fieldset>
                <input type='submit' value='Edit Log' />
            </form>
        </>
    )
};

module.exports = Edit;