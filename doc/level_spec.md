Level Specification
===================
## Level Object
Each level should be defined in a seperate file, stored in `/src/levels/{level number}.json`

	{
		"boundaries": [Bool, Bool, Bool, Bool], // top, right, bottom, left
		"walls": [Wall, ...], // 0 or more walls present in this level
		"puck-start": Position, // The initial puck position
        "stars": [1, 2, 3] // minimum number of hops required to achieve 3 stars, 2 stars, 1 star
	}

### To do:
* Define default values for `puck-start`.

## Wall Object

	{
		"type": Integer, // [0 - 3]
		"colour": "#000000", // A valid HEX colour
		"coords": [Position, Position]
	}

### To do:
* Define default value for `type` and `colour`.

## Position

	{
		"x": Float,
		"y": Float
	}