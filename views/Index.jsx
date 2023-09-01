const React = require('react');

const Index = ({logs}) => {
    return (
        <>
            <h1>The Captains Logs</h1>
            <ul>
                {logs.map((log, i) => {
                    return (
                        <li key={i}>
                            <a href={`/logs/${log._id}`}>{log.title}</a>
                        </li>
                    );
                })}
            </ul>
            <a href='/logs/new'>New Log Entry</a>
        </>
    );
};

module.exports = Index;