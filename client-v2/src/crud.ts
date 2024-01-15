import { createClient } from '@supabase/supabase-js'

const client = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_KEY,
	{
		auth: {
			autoRefreshToken: true,
			detectSessionInUrl: true,
			persistSession: true,
		}
	}
);

type GetOptions = {
	select?: string;
	limit?: number;
}

type UpdateOptions = {
	upsert?: boolean
}

export default function crud(service?: string, schema: string = 'public') {
	return {
		create: async (data: any) => {
			const { data: response, error } = await client
				.schema(schema)
				.from(service!)
				.insert(data)
				.select();
			if (error) throw error
			return response
		},
		getById: async (id: string, options?: GetOptions): Promise<any> => {
			const { data: response, error } = await client
				.schema(schema)
				.from(service!)
				.select(options?.select ?? '*')
				.eq('id', id)
				.single()
			if (error) throw error
			return response
		},
		get: async (params: Record<string, any> ,options?: GetOptions): Promise<any[]> => {
			const { data: response, error, count } = await client
				.schema(schema)
				.from(service!)
				.select(options?.select ?? '*')
				.match(params)
				.limit(options?.limit || 10)
			if (error) throw error
			return response
		},
		update: async (id: string, data: any) => {
			const { data: response, error } = await client
			.schema(schema)
			.from(service!)
			.update(data)
			.eq('id', id)
			.select();

			if (error) throw error
			return response
		},
		upsert: async (filter: Record<string, any>, changes: Record<string, any>) => {
			const { data: response, error } = await client
				.schema(schema)
				.from(service!)
				.upsert(changes, { onConflict: 'id', count: 'exact', ignoreDuplicates: false })
				.match(filter)
				.single()

			if (error) throw error
			return response
		},
		raw: client.schema(schema).from(service!),
		auth: client.auth,
		bucket: client.storage.from(service!)
	}
}
