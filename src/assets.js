import { LitElement, html, css, render} from 'lit';

export class Assets extends LitElement {
    static get properties() {
        return {
            bitcoin: {},
            monero: {},
            history: [],
            list: []
        }
    }

    constructor() {
        super()
        this.bitcoin = {}
        this.monero = {}
        this.history = []
        this.list = []
    }

    static styles = css`

        h3 {
            text-align: center;
        }
        ul {
            list-style: none;
            color: #D0D4D0;
            font-size: 1.5vw;
        }
        .bitcoin-stats ul{
            padding: 0;
            margin-bottom: 2px;
        }
        .column {
            float: left;
            width: 33%;
            min-height: 45vh;
            border-radius: 20px;
            //background-color: #22291A;
            margin: 2px;
        }
        .column:nth-child(2) {
            background-image: radial-gradient(ellipse, #598888, #22291A);
            padding-bottom: 25px;
            text-align: center;
        }
        @media screen and (max-width: 768px) {
            .column {
                width: 100%;
            }
        }
    `;

    weeklyAverage() {
        const totals = [(+this.bitcoin.priceUsd)]
        this.history.reverse().map((item) => {
            totals.push((+item.priceUsd))
        })
        return totals.reduce((a, b) => a + b) / totals.length
    }

    formatDate(date) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        };
        return new Date(date).toLocaleDateString('en-US', options)
    }

    lastWeek() {
        const now = new Date()
        const week = new Date (now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return week.getTime()
    }

    /* Retrieve Assets */
    async firstUpdated() {
        const now = Date.now()
        const start = this.lastWeek()
        const urls = {
            bitcoin: 'https://api.coincap.io/v2/assets/bitcoin',
            monero: 'https://api.coincap.io/v2/assets/monero',
            history: 'https://api.coincap.io/v2/assets/bitcoin/history' +
                '?interval=d1&start=' + start + '&end=' + now + '',
            list: 'https://api.coincap.io/v2/assets?limit=5'
        }

        //current today bitcoin stats
        let bitcoin = await fetch(urls.bitcoin)
        // display symbol and price
        let monero = await fetch(urls.monero)
        // get daily history and display weeks average of price data
        let history = await fetch(urls.history)
        // list top 5 by rank
        let list = await fetch(urls.list)
        bitcoin = await bitcoin.json()
        history = await history.json()
        monero = await monero.json()
        list = await list.json()
        this.bitcoin = bitcoin.data
        this.monero = monero.data
        this.monero.price = (+this.monero.priceUsd).toFixed(10)
        this.history = history.data
        this.list = list.data
        const average = this.weeklyAverage()
        console.log(average)
        this.history.weekly = average

    }

    render() {
        return html`
            <div class='column'>
                <div class='ranked'>
                    <ul>
                        <h3>Top 5 Ranked</h3>
                        ${this.list.map((item) => {
                            return html`
                        <li>
                            Rank #${item.rank} - ${item.name}
                        </li>
                    `;}
                        )}
                    </ul>
                </div>
            </div>

            <div class='column'>
                <div class='bitcoin-stats'>
                    <ul>
                        <h3>Bitcoin Weekly Average - <span>&#36;</span>${this.history.weekly}/USD</h3>
                        <li>
                            ${this.bitcoin.symbol} Price:
                            <span>&#36;</span>${this.bitcoin.priceUsd}/USD
                        </li>
                        <ul class='history'>
                            <h3>Seven (7) Day History</h3>
                            <li class='underline'>
                                Last 24 Hours -
                                <span>&#36;</span>${this.bitcoin.vwap24Hr}/USD
                            </li>
                            <li class='underline'>
                                ${this.formatDate(Date.now())} -
                                <span>&#36;</span>${this.bitcoin.priceUsd}/USD
                            </li>
                            ${this.history.reverse().map((item) => {
                                return html`
                                    <li class='underline'>
                                        ${this.formatDate(item.time)} -
                                        <span>&#36;</span>${item.priceUsd}/USD
                                    </li>
                                `;}
                            )}
                        </ul>
                    </ul>
                </div>
            </div>

            <div class='column'>
                <div class='monero-stats'>
                    <ul>
                        <h3>Monero</h3>
                        <li>
                            ${this.monero.symbol} - Price:
                            <span>&#36;</span>${(this.monero.price)} USD
                        </li>
                    </ul>
                </div>
            </div>
        `;
    }
}

customElements.define('asset-list', Assets);
