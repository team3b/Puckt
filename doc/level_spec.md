Level Specification
===================
## Level Object
Each level should be defined in a seperate file, stored in `/src/levels/{level number}.json`

	{
		"boundaries": Boundaries,
		"walls": [Wall, ...], // 0 or more walls present in this level
		"puck": Puck, // The initial puck position
        "stars": [Integer, …], // 0 or more
        "last": Bool
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
		"lightOn": Boolean, // Whether the light is on initially
		"coords": Coords,
		"dimensions": Dimension,
		"rotation": Integer // Degrees
	}

If you want a wall that doesn't light up at all, set `lightColour: null`.

### Defaults

	{
		"lightColour": "#92D548",
		"lightOn": false,
		"coords: undefined,
		"dimensions": undefined,
		"rotation": 0
	}

**Note:** If the `lightColour` is `null`, it will not light up when hit. Also, if `lightColour` is `null`, `lightOn` will be ignored.

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

## Stars Array
This array uses the index as the number of stars, and stored in each position is the maximum number of collision allowed to achieve that star

**Notes** 
- The array index starts at `1`
- An empty array signals *no* stars can be achieved - that's just mean

### Example

	stars: [3, 2, 1]

This example outlines that 1 star is achieved if the user turns on all lights in 3 collisions,
2 stars in 2 collitions, and 3 stars (maximum) if they complete in 1 collision - *Hole in one*

## Last Boolean
This value should only be specified on one level, the last level. Simply set it as true to signal to the game that this will be the last level.