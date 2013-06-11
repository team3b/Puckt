Level Specification
===================
## Level Object
Each level should be defined in a seperate file, stored in `/src/levels/{level number}.json`

	{
		"boundaries": [Bool, Bool, Bool, Bool], // top, right, bottom, left
		"walls": [Wall], // The walls present in this level
		"puck-start": { // The initial puck position
		    "x": Float,
		    "y": Float
        },
        "stars": [1, 2, 3] // minimum number of hops required to achieve 3 stars, 2 stars, 1 star
	}

### To do:
* Define default values for `puck-start`.

## Wall Object

	{
		"type": Integer, // [0 - 3]
		"x1": Float,
		"y1": Float,
		"x2": Float,
		"y2": Float,
		"colour": "#000000" // A valid HEX colour
	}

### To do:
* Define default value for `type` and `colour`.