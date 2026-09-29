import { SymbologyEAN13, SymbologyUPCA, SymbologyQRCode } from '../../src/Constants.js';

/**
 * Barcode and QR Code symbology validator for social commerce product showcases.
 * Computes modulo check-digits for EAN-13, UPC-A, and validates scanning payload formats.
 */
class BarcodeSymbologyDecoder {

	/**
	 * Computes modulo-10 check digit for EAN-13 payload.
	 *
	 * @param {string} digits12 - First 12 digits of an EAN-13 barcode.
	 * @return {number} Check digit (0-9).
	 */
	static computeEAN13CheckDigit( digits12 ) {

		if ( ! /^\d{12}$/.test( digits12 ) ) return - 1;

		let sum = 0;

		for ( let i = 0; i < 12; i ++ ) {

			const n = parseInt( digits12[ i ], 10 );
			sum += ( i % 2 === 0 ) ? n : n * 3;

		}

		return ( 10 - ( sum % 10 ) ) % 10;

	}

	/**
	 * Validates a full 13-digit EAN code.
	 *
	 * @param {string} ean - 13-digit string.
	 * @return {boolean} True if checksum is valid.
	 */
	static isValidEAN13( ean ) {

		if ( ! /^\d{13}$/.test( ean ) ) return false;

		const expected = this.computeEAN13CheckDigit( ean.slice( 0, 12 ) );
		return parseInt( ean[ 12 ], 10 ) === expected;

	}

	/**
	 * Validates a full 12-digit UPC-A code.
	 *
	 * @param {string} upc - 12-digit string.
	 * @return {boolean} True if checksum is valid.
	 */
	static isValidUPCA( upc ) {

		if ( ! /^\d{12}$/.test( upc ) ) return false;

		let sum = 0;

		for ( let i = 0; i < 11; i ++ ) {

			const n = parseInt( upc[ i ], 10 );
			sum += ( i % 2 === 0 ) ? n * 3 : n;

		}

		const check = ( 10 - ( sum % 10 ) ) % 10;
		return parseInt( upc[ 11 ], 10 ) === check;

	}

	/**
	 * Identifies symbology type from code string.
	 *
	 * @param {string} code - Scanned barcode or matrix string.
	 * @return {number|null} Symbology constant or null if unrecognized.
	 */
	static detectSymbology( code ) {

		if ( this.isValidEAN13( code ) ) return SymbologyEAN13;
		if ( this.isValidUPCA( code ) ) return SymbologyUPCA;
		if ( code.startsWith( 'http://' ) || code.startsWith( 'https://' ) || code.startsWith( 'vessert://' ) ) return SymbologyQRCode;

		return null;

	}

}

export { BarcodeSymbologyDecoder };
