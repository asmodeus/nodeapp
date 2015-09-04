Canvas space flight
===================

HTML5/Canvas remake of win95 screensaver - flying through space - with some colors added. Luminescence effect of stars have been added to the animation. Other than that it's basically just floating rectangles :)

### Luminence
The luminance function is a little interesting. Basically this means that if you want to caculate the luminence (lightness) of objects not all colors are equally important since the human eye interprets colors differently. This all brings back some memories from when I was trying to make pixel art for a game awhile ago.

![lightstudy](/pics/lightstudyforbeginners.png)

As can be seen from this very scientific diagram above; blue colors are percieved as darker to the human eye and green and yellow colors as lighter. This is due to various causes and help our brains create the foundation for our perception of time (so you know when to go up, and when to go to bed). If we would dig further into this topic it would pretty quickly go into neuroscience and spectral sensitivity, so we shall speak no more of it, but lets just conclude with the fact that humans have a unique visual interpretation of lightness/luminosity. This way of functioning is generally followed by all people (probably even the color blind or other induced differences).

This is somewhat of a bad practice to do with javascript instead of using the CSS3 HSLA that already have Lightness defined and is included with the browser. But we will do it here anyway for learning and fun even if the code will not be platform independent. It will only work well for ITU-R BT.709 and screens that use the sRGB color space.

From wiki:
>Y = 0.2126 R + 0.7152 G + 0.0722 B - The formula reflects the luminosity function: green light contributes the most to the intensity perceived by humans, and blue light the least.

```javascript
function luminance(object, lum) {
	var hex = object.color;
	lum = lum || 1;
	
	hex = String(hex).replace(/[^0-9a-f]/gi, '')
	if (hex.length < 6)
		hex = [ [hex[0],hex[0]].join(''), [hex[1],hex[1]].join(''), [hex[2],hex[2]].join('') ]
	else 
		hex = [hex.slice(0,2), hex.slice(2,4), hex.slice(4,6)]
	  
	// using relative luminance
	// Y = 0.2126 R + 0.7152 G + 0.0722 B
	var rgb = [2.94459*lum, 9.90581*lum, 1*lum];
	
	hex = hex.map(function(val, idx){
		var final = Math.min(Math.max(Math.round((parseInt(val, 16)+rgb[idx])), 0), 255).toString(16);
		return final.length<2 ? '0'+final : final;
	})

	hex.splice(0, 0, '#')

	object.color = hex.join('');
}
```
### Result

Luminosity is primarily used when dealing with things that are visible on our planet. So stars are not the best subject for showcasing this, anyway here is the final result with green/blue stars.