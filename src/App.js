import React from 'react';

import List from '@/components/List';
import { openModal } from '@/components/Modal';

import logo from './logo.svg';
import './App.css';

function App() {
    const onClick = () => {
        openModal(
            <div style={{ padding: 20, background: '#fff' }}>我是弹层内容</div>,
        );
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <List />
                <button type="button" onClick={onClick}>
                    openModal
                </button>
            </header>
        </div>
    );
}

export default App;
