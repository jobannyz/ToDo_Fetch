import React, { useState, useEffect } from "react";
import { Button } from "bootstrap";

export function ToDolist() {
	const [list, setlist] = useState([]);

	function myFunction(e) {
		if (e.key === "Enter") {
			setlist([...list, e.target.value]);
			e.target.value = "";
		}
	}

	const DeleteItems = indexItem => {
		setlist(prevState =>
			prevState.filter((todo, index) => index !== indexItem)
		);
	};
	return (
		<div id="main" className="container">
			<h1>Lista de Tareas</h1>

			<input
				type="text"
				placeholder="Ingrese la tarea..."
				onKeyDown={event => myFunction(event)}
				className="m-2"
			/>
			<ul className="list-group">
				{list.map((item, index) => {
					return (
						<li
							id="listitem"
							className="list-group-item"
							key={index}>
							{item}{" "}
							<button className="btn btn-danger">
								<i
									className="fas fa-trash"
									onClick={() => DeleteItems(index)}></i>
							</button>
						</li>
					);
				})}
				<h3>
					<button
						type="button"
						className="btn btn-warning text-white"
						// style={{
						// 	fontSize: "25px",
						// 	fontWeight: "bold"
						// }}>
					>
						{list.length}
					</button>
					{list.length > 1 ? "items left" : "item left"}
				</h3>
			</ul>
		</div>
	);
}
