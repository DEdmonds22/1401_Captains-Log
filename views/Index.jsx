const React = require('react');

const Index = ({logs}) => {
    return (
        <>
            <h1>The Captains Logs</h1>
            <a href='/logs/new'>New Log Entry</a>
            <ul>
                {logs.map((log, i) => {
                    return (
                        <li key={i}>
                            <a href={`/logs/${log._id}`}>{log.title}</a>
                            <br />
                            <a href={`/logs/${log._id}/edit`}>Edit Log</a>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

module.exports = Index;