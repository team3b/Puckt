Level Specification
===================
## Level Object
Each level should be defined in a seperate file, stored in `/src/levels/{level number}.json`

	{
		"boundaries": [Bool, Bool, Bool, Bool], // top, right, bottom, left. All default to true
		"walls": [Wall, ...], // 0 or more walls present in this level
		"puck-start": Position, // The initial puck position
        "stars": [Integer, …] // 0 or more
	}

`stars` is the minimum number of bounces required to get 1 star, 2 stars, ..., n stars. The length of the `stars` array is the number of stars available.

### Defaults

	{
		"boundaries": [true, true, true, true],
		"walls": [],
		"puck-start": { // This is due to change
			"x": 0,
			"y": 0
		},
		"stars": []
	}

### To do:
* Define default values for `puck-start`.

## Wall Object
Defines a single wall in the game, which may or may not have a light up panel

	{
		"light-colours": [HexColour | null, HexColour | null],
		"coords": Position,
		"dimensions": Dimension,
		"rotation": Integer
	}

Any of the following types are valid for `light-colours`: `[]`, `[HexColour]`, `[null, HexColour]`, `[HexColour, null]`, `[HexColour, HexColour]`, `[null, null]`

### Defaults

	{
		"light-colours": ["#ff0000", "#ff0000"],
		"coords: undefined
		"dimensions": undefined,
		"rotation": 0
	}

Any undefined default values are required to be filled in, and will not render

## Position

	{
		"x": Float,
		"y": Float
	}

## Dimension

	{
		"w": Float,
		"h": Float
	}

## HexColour
A valid hex colour, like you would use in CSS. E.g. `#f5f5f5`