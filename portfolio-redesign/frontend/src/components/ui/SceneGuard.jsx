import { Component } from 'react';

// WebGL can be unavailable (old GPU, blocked, headless). Fail quietly and let the CSS fallback show.
export function hasWebGL() {
    try {
        const c = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
    } catch {
        return false;
    }
}

export default class SceneGuard extends Component {
    constructor(props) {
        super(props);
        this.state = { failed: false };
    }
    static getDerivedStateFromError() {
        return { failed: true };
    }
    componentDidCatch(error) {
        console.warn('3D scene disabled:', error?.message);
    }
    render() {
        return this.state.failed ? this.props.fallback ?? null : this.props.children;
    }
}
