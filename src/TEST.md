Canvas space flight
===================

HTML5/Canvas remake of win95 screensaver - flying through space - with some colors added. The luminescence of individual stars is changing throughout the animation. Parallax effect was added to give some extra depth to the demo. Other than that it's basically just rectangles :)

### Luminence
The luminance function is a little interesting. Basically this means that if you want to caculate the luminence (lightness) of objects not all colors are equally important since the human eye interprets colors differently. Blue colors are for example percieved as darker to us and green and yellow colors as lighter. 

![revolunet logo](http://www.revolunet.com/static/parisjs8/img/logo-revolunet-carre.jpg "revolunet logo")

This is somewhat of a bad practice to do with javascript instead of using the CSS3 HSLA that already have Lightness defined and are included in the browser. This function is not platform independent since it only works well for ITU-R BT.709 and screens that use the sRGB color space.

From wiki: 
>Y = 0.2126 R + 0.7152 G + 0.0722 B - The formula reflects the luminosity function: green light contributes the most to the intensity perceived by humans, and blue light the least. 

```javascript
function luminance(hex, lum) {
	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}	
```


