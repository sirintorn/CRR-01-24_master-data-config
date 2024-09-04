//MODIFIED FROM https://www.johndcook.com/interpolator.html

export class DispenseInterpolation {
	static findTargetStep(calibrationInfos: any[], targetTinterCode: string, targetMl: number): number {
		/*{
			"id": "sVcosRz-OH",
			"tinting_profile_id": "QXodZuuivJ",
			"index": 1,
			"tinter_code": "AXX",
			"tinter_name": "AXX",
			"target_ml": 30,
			"target_err_rate": 0.5,
			"repeat": 1,
			"result_step": 10135,
			"result_ml": 29.9556,
			"result_g": 39.116,
			"result_err_rate": -0.15,
			"status": "Passed",
			"created": 44855.60028,
			"modified": 45175.44294,
			"created_at": "2024-08-13T04:35:39.119Z",
			"updated_at": "2024-08-13T04:35:39.119Z",
			"created_by": null,
			"updated_by": null,
			"deleted_by": null,
			"deleted_at": null
		}*/
		let accurate = calibrationInfos.find((value) => value.result_ml == targetMl && value.tinter_code == targetTinterCode && (value.status.toLowerCase() == 'passed' || value.status.toLowerCase() == 'accepted'))

		if (!accurate) {
			let candidates: any[] = calibrationInfos.filter((value) => value.tinter_code == targetTinterCode && (value.status.toLowerCase() == 'passed' || value.status.toLowerCase() == 'accepted'));

			let ceils: any[] = candidates.filter((value) => value.result_ml > targetMl);
			let floors: any[] = candidates.filter((value) => value.result_ml < targetMl);
			ceils = ceils.sort((a, b) => (a.result_ml > b.result_ml ? 1 : -1)); //sort asc
			floors = floors.sort((a, b) => (a.result_ml > b.result_ml ? -1 : 1)); //sort desc

			if (ceils.length == 0) {
				//ceil out of range
				let f1 = floors[0];
				let f2 = floors[1];
				return this.interpolate(
					targetMl,
					NaN,
					f1.result_ml,
					f1.result_step,
					f2.result_ml,
					f2.result_step
				);
			} else if (floors.length == 0) {
				//floors out of range
				let c1 = ceils[0];
				let c2 = ceils[1];
				return this.interpolate(
					c1.result_ml,
					c1.result_step,
					c2.result_ml,
					c2.result_step,
					targetMl,
					NaN
				);
			} else {
				//within range
				let c = ceils[0];
				let f = floors[0];
				return this.interpolate(
					c.result_ml, 
					c.result_step,
					targetMl,
					NaN,
					f.result_ml,
					f.result_step
				);
			}
		}else{
			return accurate.result_step;
		}
	}

	static interpolate(ceilMl: number, ceilStep: number, midMl: number, midStep: number, floorMl: number, floorStep: number): number {
		let result = 0;

		var x: number[] = [], y: number[] = [];

		x[0] = ceilMl;
		x[1] = midMl;
		x[2] = floorMl;
		y[0] = ceilStep;
		y[1] = midStep;
		y[2] = floorStep;

		// Find out which field is blank.
		var numNullX = 0;
		var numNullY = 0;
		var nullIndex = 0;

		for (var i = 0; i < 3; i++) {
			if (isNaN(x[i])) {
				numNullX++;
				nullIndex = i;
			}
			if (isNaN(y[i]!)) {
				numNullY++;
				nullIndex = i;
			}
		}

		// Find out whether we're solving for an x or a y.
		// Also, arrange for the missing value to be at the end.
		var solveForX = false;
		var temp = 0;
		if (numNullX == 1 && numNullY == 0) {
			solveForX = true;
			if (nullIndex != 2) {
				x[nullIndex] = x[2];
				// swap y's
				temp = y[nullIndex]!;
				y[nullIndex] = y[2];
				y[2] = temp;
			}
		}
		else if (numNullY == 1 && numNullX == 0) {
			solveForX = false;
			if (nullIndex != 2) {
				y[nullIndex] = y[2];
				// swap x's
				temp = x[nullIndex]; x[nullIndex] = x[2]; x[2] = temp;
			}
		}
		else {
			console.log("Please enter five out of the six values");
			return NaN;
		}


		var id = "";
		if (solveForX) {
			id = "x" + nullIndex;

			if (y[0] == y[1] || y[0] == y[2] || y[1] == y[2]) {
				console.log("No two y values can be the same.");
				x[2] = x[1];
			}
			else {
				x[2] = ((y[1] - y[2]) * x[0] + (y[2] - y[0]) * x[1]) / (y[1] - y[0]);
			}
			result = x[2];
		}
		else {
			if (x[0] == x[1] || x[0] == x[2] || x[1] == x[2]) {
				console.log("No two x values can be the same");
				return NaN;
			}
			y[2] = ((x[1] - x[2]) * y[0] + (x[2] - x[0]) * y[1]) / (x[1] - x[0]);

			id = "y" + nullIndex;
			result = y[2];
		}


		return Math.floor(result);
	}
}