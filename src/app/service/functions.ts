import { Injectable } from '@angular/core';
import { HttpHeaders  } from '@angular/common/http';
import * as crypto from 'crypto';


@Injectable()
export class Functions {
  httpOptions: any;
	constructor() {

	}

  createHeader(isAuthMash,secret_key) {
    if(!!isAuthMash){
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'AuthMash': this.AuthMash(secret_key)
        })
      };
    }
  }

  makeUrl(url,api_key,params?: Array<{key: string,value:string}>) {
	let _p : string = '';
	if(!!params) _p = (params.map( a => `&${a.key}=${a.value}`)).join("");
    return `${url}?api_key=${api_key}${_p}`;
  }
	

	AuthMash(secret_key) {
		const seed = new Date().toISOString();
		const nonce = this.bin2hex(window.crypto.getRandomValues(new Uint32Array(1))[0]);
		const nonceBase64 = btoa(nonce);
		const nonceKey = btoa(this.sha1(nonce+seed+secret_key));

		const AuthMash = `{"seed": "${seed}","noncekey":"${nonceKey}","nonce": "${nonceBase64}"}`;

		return AuthMash;
	}

	bin2hex(s){ 
		var v,i, f = 0, a = [];  
		s += '';  
		f = s.length;  
			
		for (i = 0; i<f; i++) {  
			a[i] = s.charCodeAt(i).toString(16).replace(/^([\da-f])$/,"0$1");  
		}  
			
		return a.join('');  
	}

	sha1 (str) {
		let hash
		try {
			const sha1sum = crypto.createHash('sha1')
			sha1sum.update(str)
			hash = sha1sum.digest('hex')
		} catch (e) {
			hash = undefined
		}
		if (hash !== undefined) {
			return hash
		}
		const _rotLeft = function (n, s) {
			const t4 = (n << s) | (n >>> (32 - s))
			return t4
		}
		const _cvtHex = function (val) {
			let str = ''
			let i
			let v
			for (i = 7; i >= 0; i--) {
				v = (val >>> (i * 4)) & 0x0f
				str += v.toString(16)
			}
			return str
		}
		let blockstart
		let i, j
		const W = new Array(80)
		let H0 = 0x67452301
		let H1 = 0xEFCDAB89
		let H2 = 0x98BADCFE
		let H3 = 0x10325476
		let H4 = 0xC3D2E1F0
		let A, B, C, D, E
		let temp
		// utf8_encode
		str = unescape(encodeURIComponent(str))
		const strLen = str.length
		const wordArray = []
		for (i = 0; i < strLen - 3; i += 4) {
			j = str.charCodeAt(i) << 24 |
				str.charCodeAt(i + 1) << 16 |
				str.charCodeAt(i + 2) << 8 |
				str.charCodeAt(i + 3)
			wordArray.push(j)
		}
		switch (strLen % 4) {
			case 0:
				i = 0x080000000
				break
			case 1:
				i = str.charCodeAt(strLen - 1) << 24 | 0x0800000
				break
			case 2:
				i = str.charCodeAt(strLen - 2) << 24 | str.charCodeAt(strLen - 1) << 16 | 0x08000
				break
			case 3:
				i = str.charCodeAt(strLen - 3) << 24 |
					str.charCodeAt(strLen - 2) << 16 |
					str.charCodeAt(strLen - 1) <<
				8 | 0x80
				break
		}
		wordArray.push(i)
		while ((wordArray.length % 16) !== 14) {
			wordArray.push(0)
		}
		wordArray.push(strLen >>> 29)
		wordArray.push((strLen << 3) & 0x0ffffffff)
		for (blockstart = 0; blockstart < wordArray.length; blockstart += 16) {
			for (i = 0; i < 16; i++) {
				W[i] = wordArray[blockstart + i]
			}
			for (i = 16; i <= 79; i++) {
				W[i] = _rotLeft(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1)
			}
			A = H0
			B = H1
			C = H2
			D = H3
			E = H4
			for (i = 0; i <= 19; i++) {
				temp = (_rotLeft(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff
				E = D
				D = C
				C = _rotLeft(B, 30)
				B = A
				A = temp
			}
			for (i = 20; i <= 39; i++) {
				temp = (_rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff
				E = D
				D = C
				C = _rotLeft(B, 30)
				B = A
				A = temp
			}
			for (i = 40; i <= 59; i++) {
				temp = (_rotLeft(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff
				E = D
				D = C
				C = _rotLeft(B, 30)
				B = A
				A = temp
			}
			for (i = 60; i <= 79; i++) {
				temp = (_rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff
				E = D
				D = C
				C = _rotLeft(B, 30)
				B = A
				A = temp
			}
			H0 = (H0 + A) & 0x0ffffffff
			H1 = (H1 + B) & 0x0ffffffff
			H2 = (H2 + C) & 0x0ffffffff
			H3 = (H3 + D) & 0x0ffffffff
			H4 = (H4 + E) & 0x0ffffffff
		}
		temp = _cvtHex(H0) + _cvtHex(H1) + _cvtHex(H2) + _cvtHex(H3) + _cvtHex(H4)
		return temp.toLowerCase()
	}
}