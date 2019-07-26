var LayoutGrid = {    
		LayoutGrid_Horizontal_N: 0,
		LayoutGrid_Vertical_N: 1,
		LayoutGrid_Symmetric_3_Type_Top: 2,
		LayoutGrid_Symmetric_3_Type_Left: 3,
		LayoutGrid_Symmetric_3_Type_Right: 4,
		LayoutGrid_Symmetric_3_Type_Bottom: 5,
		LayoutGrid_Symmetric_MxN: 6,
		LayoutGrid_Symmetric_Staggered_MxN: 7,
		LayoutGrid_Symmetric_StaggerX_MxN: 8,
		LayoutGrid_Symmetric_5: 9
  }

  function GridSchema()
  {      
    //maxElementSize = null;
    //locations = [];
    this.nRows = 0;
    this.nCols = 0;
	//rect = null;
	
	this.locations = Array();
	this.maxElementSize = cc.size(0, 0);
    this.rect = cc.rect(0, 0, 0, 0);
  }

  function getLocationsInGridForNumberOfItems(rect, numOfItems)
	{
		var rowsIndexes = [0, 1, 2, 2, 2, 3, 3, 3, 3, 3]; 
		var colsIndexes = [0, 1, 1, 2, 2, 2, 2, 3, 3, 3]; 
        var nRows = 0;
        var nCols = 0;
		if (numOfItems > 0 || numOfItems <= 9)
		{
			nRows = rowsIndexes[numOfItems];
			nCols = colsIndexes[numOfItems];
		}

		return getLocationsFromRectInGrid(rect, LayoutGrid.LayoutGrid_Symmetric_MxN, nRows, nCols);
    }
    
    function getLocationsFromRectInGrid(rect, layout, nRows, nCols)
	{
		var origin = cc.p(rect.x, rect.y);
		return getLocationsInGrid(origin, rect.height, rect.width, layout, nRows, nCols);
    }

	/// <summary>
	/// Gets the location in a grid.
	/// </summary>
	/// <param name="origin">left bottom origin of rectange</param>
	/// <param name="height">height of rectange</param>
	/// <param name="width">width of rectange</param>
	/// <param name="layout">Number of columns in grid</param>
	/// <param name="N">Number of elements based on layout</param>
	/// <returns>The positions where element can be placed in requested grid</returns>
    
    function getLocationsInGrid(origin, height, width, layout, nRowElements, nColElements)
	{
		var gridData = new GridSchema();

		var location = null;
		if(nRowElements < 1 || nColElements <1 )
		{
			return gridData;
		}

		switch(layout)
		{
        case LayoutGrid.LayoutGrid_Vertical_N:
            break;
        case LayoutGrid.LayoutGrid_Symmetric_3_Type_Top:
            break;
        case LayoutGrid.LayoutGrid_Symmetric_3_Type_Left:
            break;
        case LayoutGrid.LayoutGrid_Symmetric_3_Type_Right:
            break;
        case LayoutGrid.LayoutGrid_Symmetric_3_Type_Bottom:
            break;
		case LayoutGrid.LayoutGrid_Symmetric_5:
			nColElements = 2;
			nRowElements = 2;
			gridData = getLocationsInGrid(origin, height, width, LayoutGrid.LayoutGrid_Symmetric_MxN, nRowElements, nColElements);
			location = new cc.p(origin.x + width/2 , origin.y + height/2);
			// location is available at last position. you can change if need be
			gridData.locations.push(location);
			break;
		case LayoutGrid.LayoutGrid_Horizontal_N:
			break;
		case LayoutGrid.LayoutGrid_Symmetric_MxN:
		case LayoutGrid.LayoutGrid_Symmetric_Staggered_MxN:
		case LayoutGrid.LayoutGrid_Symmetric_StaggerX_MxN:
			var isYStaggered = layout == LayoutGrid.LayoutGrid_Symmetric_Staggered_MxN ? true : false;
			var isXStaggered = layout == LayoutGrid.LayoutGrid_Symmetric_StaggerX_MxN ? true : false;
			var M = nColElements;
			var N = nRowElements;
			var stepX = width/M ; 
			var stepY = height/N;
			stepY = isYStaggered ? height/(N + 0.5) : stepY;
			stepX = isXStaggered ? width/(M + 0.5) : stepX;
			var startOffsetX = origin.x + stepX/2;
			var startOffsetY = origin.y + stepY/2;
			gridData.maxElementSize.width = stepX;
			gridData.maxElementSize.height = stepY;
			var locationX = 0;
			var locationY = 0;
			var staggerOffsetY = isYStaggered ? stepY/2 : 0;
			var staggerOffsetX = isXStaggered ? stepX/2 : 0;
			for (var yy = 0; yy < N; yy++)
			{
				locationX = startOffsetX;
				locationY = startOffsetY + yy * stepY;
				var staggeredLocationY = locationY + staggerOffsetY;
				for (var xx = 0; xx < M; xx++)
				{
					locationX = startOffsetX + stepX * xx;
					var staggeredLocationX = locationX + staggerOffsetX;
					var locY = xx%2 == 0 ? locationY : staggeredLocationY;
					var locX = yy%2 == 0 ? locationX : staggeredLocationX;
					var location = new cc.p(locX , locY);
					gridData.locations.push(location);
				}
			}

			break;
		}

		gridData.nCols = nColElements;
		gridData.nRows = nRowElements;
		gridData.rect = new cc.Rect(origin.x, origin.y, width, height);
		return gridData;
	}