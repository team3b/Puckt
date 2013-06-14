#!/bin/bash

JS_SRC_DIR="../src/js"
JS_VENDOR_DIR="../src/vendor/js"
JS_BUILD_DIR="../publish/js/game.js"
CLOSURE_COMPILER="../tools/compiler-latest/compiler.jar"

java -jar "$CLOSURE_COMPILER" --compilation_level ADVANCED_OPTIMIZATIONS \
	--externs "$JS_VENDOR_DIR/Box2dWeb-2.1.a.3.js" \
	--externs "$JS_VENDOR_DIR/canvg.js" \
	--externs "$JS_VENDOR_DIR/Class.js" \
	--externs "$JS_VENDOR_DIR/rgbcolor.js" \
	# --js "$JS_VENDOR_DIR/Box2dWeb-2.1.a.3.js" \
	# --js "$JS_VENDOR_DIR/canvg.js" \
	# --js "$JS_VENDOR_DIR/Class.js" \
	# --js "$JS_VENDOR_DIR/rgbcolor.js" \
	--js "$JS_SRC_DIR/obj/Obj.js" \
	--js "$JS_SRC_DIR/obj/Puck.js" \
	--js "$JS_SRC_DIR/obj/Wall.js" \
	--js "$JS_SRC_DIR/debug.js" \
	--js "$JS_SRC_DIR/flick.js" \
	--js "$JS_SRC_DIR/Game.js" \
	--js "$JS_SRC_DIR/Level.js" \
	--js "$JS_SRC_DIR/main.js" \
	--js "$JS_SRC_DIR/music.js" \
	--js "$JS_SRC_DIR/ui.js" \
	--js "$JS_SRC_DIR/util.js" \
	--js_output_file "$JS_BUILD_DIR"
