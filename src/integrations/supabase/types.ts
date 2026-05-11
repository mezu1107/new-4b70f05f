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
      appointments: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          service: string | null
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: string | null
          status?: string
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
          contact_email: string | null
          contact_phone: string | null
          facebook_url: string | null
          google_analytics_id: string | null
          hero_typewriter_lines: Json | null
          id: string
          instagram_url: string | null
          linkedin_url: string | null
          logo_url: string | null
          meta_pixel_id: string | null
          site_name: string
          tagline: string | null
          updated_at: string
          whatsapp_number: string | null
          youtube_url: string | null
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          facebook_url?: string | null
          google_analytics_id?: string | null
          hero_typewriter_lines?: Json | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          meta_pixel_id?: string | null
          site_name?: string
          tagline?: string | null
          updated_at?: string
          whatsapp_number?: string | null
          youtube_url?: string | null
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          facebook_url?: string | null
          google_analytics_id?: string | null
          hero_typewriter_lines?: Json | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          meta_pixel_id?: string | null
          site_name?: string
          tagline?: string | null
          updated_at?: string
          whatsapp_number?: string | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
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
      app_role: ["admin", "editor", "user"],
    },
  },
} as const
