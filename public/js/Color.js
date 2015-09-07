var Color = {
	_rgb:[0,0,0],
	_alpha:1,
	set alpha (nwAlp){
		if (nwAlp <= 1 && nwAlp >= 0)
			this._alpha = nwAlp;
	},
	set color (color) {
		var type = color.match(/\#|rgba|rgb|hsla|hsl/i);
		if (type[0] == '#') {
			if (type.input.length-1 < 6) {
				return 'error' // fix less than 6 ..
			}
			this._alpha = 1;
			var r = parseInt(type.input.substring(1,3), 16),
				g = parseInt(type.input.substring(3,5), 16), 
				b = parseInt(type.input.substring(5,7), 16);
			this._rgb = [r,g,b];
		}
		if (type[0] == 'rgb') {
			var values = type.input.match(/\((.+)\)/)[1].split(',');
			if (values.length == 3) {
				this._alpha = 1;
				this._rgb = values.map(function(value) {
					return +value;
				});
			}
		}
		else if (type[0] == 'rgba') {
			var values = type.input.match(/\((.+)\)/)[1].split(',');
			if (values.length == 4) {
				this._alpha = +values.pop();
				this._rgb = values.map(function(value) {
					return +value;
				});
			}
		}
		else if (type[0] == 'hsl') {
			var values = type.input.match(/\((.+)\)/)[1].split(',');
			if (values.length == 3) {
				this._alpha = 1;
				values = values.map(function(value) {
					return parseFloat(value);
				});
				this._rgb = this._hsl_to_rgb.apply(null, values);
			}
		}
		else if (type[0] == 'hsla') {
			var values = type.input.match(/\((.+)\)/)[1].split(',');
			if (values.length == 4) {
				this._alpha = +values.pop();
				values = values.map(function(value) {
					return parseFloat(value);
				});
				this._rgb = this._hsl_to_rgb.apply(null, values);
			}
		}
	},
	get color (){
		return ['rgba(', this._rgb.join(','), ',', this._alpha, ')'].join('');
	},
	get color16 (){
		return ['#', this._rgb.map(function(value) {
			var val = value.toString(16);
			return val.length==1?['0',val].join(''):val;
		}).join('')].join('');
	},
	luma : function (lum){
	    lum = lum || 1;
	    var rgb = [2.94459*lum, 9.90581*lum, lum];
		this._rgb = this._rgb.map(function(val, idx){
	        return Math.min(Math.max(Math.round(val+rgb[idx]), 0), 255);
	    })	  
	},
	greyscale : function (){
		var lum = [0.2126, 0.7152, 0.0722];
		this._rgb = this._rgb.map(function(val, idx) {
			return Math.round(val*lum[idx]);
		});
	},
	_hsl_to_rgb : function (h, s, l){

		if (h > 1)
			h = h/360;
		if (s > 1)
			s = s/100;
		if (l > 1)
			l = l/100;

		var m2 = l<0.5 ? l*(1 + s) : l+s-l*s, 
			m1 = l*2-m2;
		
		var r = hue_to_rgb(m2, m1, h + 1/3),
			g = hue_to_rgb(m2, m1, h),
			b = hue_to_rgb(m2, m1, h - 1/3);
		
		return [r * 255, g * 255, b * 255];

		function hue_to_rgb (m1, m2, h){
			if(h < 0) 
				h++
			if(h > 1) 
				h--
			if(h < 1/6) 
				return m1 + (m2 - m1) * 6 * h
			if(h < 1/2)
				return m2
			if(h < 2/3) 
				return m1 + (m2 - m1) * (2/3 - h) * 6
			return m1
		}
	}
}

var o = {
	shape:'',
	size:'',
	pos:'',
	color:Object.create(Color)
};
o.color.color = 'hsla(170, 0.5, 0.5, 1)';
console.log(o);