export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      aos_activity: {
        Row: {
          action: string
          actor_id: string | null
          actor_name: string | null
          client_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          is_client_visible: boolean
          metadata: Json | null
          project_id: string | null
          summary: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          actor_name?: string | null
          client_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          is_client_visible?: boolean
          metadata?: Json | null
          project_id?: string | null
          summary: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          actor_name?: string | null
          client_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          is_client_visible?: boolean
          metadata?: Json | null
          project_id?: string | null
          summary?: string
        }
        Relationships: [
          {
            foreignKeyName: "aos_activity_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "aos_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aos_activity_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "aos_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      aos_approvals: {
        Row: {
          asset_type: string | null
          asset_url: string | null
          category: string
          client_id: string
          client_response: string | null
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          project_id: string | null
          responded_at: string | null
          responded_by: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          asset_type?: string | null
          asset_url?: string | null
          category?: string
          client_id: string
          client_response?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          project_id?: string | null
          responded_at?: string | null
          responded_by?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          asset_type?: string | null
          asset_url?: string | null
          category?: string
          client_id?: string
          client_response?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          project_id?: string | null
          responded_at?: string | null
          responded_by?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "aos_approvals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "aos_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aos_approvals_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "aos_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      aos_client_chat_messages: {
        Row: {
          client_id: string
          content: string
          created_at: string
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          client_id: string
          content: string
          created_at?: string
          id?: string
          role: string
          user_id?: string | null
        }
        Update: {
          client_id?: string
          content?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "aos_client_chat_messages_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "aos_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      aos_client_users: {
        Row: {
          client_id: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "aos_client_users_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "aos_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      aos_clients: {
        Row: {
          account_manager_id: string | null
          address: string | null
          assigned_team: string[] | null
          city: string | null
          company_name: string | null
          contract_end: string | null
          contract_start: string | null
          country: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          industry: string | null
          language: string | null
          logo_url: string | null
          monthly_retainer: number | null
          notes: string | null
          phone: string | null
          service_package: string | null
          state: string | null
          status: string
          timezone: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          account_manager_id?: string | null
          address?: string | null
          assigned_team?: string[] | null
          city?: string | null
          company_name?: string | null
          contract_end?: string | null
          contract_start?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          industry?: string | null
          language?: string | null
          logo_url?: string | null
          monthly_retainer?: number | null
          notes?: string | null
          phone?: string | null
          service_package?: string | null
          state?: string | null
          status?: string
          timezone?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          account_manager_id?: string | null
          address?: string | null
          assigned_team?: string[] | null
          city?: string | null
          company_name?: string | null
          contract_end?: string | null
          contract_start?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          industry?: string | null
          language?: string | null
          logo_url?: string | null
          monthly_retainer?: number | null
          notes?: string | null
          phone?: string | null
          service_package?: string | null
          state?: string | null
          status?: string
          timezone?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      aos_milestones: {
        Row: {
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          name: string
          position: number
          project_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          name: string
          position?: number
          project_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          name?: string
          position?: number
          project_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "aos_milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "aos_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      aos_projects: {
        Row: {
          budget: number | null
          client_id: string
          color: string | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          owner_id: string | null
          priority: string
          progress: number
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          budget?: number | null
          client_id: string
          color?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          owner_id?: string | null
          priority?: string
          progress?: number
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          budget?: number | null
          client_id?: string
          color?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          priority?: string
          progress?: number
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "aos_projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "aos_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      aos_task_comments: {
        Row: {
          author_id: string
          body: string
          created_at: string
          id: string
          task_id: string
        }
        Insert: {
          author_id: string
          body: string
          created_at?: string
          id?: string
          task_id: string
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "aos_task_comments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "aos_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      aos_tasks: {
        Row: {
          assignee_id: string | null
          checklist: Json
          created_at: string
          description: string | null
          due_date: string | null
          estimate_hours: number | null
          id: string
          milestone_id: string | null
          parent_task_id: string | null
          position: number
          priority: string
          project_id: string
          reporter_id: string | null
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          assignee_id?: string | null
          checklist?: Json
          created_at?: string
          description?: string | null
          due_date?: string | null
          estimate_hours?: number | null
          id?: string
          milestone_id?: string | null
          parent_task_id?: string | null
          position?: number
          priority?: string
          project_id: string
          reporter_id?: string | null
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          assignee_id?: string | null
          checklist?: Json
          created_at?: string
          description?: string | null
          due_date?: string | null
          estimate_hours?: number | null
          id?: string
          milestone_id?: string | null
          parent_task_id?: string | null
          position?: number
          priority?: string
          project_id?: string
          reporter_id?: string | null
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "aos_tasks_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "aos_milestones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aos_tasks_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "aos_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aos_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "aos_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      aos_time_entries: {
        Row: {
          created_at: string
          id: string
          logged_on: string
          minutes: number
          note: string | null
          task_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          logged_on?: string
          minutes: number
          note?: string | null
          task_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          logged_on?: string
          minutes?: number
          note?: string | null
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "aos_time_entries_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "aos_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      aos_vault_files: {
        Row: {
          client_id: string
          created_at: string
          download_count: number
          folder_id: string | null
          id: string
          mime_type: string | null
          name: string
          parent_file_id: string | null
          size_bytes: number | null
          tags: string[] | null
          uploaded_by: string | null
          url: string
          version: number
        }
        Insert: {
          client_id: string
          created_at?: string
          download_count?: number
          folder_id?: string | null
          id?: string
          mime_type?: string | null
          name: string
          parent_file_id?: string | null
          size_bytes?: number | null
          tags?: string[] | null
          uploaded_by?: string | null
          url: string
          version?: number
        }
        Update: {
          client_id?: string
          created_at?: string
          download_count?: number
          folder_id?: string | null
          id?: string
          mime_type?: string | null
          name?: string
          parent_file_id?: string | null
          size_bytes?: number | null
          tags?: string[] | null
          uploaded_by?: string | null
          url?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "aos_vault_files_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "aos_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aos_vault_files_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "aos_vault_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aos_vault_files_parent_file_id_fkey"
            columns: ["parent_file_id"]
            isOneToOne: false
            referencedRelation: "aos_vault_files"
            referencedColumns: ["id"]
          },
        ]
      }
      aos_vault_folders: {
        Row: {
          client_id: string
          created_at: string
          created_by: string | null
          id: string
          name: string
          parent_id: string | null
        }
        Insert: {
          client_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          parent_id?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "aos_vault_folders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "aos_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aos_vault_folders_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "aos_vault_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          address: string | null
          admin_notes: string | null
          budget: string | null
          company: string | null
          confirmed_at: string | null
          created_at: string
          duration_minutes: number | null
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          service: string | null
          status: string
          timezone: string | null
        }
        Insert: {
          address?: string | null
          admin_notes?: string | null
          budget?: string | null
          company?: string | null
          confirmed_at?: string | null
          created_at?: string
          duration_minutes?: number | null
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: string | null
          status?: string
          timezone?: string | null
        }
        Update: {
          address?: string | null
          admin_notes?: string | null
          budget?: string | null
          company?: string | null
          confirmed_at?: string | null
          created_at?: string
          duration_minutes?: number | null
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: string | null
          status?: string
          timezone?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string | null
          content: string | null
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          challenge: string | null
          client: string | null
          created_at: string
          id: string
          image_url: string | null
          industry: string | null
          is_active: boolean
          metrics: Json
          results: string | null
          solution: string | null
          sort_order: number
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          challenge?: string | null
          client?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          industry?: string | null
          is_active?: boolean
          metrics?: Json
          results?: string | null
          solution?: string | null
          sort_order?: number
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          challenge?: string | null
          client?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          industry?: string | null
          is_active?: boolean
          metrics?: Json
          results?: string | null
          solution?: string | null
          sort_order?: number
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      chatbot_leads: {
        Row: {
          budget: string | null
          business_type: string | null
          conversation: Json | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          notes: string | null
          phone: string | null
          qualification_score: number | null
          qualified: boolean | null
          service_interest: string | null
          session_key: string | null
          status: string
          timeline: string | null
        }
        Insert: {
          budget?: string | null
          business_type?: string | null
          conversation?: Json | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          notes?: string | null
          phone?: string | null
          qualification_score?: number | null
          qualified?: boolean | null
          service_interest?: string | null
          session_key?: string | null
          status?: string
          timeline?: string | null
        }
        Update: {
          budget?: string | null
          business_type?: string | null
          conversation?: Json | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          notes?: string | null
          phone?: string | null
          qualification_score?: number | null
          qualified?: boolean | null
          service_interest?: string | null
          session_key?: string | null
          status?: string
          timeline?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          sort_order: number
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          sort_order?: number
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          sort_order?: number
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      contact_leads: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          source: string | null
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          source?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          source?: string | null
          status?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          description: string | null
          discount_type: string
          discount_value: number
          expires_at: string | null
          id: string
          is_active: boolean
          max_uses: number | null
          updated_at: string
          used_count: number
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          updated_at?: string
          used_count?: number
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          updated_at?: string
          used_count?: number
        }
        Relationships: []
      }
      crm_followups: {
        Row: {
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          due_at: string
          id: string
          lead_id: string | null
          lead_source: string
          notes: string | null
          priority: string
          status: string
          summary: string | null
          updated_at: string
        }
        Insert: {
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          due_at?: string
          id?: string
          lead_id?: string | null
          lead_source: string
          notes?: string | null
          priority?: string
          status?: string
          summary?: string | null
          updated_at?: string
        }
        Update: {
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          due_at?: string
          id?: string
          lead_id?: string | null
          lead_source?: string
          notes?: string | null
          priority?: string
          status?: string
          summary?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      dynamic_pages: {
        Row: {
          created_at: string
          hero_image: string | null
          hero_subtitle: string | null
          id: string
          is_published: boolean
          long_tail_keywords: string[] | null
          meta_description: string | null
          meta_title: string | null
          og_image_url: string | null
          primary_keyword: string | null
          secondary_keywords: string[] | null
          sections: Json
          show_in_nav: boolean
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          hero_image?: string | null
          hero_subtitle?: string | null
          id?: string
          is_published?: boolean
          long_tail_keywords?: string[] | null
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          primary_keyword?: string | null
          secondary_keywords?: string[] | null
          sections?: Json
          show_in_nav?: boolean
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          hero_image?: string | null
          hero_subtitle?: string | null
          id?: string
          is_published?: boolean
          long_tail_keywords?: string[] | null
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          primary_keyword?: string | null
          secondary_keywords?: string[] | null
          sections?: Json
          show_in_nav?: boolean
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          id: string
          is_active: boolean
          question: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          question: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          question?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          client_address: string | null
          client_email: string | null
          client_name: string
          created_at: string
          created_by: string | null
          currency: string
          due_date: string | null
          id: string
          invoice_number: string
          issue_date: string
          line_items: Json
          notes: string | null
          status: string
          subtotal: number
          tax_amount: number
          tax_rate: number
          total: number
          updated_at: string
        }
        Insert: {
          client_address?: string | null
          client_email?: string | null
          client_name: string
          created_at?: string
          created_by?: string | null
          currency?: string
          due_date?: string | null
          id?: string
          invoice_number: string
          issue_date?: string
          line_items?: Json
          notes?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          total?: number
          updated_at?: string
        }
        Update: {
          client_address?: string | null
          client_email?: string | null
          client_name?: string
          created_at?: string
          created_by?: string | null
          currency?: string
          due_date?: string | null
          id?: string
          invoice_number?: string
          issue_date?: string
          line_items?: Json
          notes?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          total?: number
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          cover_letter: string | null
          created_at: string
          email: string
          id: string
          job_id: string | null
          name: string
          phone: string | null
          resume_url: string | null
          status: string
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string
          email: string
          id?: string
          job_id?: string | null
          name: string
          phone?: string | null
          resume_url?: string | null
          status?: string
        }
        Update: {
          cover_letter?: string | null
          created_at?: string
          email?: string
          id?: string
          job_id?: string | null
          name?: string
          phone?: string | null
          resume_url?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_openings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_openings: {
        Row: {
          created_at: string
          department: string | null
          description: string | null
          id: string
          is_active: boolean
          location: string | null
          requirements: string | null
          salary_range: string | null
          sort_order: number
          title: string
          type: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          location?: string | null
          requirements?: string | null
          salary_range?: string | null
          sort_order?: number
          title: string
          type?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          location?: string | null
          requirements?: string | null
          salary_range?: string | null
          sort_order?: number
          title?: string
          type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          category: string | null
          created_at: string
          id: string
          name: string
          size_bytes: number | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          category?: string | null
          created_at?: string
          id?: string
          name: string
          size_bytes?: number | null
          url: string
        }
        Update: {
          alt_text?: string | null
          category?: string | null
          created_at?: string
          id?: string
          name?: string
          size_bytes?: number | null
          url?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
        }
        Relationships: []
      }
      packages: {
        Row: {
          created_at: string
          currency: string
          description: string | null
          id: string
          image_url: string | null
          includes: Json
          is_active: boolean
          name: string
          price: number
          sort_order: number
          tagline: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          image_url?: string | null
          includes?: Json
          is_active?: boolean
          name: string
          price?: number
          sort_order?: number
          tagline?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          image_url?: string | null
          includes?: Json
          is_active?: boolean
          name?: string
          price?: number
          sort_order?: number
          tagline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      page_banners: {
        Row: {
          background_image: string | null
          bg_color: string | null
          created_at: string
          cta_text: string | null
          cta_url: string | null
          id: string
          is_active: boolean
          page_route: string
          position: string
          sort_order: number
          subtitle: string | null
          text_color: string | null
          title: string
          updated_at: string
        }
        Insert: {
          background_image?: string | null
          bg_color?: string | null
          created_at?: string
          cta_text?: string | null
          cta_url?: string | null
          id?: string
          is_active?: boolean
          page_route?: string
          position?: string
          sort_order?: number
          subtitle?: string | null
          text_color?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          background_image?: string | null
          bg_color?: string | null
          created_at?: string
          cta_text?: string | null
          cta_url?: string | null
          id?: string
          is_active?: boolean
          page_route?: string
          position?: string
          sort_order?: number
          subtitle?: string | null
          text_color?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_seo: {
        Row: {
          auto_generate: boolean
          created_at: string
          description: string | null
          id: string
          keywords: string | null
          long_tail_keywords: string[] | null
          noindex: boolean
          og_image_url: string | null
          primary_keyword: string | null
          route: string
          secondary_keywords: string[] | null
          seo_tags: string[] | null
          title: string | null
          updated_at: string
        }
        Insert: {
          auto_generate?: boolean
          created_at?: string
          description?: string | null
          id?: string
          keywords?: string | null
          long_tail_keywords?: string[] | null
          noindex?: boolean
          og_image_url?: string | null
          primary_keyword?: string | null
          route: string
          secondary_keywords?: string[] | null
          seo_tags?: string[] | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          auto_generate?: boolean
          created_at?: string
          description?: string | null
          id?: string
          keywords?: string | null
          long_tail_keywords?: string[] | null
          noindex?: boolean
          og_image_url?: string | null
          primary_keyword?: string | null
          route?: string
          secondary_keywords?: string[] | null
          seo_tags?: string[] | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      popups: {
        Row: {
          content: string | null
          created_at: string
          cta_text: string | null
          cta_url: string | null
          end_at: string | null
          id: string
          image_url: string | null
          is_active: boolean
          start_at: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          cta_text?: string | null
          cta_url?: string | null
          end_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          start_at?: string | null
          title: string
          type?: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          cta_text?: string | null
          cta_url?: string | null
          end_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          start_at?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          project_url: string | null
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          project_url?: string | null
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          project_url?: string | null
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      pricing_plans: {
        Row: {
          created_at: string
          cta_text: string | null
          cta_url: string | null
          currency: string
          description: string | null
          features: Json
          highlighted: boolean
          id: string
          is_active: boolean
          name: string
          period: string | null
          price: number
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_text?: string | null
          cta_url?: string | null
          currency?: string
          description?: string | null
          features?: Json
          highlighted?: boolean
          id?: string
          is_active?: boolean
          name: string
          period?: string | null
          price?: number
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_text?: string | null
          cta_url?: string | null
          currency?: string
          description?: string | null
          features?: Json
          highlighted?: boolean
          id?: string
          is_active?: boolean
          name?: string
          period?: string | null
          price?: number
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      process_steps: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      proposals: {
        Row: {
          client_email: string | null
          client_name: string
          created_at: string
          created_by: string | null
          currency: string
          id: string
          line_items: Json
          notes: string | null
          proposal_number: string
          scope: string | null
          status: string
          title: string
          total: number
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          client_email?: string | null
          client_name: string
          created_at?: string
          created_by?: string | null
          currency?: string
          id?: string
          line_items?: Json
          notes?: string | null
          proposal_number: string
          scope?: string | null
          status?: string
          title: string
          total?: number
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          client_email?: string | null
          client_name?: string
          created_at?: string
          created_by?: string | null
          currency?: string
          id?: string
          line_items?: Json
          notes?: string | null
          proposal_number?: string
          scope?: string | null
          status?: string
          title?: string
          total?: number
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          options: Json
          question: string
          result_mapping: Json
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          options?: Json
          question: string
          result_mapping?: Json
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          options?: Json
          question?: string
          result_mapping?: Json
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean
          is_featured: boolean
          long_description: string | null
          parent_slug: string | null
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          long_description?: string | null
          parent_slug?: string | null
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          long_description?: string | null
          parent_slug?: string | null
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          address: string | null
          bing_verification: string | null
          clarity_id: string | null
          contact_email: string | null
          contact_phone: string | null
          custom_body_html: string | null
          custom_head_html: string | null
          facebook_url: string | null
          footer_text_color: string | null
          google_analytics_id: string | null
          google_maps_embed: string | null
          google_tag_manager_id: string | null
          gsc_verification: string | null
          header_text_color: string | null
          hero_heading_color: string | null
          hero_typewriter_lines: Json | null
          hotjar_id: string | null
          id: string
          instagram_url: string | null
          linkedin_insight_id: string | null
          linkedin_url: string | null
          logo_url: string | null
          meta_pixel_id: string | null
          pinterest_tag_id: string | null
          pixel_auto_verify: boolean
          site_name: string
          snapchat_pixel_id: string | null
          tagline: string | null
          theme_accent_color: string | null
          theme_primary_color: string | null
          tiktok_pixel_id: string | null
          twitter_pixel_id: string | null
          updated_at: string
          whatsapp_number: string | null
          yandex_verification: string | null
          youtube_url: string | null
        }
        Insert: {
          address?: string | null
          bing_verification?: string | null
          clarity_id?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          custom_body_html?: string | null
          custom_head_html?: string | null
          facebook_url?: string | null
          footer_text_color?: string | null
          google_analytics_id?: string | null
          google_maps_embed?: string | null
          google_tag_manager_id?: string | null
          gsc_verification?: string | null
          header_text_color?: string | null
          hero_heading_color?: string | null
          hero_typewriter_lines?: Json | null
          hotjar_id?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_insight_id?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          meta_pixel_id?: string | null
          pinterest_tag_id?: string | null
          pixel_auto_verify?: boolean
          site_name?: string
          snapchat_pixel_id?: string | null
          tagline?: string | null
          theme_accent_color?: string | null
          theme_primary_color?: string | null
          tiktok_pixel_id?: string | null
          twitter_pixel_id?: string | null
          updated_at?: string
          whatsapp_number?: string | null
          yandex_verification?: string | null
          youtube_url?: string | null
        }
        Update: {
          address?: string | null
          bing_verification?: string | null
          clarity_id?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          custom_body_html?: string | null
          custom_head_html?: string | null
          facebook_url?: string | null
          footer_text_color?: string | null
          google_analytics_id?: string | null
          google_maps_embed?: string | null
          google_tag_manager_id?: string | null
          gsc_verification?: string | null
          header_text_color?: string | null
          hero_heading_color?: string | null
          hero_typewriter_lines?: Json | null
          hotjar_id?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_insight_id?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          meta_pixel_id?: string | null
          pinterest_tag_id?: string | null
          pixel_auto_verify?: boolean
          site_name?: string
          snapchat_pixel_id?: string | null
          tagline?: string | null
          theme_accent_color?: string | null
          theme_primary_color?: string | null
          tiktok_pixel_id?: string | null
          twitter_pixel_id?: string | null
          updated_at?: string
          whatsapp_number?: string | null
          yandex_verification?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      stats_counters: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          is_active: boolean
          label: string
          sort_order: number
          suffix: string | null
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          is_active?: boolean
          label: string
          sort_order?: number
          suffix?: string | null
          updated_at?: string
          value?: number
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          is_active?: boolean
          label?: string
          sort_order?: number
          suffix?: string | null
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      team_members: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          id: string
          initials: string | null
          is_active: boolean
          linkedin_url: string | null
          name: string
          role: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          initials?: string | null
          is_active?: boolean
          linkedin_url?: string | null
          name: string
          role: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          initials?: string | null
          is_active?: boolean
          linkedin_url?: string | null
          name?: string
          role?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          quote: string
          rating: number
          role: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          quote: string
          rating?: number
          role?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          quote?: string
          rating?: number
          role?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      visitor_events: {
        Row: {
          created_at: string
          element_id: string | null
          element_label: string | null
          event_type: string
          id: string
          meta: Json | null
          path: string | null
          session_key: string
        }
        Insert: {
          created_at?: string
          element_id?: string | null
          element_label?: string | null
          event_type: string
          id?: string
          meta?: Json | null
          path?: string | null
          session_key: string
        }
        Update: {
          created_at?: string
          element_id?: string | null
          element_label?: string | null
          event_type?: string
          id?: string
          meta?: Json | null
          path?: string | null
          session_key?: string
        }
        Relationships: []
      }
      visitor_sessions: {
        Row: {
          browser: string | null
          city: string | null
          clicks: number
          country: string | null
          device_type: string | null
          duration_seconds: number
          id: string
          landing_path: string | null
          last_seen_at: string
          os: string | null
          page_views: number
          referrer: string | null
          session_key: string
          started_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          clicks?: number
          country?: string | null
          device_type?: string | null
          duration_seconds?: number
          id?: string
          landing_path?: string | null
          last_seen_at?: string
          os?: string | null
          page_views?: number
          referrer?: string | null
          session_key: string
          started_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          clicks?: number
          country?: string | null
          device_type?: string | null
          duration_seconds?: number
          id?: string
          landing_path?: string | null
          last_seen_at?: string
          os?: string | null
          page_views?: number
          referrer?: string | null
          session_key?: string
          started_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      public_team_members: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          id: string | null
          initials: string | null
          is_active: boolean | null
          linkedin_url: string | null
          name: string | null
          role: string | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id?: string | null
          initials?: string | null
          is_active?: boolean | null
          linkedin_url?: string | null
          name?: string | null
          role?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id?: string | null
          initials?: string | null
          is_active?: boolean | null
          linkedin_url?: string | null
          name?: string | null
          role?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      bump_visitor_session: {
        Args: { _duration_seconds?: number; _session_key: string }
        Returns: undefined
      }
      get_public_site_settings: {
        Args: never
        Returns: {
          address: string
          bing_verification: string
          clarity_id: string
          contact_email: string
          contact_phone: string
          custom_body_html: string
          custom_head_html: string
          facebook_url: string
          footer_text_color: string
          google_analytics_id: string
          google_maps_embed: string
          google_tag_manager_id: string
          gsc_verification: string
          header_text_color: string
          hero_heading_color: string
          hero_typewriter_lines: Json
          hotjar_id: string
          id: string
          instagram_url: string
          linkedin_insight_id: string
          linkedin_url: string
          logo_url: string
          meta_pixel_id: string
          pinterest_tag_id: string
          site_name: string
          snapchat_pixel_id: string
          tagline: string
          theme_accent_color: string
          theme_primary_color: string
          tiktok_pixel_id: string
          twitter_pixel_id: string
          whatsapp_number: string
          yandex_verification: string
          youtube_url: string
        }[]
      }
      has_client_access: {
        Args: { _client_id: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      validate_coupon: {
        Args: { _code: string }
        Returns: {
          code: string
          description: string
          discount_type: string
          discount_value: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "user" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "user", "client"],
    },
  },
} as const
