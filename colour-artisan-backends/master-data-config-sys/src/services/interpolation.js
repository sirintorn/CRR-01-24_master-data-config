//FROM https://www.johndcook.com/interpolator.html

function interpolate()
{
	// Get numeric values out of form elements.
	// Empty or non-numeric fields will become NaNs.
	var x = [], y = [];

	x[0] = parseFloat(document.getElementById("x0").value);
	x[1] = parseFloat(document.getElementById("x1").value);
	x[2] = parseFloat(document.getElementById("x2").value);
	y[0] = parseFloat(document.getElementById("y0").value);
	y[1] = parseFloat(document.getElementById("y1").value);
	y[2] = parseFloat(document.getElementById("y2").value);

	// Find out which field is blank.
	var numNullX = 0;
	var numNullY = 0;
	var nullIndex = 0;

	for (i = 0; i < 3; i++)
	{
		if (isNaN(x[i]))
		{
			numNullX++;
			nullIndex = i;
		}
		if (isNaN(y[i]))
		{
			numNullY++;
			nullIndex = i;
		}
	}

	// Find out whether we're solving for an x or a y.
	// Also, arrange for the missing value to be at the end.
	var solveForX = false;
	var temp = 0;
	if (numNullX == 1 && numNullY == 0)
	{
		solveForX = true;
		if (nullIndex != 2)
		{
			x[nullIndex] = x[2];
			// swap y's
			temp = y[nullIndex]; y[nullIndex] = y[2]; y[2] = temp;
		}
	}
	else if (numNullY == 1 && numNullX == 0)
	{
		solveForX = false;
		if (nullIndex != 2)
		{
			y[nullIndex] = y[2];
			// swap x's
			temp = x[nullIndex]; x[nullIndex] = x[2]; x[2] = temp;
		}
	}
	else
	{
		alert("Please enter five out of the six values");
		return;
	}


	var id = "";
	if (solveForX)
	{
		id = "x" + nullIndex;

		if (y[0] == y[1] || y[0] == y[2] || y[1] == y[2])
		{
			alert("No two y values can be the same.");
			x[2] = x[1];
		}
		else
		{
			x[2] = ((y[1] - y[2])*x[0] + (y[2] - y[0])*x[1]) / (y[1] - y[0]);
		}
		document.getElementById(id).value = x[2];
	}
	else
	{
		if (x[0] == x[1] || x[0] == x[2] || x[1] == x[2])
		{
			alert("No two x values can be the same");
			return;
		}
		y[2] = ((x[1] - x[2])*y[0] + (x[2] - x[0])*y[1]) / (x[1] - x[0]);

		id = "y" + nullIndex;
		document.getElementById(id).value = y[2];
	}
}