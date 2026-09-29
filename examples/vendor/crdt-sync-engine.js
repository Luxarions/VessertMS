export const SyncStateIdle = 0;
export const SyncStatePending = 1;
export const SyncStateStreaming = 2;
export const SyncStateSynced = 3;
export const SyncStateConflict = 4;

/**
 * Last-Write-Wins Element-Set (LWW-Element-Set) CRDT synchronization engine.
 * Guarantees eventual consistency for offline edits, reactions, bookmarks, and thread votes.
 */
class CRDTSyncEngine {

	/**
	 * Creates a CRDT Sync Engine.
	 *
	 * @param {string} clientId - Unique client node identifier.
	 */
	constructor( clientId = `client-${Math.random().toString( 36 ).slice( 2, 8 )}` ) {

		this.clientId = clientId;
		this.state = SyncStateIdle;
		this.addSet = new Map(); // key -> { timestamp, value, clientId }
		this.removeSet = new Map(); // key -> { timestamp, clientId }
		this.listeners = new Set();

	}

	/**
	 * Adds or updates an element with monotonic millisecond timestamp.
	 *
	 * @param {string} id - Unique item identifier.
	 * @param {any} value - Item payload.
	 * @param {number} [timestamp=Date.now()] - Wall-clock timestamp.
	 */
	add( id, value, timestamp = Date.now() ) {

		const current = this.addSet.get( id );

		if ( ! current || timestamp > current.timestamp ) {

			this.addSet.set( id, { timestamp, value, clientId: this.clientId } );
			this._setState( SyncStatePending );
			this._notify();

		}

	}

	/**
	 * Removes an item (adds tombstone record).
	 *
	 * @param {string} id - Unique item identifier.
	 * @param {number} [timestamp=Date.now()] - Wall-clock timestamp.
	 */
	remove( id, timestamp = Date.now() ) {

		const current = this.removeSet.get( id );

		if ( ! current || timestamp > current.timestamp ) {

			this.removeSet.set( id, { timestamp, clientId: this.clientId } );
			this._setState( SyncStatePending );
			this._notify();

		}

	}

	/**
	 * Evaluates whether an element currently exists according to LWW semantics.
	 *
	 * @param {string} id - Element identifier.
	 * @return {boolean} True if active.
	 */
	has( id ) {

		const addRecord = this.addSet.get( id );
		if ( ! addRecord ) return false;

		const removeRecord = this.removeSet.get( id );
		if ( ! removeRecord ) return true;

		return addRecord.timestamp >= removeRecord.timestamp;

	}

	/**
	 * Returns array of active elements.
	 *
	 * @return {Array<any>} Active elements.
	 */
	values() {

		const result = [];

		for ( const [ id, record ] of this.addSet ) {

			if ( this.has( id ) ) {

				result.push( record.value );

			}

		}

		return result;

	}

	/**
	 * Merges a remote delta state into this local replica.
	 *
	 * @param {Object} remoteDelta - Remote delta containing addSet and removeSet entries.
	 * @return {boolean} Whether any state mutation occurred.
	 */
	merge( remoteDelta ) {

		this._setState( SyncStateStreaming );
		let mutated = false;

		if ( remoteDelta.addSet ) {

			for ( const [ id, record ] of Object.entries( remoteDelta.addSet ) ) {

				const local = this.addSet.get( id );

				if ( ! local || record.timestamp > local.timestamp ) {

					this.addSet.set( id, record );
					mutated = true;

				}

			}

		}

		if ( remoteDelta.removeSet ) {

			for ( const [ id, record ] of Object.entries( remoteDelta.removeSet ) ) {

				const local = this.removeSet.get( id );

				if ( ! local || record.timestamp > local.timestamp ) {

					this.removeSet.set( id, record );
					mutated = true;

				}

			}

		}

		this._setState( SyncStateSynced );

		if ( mutated ) {

			this._notify();

		}

		return mutated;

	}

	/**
	 * Subscribes to state mutations.
	 *
	 * @param {Function} listener - Callback function.
	 * @return {Function} Unsubscribe closure.
	 */
	subscribe( listener ) {

		this.listeners.add( listener );
		return () => this.listeners.delete( listener );

	}

	/**
	 * Updates internal synchronization state.
	 *
	 * @private
	 * @param {number} newState - State constant from SyncState.
	 */
	_setState( newState ) {

		this.state = newState;

	}

	/**
	 * Broadcasts change notification to subscribers.
	 *
	 * @private
	 */
	_notify() {

		for ( const listener of this.listeners ) {

			listener( this.values(), this.state );

		}

	}

}

export { CRDTSyncEngine };
