// See https://kit.svelte.dev/docs/types#app

import type { User as DBUser } from '@prisma/client';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			db: PrismaClient;
			user: DBUser;
			safeGetSession: () => Promise<{
				session: Session | null;
				user: User | null;
			}>;
		}
		interface PageData {
			user: DBUser;
			session: Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
