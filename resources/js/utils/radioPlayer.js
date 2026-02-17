let player = null;

function createPlayer() {
    const listeners = new Set();

    const state = {
        isPlaying: false,
        isBuffering: false,
        url: null,
        title: "Sheddy's New Look Radio",
        subtitle: 'Live Stream',
        error: null,
    };

    const notify = () => {
        listeners.forEach((fn) => {
            try {
                fn({ ...state });
            } catch (e) {
                // ignore subscriber errors
            }
        });
    };

    const ensureAudio = () => {
        if (!player.audio) {
            player.audio = new Audio();
            player.audio.preload = 'none';

            player.audio.addEventListener('play', () => {
                state.isPlaying = true;
                state.isBuffering = false;
                state.error = null;
                notify();
            });
            player.audio.addEventListener('pause', () => {
                state.isPlaying = false;
                state.isBuffering = false;
                notify();
            });
            player.audio.addEventListener('waiting', () => {
                if (state.isPlaying) {
                    state.isBuffering = true;
                    notify();
                }
            });
            player.audio.addEventListener('playing', () => {
                state.isBuffering = false;
                notify();
            });
            player.audio.addEventListener('ended', () => {
                state.isPlaying = false;
                state.isBuffering = false;
                notify();
            });
            player.audio.addEventListener('error', () => {
                state.isPlaying = false;
                state.isBuffering = false;
                state.error = 'Imeshindikana ku-play stream. Hakikisha link ni sahihi.';
                notify();
            });
        }

        return player.audio;
    };

    player = {
        audio: null,
        getState() {
            return { ...state };
        },
        subscribe(fn) {
            listeners.add(fn);
            fn({ ...state });
            return () => listeners.delete(fn);
        },
        async play(url, meta = {}) {
            if (!url) {
                state.error = 'Stream URL haijawekwa bado.';
                notify();
                return;
            }

            const audio = ensureAudio();

            state.url = url;
            state.title = meta.title ?? state.title;
            state.subtitle = meta.subtitle ?? state.subtitle;
            state.error = null;

            if (audio.src !== url) {
                audio.pause();
                audio.src = url;
            }

            state.isBuffering = true;
            notify();

            try {
                await audio.play();
            } catch (e) {
                state.isPlaying = false;
                state.isBuffering = false;
                state.error = 'Imeshindikana ku-play stream. Hakikisha link ni sahihi.';
                notify();
            }
        },
        pause() {
            const audio = ensureAudio();
            audio.pause();
        },
        async toggle(url, meta = {}) {
            const current = { ...state };
            if (current.isPlaying) {
                this.pause();
                return;
            }
            await this.play(url ?? current.url, meta);
        },
    };

    return player;
}

export function getRadioPlayer() {
    if (typeof window === 'undefined') {
        return createPlayer();
    }

    if (!window.__sr_radio_player) {
        window.__sr_radio_player = createPlayer();
    }

    return window.__sr_radio_player;
}
