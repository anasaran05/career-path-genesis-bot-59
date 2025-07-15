export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      analysis_results: {
        Row: {
          created_at: string
          id: string
          matched_roles: Json
          skill_gaps: string[]
          suggested_jobs: string[]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          matched_roles: Json
          skill_gaps: string[]
          suggested_jobs: string[]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          matched_roles?: Json
          skill_gaps?: string[]
          suggested_jobs?: string[]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analysis_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      career_insights: {
        Row: {
          created_at: string | null
          growth_prospects: string | null
          id: string
          industry_key: string
          job_description: string | null
          job_title: string
          required_skills: string[] | null
          salary_range: string | null
          upgraded_skills: string[] | null
        }
        Insert: {
          created_at?: string | null
          growth_prospects?: string | null
          id?: string
          industry_key: string
          job_description?: string | null
          job_title: string
          required_skills?: string[] | null
          salary_range?: string | null
          upgraded_skills?: string[] | null
        }
        Update: {
          created_at?: string | null
          growth_prospects?: string | null
          id?: string
          industry_key?: string
          job_description?: string | null
          job_title?: string
          required_skills?: string[] | null
          salary_range?: string | null
          upgraded_skills?: string[] | null
        }
        Relationships: []
      }
      career_paths: {
        Row: {
          career_track: string
          created_at: string
          description: string | null
          id: string
          job_title: string
          level: string
          next_roles: string[] | null
          required_skills: string[] | null
        }
        Insert: {
          career_track: string
          created_at?: string
          description?: string | null
          id?: string
          job_title: string
          level: string
          next_roles?: string[] | null
          required_skills?: string[] | null
        }
        Update: {
          career_track?: string
          created_at?: string
          description?: string | null
          id?: string
          job_title?: string
          level?: string
          next_roles?: string[] | null
          required_skills?: string[] | null
        }
        Relationships: []
      }
      certifications: {
        Row: {
          api_endpoint: string | null
          created_at: string
          id: string
          name: string
          provider: string | null
        }
        Insert: {
          api_endpoint?: string | null
          created_at?: string
          id?: string
          name: string
          provider?: string | null
        }
        Update: {
          api_endpoint?: string | null
          created_at?: string
          id?: string
          name?: string
          provider?: string | null
        }
        Relationships: []
      }
      generated_documents: {
        Row: {
          cover_letter_url: string
          created_at: string
          credits_used: number
          id: string
          job_posting_id: string | null
          resume_url: string
          user_id: string | null
        }
        Insert: {
          cover_letter_url: string
          created_at?: string
          credits_used?: number
          id?: string
          job_posting_id?: string | null
          resume_url: string
          user_id?: string | null
        }
        Update: {
          cover_letter_url?: string
          created_at?: string
          credits_used?: number
          id?: string
          job_posting_id?: string | null
          resume_url?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "generated_documents_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          benefits: string[] | null
          company: string
          created_at: string
          id: string
          job_title: string
          location: string
          perks: string[] | null
          posted_on: string | null
          required_skills: string[] | null
          responsibilities: string[] | null
          salary: string | null
          source_link: string | null
          summary: string | null
        }
        Insert: {
          benefits?: string[] | null
          company: string
          created_at?: string
          id?: string
          job_title: string
          location: string
          perks?: string[] | null
          posted_on?: string | null
          required_skills?: string[] | null
          responsibilities?: string[] | null
          salary?: string | null
          source_link?: string | null
          summary?: string | null
        }
        Update: {
          benefits?: string[] | null
          company?: string
          created_at?: string
          id?: string
          job_title?: string
          location?: string
          perks?: string[] | null
          posted_on?: string | null
          required_skills?: string[] | null
          responsibilities?: string[] | null
          salary?: string | null
          source_link?: string | null
          summary?: string | null
        }
        Relationships: []
      }
      pipeline_tasks: {
        Row: {
          created_at: string
          description: string
          id: string
          is_complete: boolean
          link_url: string | null
          step_order: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          is_complete?: boolean
          link_url?: string | null
          step_order: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          is_complete?: boolean
          link_url?: string | null
          step_order?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_certifications: {
        Row: {
          certification_id: string | null
          created_at: string
          credential_data: Json
          id: string
          status: string
          user_id: string | null
          verified_at: string | null
        }
        Insert: {
          certification_id?: string | null
          created_at?: string
          credential_data: Json
          id?: string
          status?: string
          user_id?: string | null
          verified_at?: string | null
        }
        Update: {
          certification_id?: string | null
          created_at?: string
          credential_data?: Json
          id?: string
          status?: string
          user_id?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_certifications_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_certifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_credits: {
        Row: {
          total_credits: number
          updated_at: string
          used_credits: number
          user_id: string
        }
        Insert: {
          total_credits?: number
          updated_at?: string
          used_credits?: number
          user_id: string
        }
        Update: {
          total_credits?: number
          updated_at?: string
          used_credits?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_credits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          certifications: Json | null
          created_at: string
          credits: number
          education: string | null
          email: string
          experience: string | null
          id: string
          name: string
          preferred_industries: string[] | null
          preferred_locations: string[] | null
          skills: string[] | null
        }
        Insert: {
          certifications?: Json | null
          created_at?: string
          credits?: number
          education?: string | null
          email: string
          experience?: string | null
          id?: string
          name: string
          preferred_industries?: string[] | null
          preferred_locations?: string[] | null
          skills?: string[] | null
        }
        Update: {
          certifications?: Json | null
          created_at?: string
          credits?: number
          education?: string | null
          email?: string
          experience?: string | null
          id?: string
          name?: string
          preferred_industries?: string[] | null
          preferred_locations?: string[] | null
          skills?: string[] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
