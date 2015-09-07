Canvas hyperspace flight
========================

HTML5/Canvas remake of win95 screensaver - flying through space - with some colors added. Luminescence effect of stars have been added to the animation. Other than that it's basically just floating rectangles and a black background :)

### Luminence
The luminance function is a little interesting. Basically this means that if you want to caculate the luminence (lightness) of objects not all colors are equally important since the human eye interprets colors differently. This all brings back some memories from when I was trying to make pixel art for a game awhile ago.

![lightstudy](/img/lightstudyforbeginners.png)

As can be seen from this very scientific diagram above; blue colors are percieved as darker to the human eye and green and yellow colors as lighter. This is due to various causes and help our brains create the foundation for our perception of time (so you know when it's morning and when it's evening). If we would delve further into this topic it would quickly go into neuroscience and spectral sensitivity, so I won't write more about it. Let's just conclude that human brains interpret lightness/luminosity with a bias towards certain colors. I assume that this way of functioning is similar for color-blind people.

This is somewhat of a bad practice to do with javascript instead of using CSS3 HSLA which already have Lightness defined and is included in your browser. But we will do it here anyway for learning and fun even if the code will not be "truly" platform independent. It will only work well for ITU-R BT.709 and screens that use the sRGB color space. Our code uses CIE luminance for calculating relative luminance.

>L = 0.2126 R + 0.7152 G + 0.0722 B - The formula reflects the luminosity function: green light contributes the most to the intensity perceived by humans, and blue light the least.

```javascript
function luminance(object, lum) {
	object = object || { color:'#000' };
	lum = lum || 1;
	var hex = object.color;
	
	hex = String(hex).replace(/[^0-9a-f]/gi, '')
	if (hex.length < 6)
		hex = [ [hex[0],hex[0]].join(''), [hex[1],hex[1]].join(''), [hex[2],hex[2]].join('') ]
	else 
		hex = [hex.slice(0,2), hex.slice(2,4), hex.slice(4,6)]

	// using relative luminance
	// L = 0.2126 R + 0.7152 G + 0.0722 B
	var add = 2.94459*lum + 9.90581*lum + lum;
	
	hex = hex.map(function(val, idx){
		var final = Math.min(Math.max(Math.round((parseInt(val, 16)+add)), 0), 255).toString(16);
		return final.length<2 ? '0'+final : final;
	})
		
	hex.splice(0, 0, '#')

	object.color = hex.join('');
}
```
### Result

Luminosity is primarily used when dealing with things that are visible on our planet. Stars are obviously not the best subject for showcasing this algorithm. Anyway here is the final result that has blue stars who are increasing their luminance as they're approaching.