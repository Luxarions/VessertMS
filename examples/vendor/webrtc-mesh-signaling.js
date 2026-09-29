/**
 * Realtime WebRTC Mesh & Selective Forwarding Unit (SFU) signaling broker.
 * Coordinates peer connection establishment, ICE candidates, and spatial audio topologies for live Spaces.
 */
class WebRTCMeshSignaling {

	/**
	 * Creates a signaling broker.
	 *
	 * @param {string} roomId - Audio space or live room identifier.
	 * @param {string} peerId - Local client peer identifier.
	 * @param {Object} [rtcConfig={}] - RTCConfiguration dictionary (ICE servers).
	 */
	constructor( roomId, peerId, rtcConfig = {} ) {

		this.roomId = roomId;
		this.peerId = peerId;
		this.rtcConfig = Object.assign( {
			iceServers: [
				{ urls: 'stun:stun.l.google.com:19302' },
				{ urls: 'stun:stun1.l.google.com:19302' }
			]
		}, rtcConfig );

		this.peers = new Map(); // peerId -> RTCPeerConnection
		this.channels = new Map(); // peerId -> RTCDataChannel
		this.audioStreams = new Map(); // peerId -> MediaStream
		this.handlers = new Map();

	}

	/**
	 * Registers event handler.
	 *
	 * @param {string} event - Event name (e.g. 'track', 'message', 'peer-left').
	 * @param {Function} handler - Callback function.
	 */
	on( event, handler ) {

		if ( ! this.handlers.has( event ) ) {

			this.handlers.set( event, new Set() );

		}

		this.handlers.get( event ).add( handler );

	}

	/**
	 * Initializes a connection to a remote peer.
	 *
	 * @param {string} remotePeerId - Destination peer identifier.
	 * @param {MediaStream} [localStream=null] - Local microphone audio stream.
	 * @return {RTCPeerConnection} Created peer connection.
	 */
	createPeerConnection( remotePeerId, localStream = null ) {

		if ( typeof RTCPeerConnection === 'undefined' ) {

			return null;

		}

		const pc = new RTCPeerConnection( this.rtcConfig );
		this.peers.set( remotePeerId, pc );

		if ( localStream ) {

			for ( const track of localStream.getTracks() ) {

				pc.addTrack( track, localStream );

			}

		}

		pc.ontrack = ( event ) => {

			this.audioStreams.set( remotePeerId, event.streams[ 0 ] );
			this._emit( 'track', { peerId: remotePeerId, stream: event.streams[ 0 ] } );

		};

		pc.oniceconnectionstatechange = () => {

			if ( pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'failed' ) {

				this.closePeer( remotePeerId );

			}

		};

		return pc;

	}

	/**
	 * Closes and removes a specific peer connection.
	 *
	 * @param {string} peerId - Target peer to disconnect.
	 */
	closePeer( peerId ) {

		const pc = this.peers.get( peerId );

		if ( pc ) {

			pc.close();
			this.peers.delete( peerId );
			this.audioStreams.delete( peerId );
			this.channels.delete( peerId );
			this._emit( 'peer-left', { peerId } );

		}

	}

	/**
	 * Disconnects from all peers and clears resources.
	 */
	destroy() {

		for ( const peerId of Array.from( this.peers.keys() ) ) {

			this.closePeer( peerId );

		}

		this.handlers.clear();

	}

	/**
	 * Emits internal event.
	 *
	 * @private
	 * @param {string} event - Event name.
	 * @param {Object} payload - Detail payload.
	 */
	_emit( event, payload ) {

		const cbs = this.handlers.get( event );

		if ( cbs ) {

			for ( const cb of cbs ) {

				cb( payload );

			}

		}

	}

}

export { WebRTCMeshSignaling };
