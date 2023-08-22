import { LitElement, css, html, render } from 'lit';

import './assets.js';

class Main extends LitElement {
    static get properties() {
        return {}
    }

    constructor() {
        super();
    }

    static styles = css`

        .body {
            margin: 0;
        }

        .container {
            background-color: #1a2229;
            min-height: 100vh;
            height: 100%;
            width: 100%;
            display: table;
            margin: 0;
            clear: both;
        }

        .header {
            padding: 0;
            margin: 0;
            text-align: center;
            vertical-align: center;
            min-height: 14vh;
            max-height: 16vh;
            width: 100%;

        }

        h1 {
            margin: 0;
            padding-top: 5vh;
            color: #D0D4D0;
            text-shadow: 1px 1px 2px black, 0 0 5px #C3E3E3, 0 0 3px #598888;
            font-size: xxx-large;
        }

        @media screen and (max-width: 768px) {
            .h1 {
                padding-top: 2vh;
                font-size: x-large;
            }

            .header {
                min-height: 6vh;
            }
        }
    ` ;

    render() {
        return html`
            <div class='container'>
                <div class='header'><h1>My Assets</h1></div>
                <asset-list></asset-list>
            </div>
    `;
    }
}

customElements.define('my-app', Main);
