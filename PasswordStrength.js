( function ( w ) {
	w.PasswordStrength = function () {
		var p_worker = {
			checkMark: function ( msg, mark ) {
				let strength, status = true;
				switch ( mark ) {
					case 1: strength = '<b style="color:rgb(200, 200, 200)"> Password strength: Weak...</b>'; break;
					case 2: strength = '<b style="color:rgb(200, 200, 200)"> Password strength: Semi-weak...</b>'; break;
					case 3: strength = '<b style="color:green"> Password strength: Medium...</b>'; break;
					case 4: strength = '<b style="color:green"> Password strength: Strong...</b>'; break;
					default: status = false; break;
				}
				return { status: status/*[is valid or not]*/, cur_strength: strength/**[strength msg]*/, req_msg: msg/**[required msg]*/, mark: mark/**[strength mark]*/ };
			},
			setting: {
				n: { rgx: /[0-9]/, msg: '1 Numeric character' },
				c: { rgx: /[A-Z]/, msg: '1 Alphabet character' },
				s: { rgx: /[a-z]/, msg: '1 Small character' },
				sp: { rgx: /[@#$\.%^&+=]/, msg: '1 Special character' },
			}
		};
		return {
			check: function ( value ) {
				let msg = "", mark = 0, c = 0;
				for ( let i in p_worker.setting ) {
					if ( !p_worker.setting[i]['rgx'].test( value ) ) {
						if ( c === 3 ) {
							msg += '<d style="color:rgba(219, 177, 177, 0.96)">[*] ' + p_worker.setting[i]['msg'] + '</d>';
							c++; continue;
						}
						msg += '<d style="color:rgba(219, 177, 177, 0.96)">[*] ' + p_worker.setting[i]['msg'] + ',</d></br>';
						c++; continue;
					}
					if ( c === 3 ) {
						msg += '<img src="/image/accept.png" /> <d style="color:green">' + p_worker.setting[i]['msg'] + '</d>';
						mark++; c++; continue;
					}
					msg += '<img src="/image/accept.png" /> <d style="color:green">' + p_worker.setting[i]['msg'] + ',</d></br>';
					mark++; c++;
				}
				return p_worker.checkMark( msg, mark );
			}
		}
	}();
}( window ) );
