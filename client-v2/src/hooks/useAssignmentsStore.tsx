

import { create } from "zustand";

type AssignmentsStore = {
	assignments: any[];
};

export default create<AssignmentsStore>(
	(set, get) => ({
		assignments: [],
	})
);
