/**
 * Registry of every database table the admin panel manages, grouped by module.
 * Useful when re-mounting the admin folder on a different backend/frontend:
 * this is the full data contract in one place.
 */
export const ADMIN_TABLES = {
  content: [
    "services",
    "portfolio_items",
    "blog_posts",
    "case_studies",
    "team_members",
    "testimonials",
    "faqs",
    "process_steps",
    "stats_counters",
    "clients",
    "dynamic_pages",
    "page_banners",
    "popups",
    "media_library",
  ],
  commerce: ["pricing_plans", "packages", "coupons", "invoices", "proposals"],
  leads: [
    "contact_leads",
    "chatbot_leads",
    "appointments",
    "newsletter_subscribers",
    "crm_followups",
    "job_openings",
    "job_applications",
    "quiz_questions",
  ],
  marketing: ["site_settings", "page_seo", "visitor_sessions", "visitor_events"],
  aos: [
    "aos_clients",
    "aos_client_users",
    "aos_projects",
    "aos_milestones",
    "aos_tasks",
    "aos_task_comments",
    "aos_time_entries",
    "aos_approvals",
    "aos_vault_folders",
    "aos_vault_files",
    "aos_activity",
    "aos_client_chat_messages",
  ],
  auth: ["profiles", "user_roles"],
} as const;

export const EDGE_FUNCTIONS = ["ai-marketing-tools", "chatbot", "aos-client-ai", "mcp"] as const;

export type AdminModule = keyof typeof ADMIN_TABLES;
