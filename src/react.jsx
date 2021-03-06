(function() {

	// I manage the Demo widget.
	var Demo = React.createClass({

		// I provide the initial view-model, before the component is mounted.
		getInitialState: function() {

			// We'll start out with a grid with 10,000 items.
			return({
				grid: this.generateGrid( 1000, 10 ),
				form: {
					filter: ""
				}
			});

		},


		// ---
		// PUBLIC METHODS.
		// ---


		// I render the view using the current state and properties collections.
		render: function() {

			if ( this.state.grid.length ) {

				var dataPoints = ( this.state.grid.length * this.state.grid[ 0 ].items.length );

			} else {

				var dataPoints = 0;

			}

			var visibleCount = this.getVisibleCount();

			return(
				<div>
					<DemoForm
						dataPoints={ dataPoints }
						visibleCount={ visibleCount }
						filter={ this.state.form.filter }
						onFilterChange={ this.setFilter }
						isMounted={ !! this.state.grid.length }
						onUnmount={ this.unmountGrid }
						onRemount={ this.remountGrid }
					/>

					<DemoTable
						grid={ this.state.grid }
						filter={ this.state.form.filter }
					/>
				</div>
			);

		},


		// I repopulate the grid with data. This will help separate processing
		// performance characteristics from page-load processing.
		remountGrid: function() {

			this.setState({
				grid: this.generateGrid( 1000, 10 ),
				form: {
					filter: ""
				}
			});

		},


		// I update the state for filtering.
		setFilter: function( newFilter ) {

			// When we update the filter, we don't have to mutate any other state
			// since the filtering is actually applied in the render() methods.
			this.setState({
				form: {
					filter: newFilter
				}
			});

		},


		// I clear the grid of data. This will help separate processing performance
		// characteristics from page-load processing.
		unmountGrid: function() {

			this.setState({
				grid: [],
				form: {
					filter: ""
				}
			});

		},


		// ---
		// PRIVATE METHODS.
		// ---


		// I calculate and return the visible count of items based on the current
		// state of the filtering.
		getVisibleCount: function() {

			var count = 0;

			for ( var r = 0, rowCount = this.state.grid.length ; r < rowCount ; r++ ) {

				var row = this.state.grid[ r ];

				for ( var c = 0, columnCount = row.items.length ; c < columnCount ; c++ ) {

					var item = row.items[ c ];

					var isHidden = ( this.state.form.filter && ( item.value.indexOf( this.state.form.filter ) === -1 ) );

					if ( ! isHidden ) {

						count++;

					}

				}

			}

			return( count );

		},


		// I generate a grid of items with the given dimensions. The grid is
		// represented as a two dimensional grid, of sorts. Each row has an object
		// that has an items collection.
		generateGrid: function( rowCount, columnCount ) {

			var valuePoints = [
				"Daenerys", "Jon", "Sansa", "Arya", "Stannis", "Gregor", "Tyrion",
				"Theon", "Joffrey", "Ramsay", "Cersei", "Bran", "Margaery",
				"Melisandre", "Daario", "Jamie", "Eddard", "Myrcella", "Robb",
				"Jorah", "Petyr", "Tommen", "Sandor", "Oberyn", "Drogo", "Ygritte"
			];

			var valueIndex = 0;

			var grid = [];

			for ( var r = 0 ; r < rowCount ; r++ ) {

				var row = {
					id: r,
					items: []
				};

				for ( var c = 0 ; c < columnCount ; c++ ) {

					row.items.push({
						id: ( r + "-" + c ),
						value: valuePoints[ valueIndex ],
						isHiddenByFilter: false
					});

					if ( ++valueIndex >= valuePoints.length ) {

						valueIndex = 0;

					}

				}

				grid.push( row );

			}

			return( grid );

		}

	});


	// --------------------------------------------------------------------------- //
	// --------------------------------------------------------------------------- //


	// I manage the Form widget.
	var DemoForm = React.createClass({

		// I handle user-based changes on the input form. When the user updates the
		// filtering, we need to let the calling context know about it.
		handleFilterChange: function( event ) {

			this.props.onFilterChange( this.refs.filter.getDOMNode().value );

		},


		// I handle the user's desire to remount the data.
		handleRemount: function( event ) {

			this.props.onRemount();

		},


		// I handle the user's desire to unmount the data.
		handleUnmount: function( event ) {

			this.props.onUnmount();

		},


		// I render the view using the current state and properties collections.
		render: function() {

			var fitlerInsight = null;

			// If the user has entered filter text, we want to show some insight into
			// the breadth of the filtering.
			// --
			// CAUTION: We have to have these awkward and explicit spaces { " " }
			// because the JSX strips out certain pieces of whitespace, leaving
			// the input butted-up against the label.
			if ( this.props.filter ) {

				fitlerInsight = (
					<span>
						&mdash;
						Filtering <strong>{ this.props.filter }</strong>
						{ " " } over { this.props.dataPoints } data points,
						{ " " } { this.props.visibleCount } found.
					</span>
				);

			}

			// Provide some tooling to unmount and remount the data.
			if ( this.props.isMounted ) {

				var mountAction = <a id="unmount-grid" onClick={ this.handleUnmount }>Unmount Grid</a>;

			} else {

				var mountAction = <a id="remount-grid" onClick={ this.handleRemount }>Remount Grid</a>;

			}

			// CAUTION: We have to have these awkward and explicit spaces { " " }
			// because the JSX strips out certain pieces of whitespace, leaving
			// the input butted-up against the label.
			return(
				<form>
					<strong>Filter Data</strong>:
					{ " " }
					<input
						type="text"
						ref="filter"
						value={ this.props.filter }
						onChange={ this.handleFilterChange }
						/>
					{ " " }
					{ fitlerInsight }
					{ " " }
					{ mountAction }
				</form>
			);

		}

	});


	// --------------------------------------------------------------------------- //
	// --------------------------------------------------------------------------- //


	// I manage the Table widget.
	var DemoTable = React.createClass({

		// I render the view using the current state and properties collections.
		render: function() {

			// If the table is being filtered, we want to add a class to the table to
			// set a default style for all the non-hidden elements.
			var tableClasses = this.props.filter
				? "filtered"
				: null
			;

			// Creating a local reference so we don't have to .bind() the iterator.
			var filter = this.props.filter;

			// Translate the grid into a collection of rows.
			var rows = this.props.grid.map(
				function transformRow( row ) {

					return(
						<DemoTableRow
							key={ row.id }
							row={ row }
							filter={ filter }
						/>
					);

				}
			);

			return(
				<table width="100%" cellSpacing="2" className={ tableClasses }>
					<tbody>
						{ rows }
					</tbody>
				</table>
			);

		}

	});


	// --------------------------------------------------------------------------- //
	// --------------------------------------------------------------------------- //


	// I manage the Table rows.
	var DemoTableRow = React.createClass({

		// I render the view using the current state and properties collections.
		render: function() {

			var columns = [
				<td>
					{ this.props.row.id }
				</td>
			];

			// Creating a local reference so we don't have to .bind() the iterator.
			var filter = this.props.filter;

			// Translate each item into a TD element. If there is filtering being
			// applied, some of the TD elements will have the "hidden" class.
			this.props.row.items.forEach(
				function transformItem( item ) {

					var classes = "item";

					if ( filter && ( item.value.indexOf( filter ) === -1 ) ) {

						classes += " hidden";

					}

					columns.push(
						<td key={ item.id } className={ classes }>
							{ item.value }
						</td>
					);

				}
			);

			return(
				<tr>
					{ columns }
				</tr>
			);

		}

	});


	// --------------------------------------------------------------------------- //
	// --------------------------------------------------------------------------- //


	// Render the root Demo and mount it inside the given element.
	React.render( <Demo />, document.getElementById( "content" ) );

}());
