Pathfusion ImageMenu
====================

horizontal menu, reveals more of the image as you rollover it.
This is a improved version made ready for MooTools 1.3.

How To Use
----------

Example:

	var myMenu = new ImageMenu('#imageMenu a', {
		openWidth: 310, 
		onOpen: function(e,i){
			console.log(e)
		}
	});

Look into the Demo folder for a better example.

### Features

- 2 optional onClick events - open & close
- href passed to onClick events
- stays open when clicked
- closes when clicked
- elect item to pre-open

More info for options at the site of [pathfusion](http://dev.phatfusion.net/imagemenu/)
