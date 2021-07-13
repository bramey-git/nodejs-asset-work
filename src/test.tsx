import { Component, ReactNode } from 'react';

export class TestComponent extends Component {
    constructor(props: object) {
        super(props);
    }

    render(): ReactNode {
        return <h1>Hello, World!</h1>;
    }
}
