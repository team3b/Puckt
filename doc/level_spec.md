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

## Boundaries
Defines which boundary walls are present, allows the puck to glide off the canvas

	{
		"top": Bool,
		"right": Bool,
		"bottom": Bool,
		"left": Bool
	}

### Defaults
All boundaries are defaulted to present
	
	{
		"top": true,
		"right": true,
		"bottom": true,
		"left": true
	}


## Wall Object
Defines a single wall in the game, which may or may not have a light up panel

	{
		"lightColour": HexColour,
		"coords": Coords,
		"dimensions": Dimension,
		"rotation": Integer // Degrees
	}

### Defaults

	{
		"lightColour": null,
		"coords: undefined,
		"dimensions": undefined,
		"rotation": 0
	}

#### Note: If the `lightColour` is `null`, it will not light up when hit

Any undefined default values are required to be filled in, and will not render

## Puck Object

	{
		coords: Coords,
		"radius": Float
	}

## Coords Object

	{
		"x": Float,
		"y": Float,
	}

## Dimension Object

	{
		"w": Float,
		"h": Float
	}

## HexColour
A valid hex colour, like you would use in CSS. E.g. `#f5f5f5`