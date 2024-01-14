

import { create } from "zustand";

type AssignmentsStore = {
	assignments: any[];
	assignment?: any;
};

export default create<AssignmentsStore>(
	(set, get) => ({
		assignments: [],
		assignment: null,
	})
);
