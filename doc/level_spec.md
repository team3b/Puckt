Level Specification
===================
## Level Object
Each level should be defined in a seperate file, stored in `/src/levels/{level number}.json`

	{
		"boundaries": Boundaries,
		"walls": [Wall, ...], // 0 or more walls present in this level
		"puck": Puck, // The initial puck position
        "stars": [Integer, …] // 0 or more
	}

`stars` is the minimum number of bounces required to get 1 star, 2 stars, ..., n stars. The length of the `stars` array is the number of stars available.

### Defaults

	{
		"boundaries": {
			"top": true,
			"left": true,
			"bottom": true,
			"right": true
		},
		"walls": [],
		"puck": { // This is due to change
			"x": 150,
			"y": 380,
			"radius": 15
		},
		"stars": []
	}

### To do:
* Define default values for `puck-start`.

## Wall Object
Defines a single wall in the game, which may or may not have a light up panel

	{
		"lightColours": HexColour,
		"coords": Position,
		"dimensions": Dimension,
		"rotation": Integer // Degrees
	}

### Defaults

	{
		"light-colours": #ff0000",
		"coords: undefined
		"dimensions": undefined,
		"rotation": 0
	}

Any undefined default values are required to be filled in, and will not render

## Puck Object

	{
		"x": Float,
		"y": Float,
		"radius": Float
	}

## Dimension Object

	{
		"w": Float,
		"h": Float
	}

## HexColour
A valid hex colour, like you would use in CSS. E.g. `#f5f5f5`