export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.1';
  };
  public: {
    Tables: {
      daily_instructions: {
        Row: {
          content: string;
          created_at: string;
          created_by: string | null;
          id: string;
          is_flash: boolean;
          post_id: string | null;
          priority: string;
          shift_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          is_flash?: boolean;
          post_id?: string | null;
          priority?: string;
          shift_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          is_flash?: boolean;
          post_id?: string | null;
          priority?: string;
          shift_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'daily_instructions_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'daily_instructions_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'daily_instructions_shift_id_fkey';
            columns: ['shift_id'];
            isOneToOne: false;
            referencedRelation: 'shifts';
            referencedColumns: ['id'];
          },
        ];
      };
      documents: {
        Row: {
          category: Database['public']['Enums']['document_category'];
          created_at: string;
          file_size: number | null;
          file_type: string | null;
          file_url: string;
          id: string;
          post_id: string | null;
          priority: string;
          site_id: string;
          title: string;
          updated_at: string;
          uploaded_by: string | null;
          version: number;
        };
        Insert: {
          category: Database['public']['Enums']['document_category'];
          created_at?: string;
          file_size?: number | null;
          file_type?: string | null;
          file_url: string;
          id?: string;
          post_id?: string | null;
          priority?: string;
          site_id: string;
          title: string;
          updated_at?: string;
          uploaded_by?: string | null;
          version?: number;
        };
        Update: {
          category?: Database['public']['Enums']['document_category'];
          created_at?: string;
          file_size?: number | null;
          file_type?: string | null;
          file_url?: string;
          id?: string;
          post_id?: string | null;
          priority?: string;
          site_id?: string;
          title?: string;
          updated_at?: string;
          uploaded_by?: string | null;
          version?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'documents_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'documents_site_id_fkey';
            columns: ['site_id'];
            isOneToOne: false;
            referencedRelation: 'sites';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'documents_uploaded_by_fkey';
            columns: ['uploaded_by'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      instruction_reads: {
        Row: {
          id: string;
          instruction_id: string;
          read_at: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          instruction_id: string;
          read_at?: string;
          user_id: string;
        };
        Update: {
          id?: string;
          instruction_id?: string;
          read_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'instruction_reads_instruction_id_fkey';
            columns: ['instruction_id'];
            isOneToOne: false;
            referencedRelation: 'daily_instructions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'instruction_reads_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      logs: {
        Row: {
          content: string | null;
          created_at: string;
          gps_lat: number | null;
          gps_lng: number | null;
          handled_at: string | null;
          handled_by: string | null;
          id: string;
          is_handled: boolean;
          media_url: string | null;
          post_id: string | null;
          shift_id: string;
          type: Database['public']['Enums']['log_type'];
          urgency_level: number;
          user_id: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          gps_lat?: number | null;
          gps_lng?: number | null;
          handled_at?: string | null;
          handled_by?: string | null;
          id?: string;
          is_handled?: boolean;
          media_url?: string | null;
          post_id?: string | null;
          shift_id: string;
          type: Database['public']['Enums']['log_type'];
          urgency_level?: number;
          user_id?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          gps_lat?: number | null;
          gps_lng?: number | null;
          handled_at?: string | null;
          handled_by?: string | null;
          id?: string;
          is_handled?: boolean;
          media_url?: string | null;
          post_id?: string | null;
          shift_id?: string;
          type?: Database['public']['Enums']['log_type'];
          urgency_level?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'logs_handled_by_fkey';
            columns: ['handled_by'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'logs_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'logs_shift_id_fkey';
            columns: ['shift_id'];
            isOneToOne: false;
            referencedRelation: 'shifts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'logs_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      map_annotations: {
        Row: {
          color: string;
          created_at: string;
          created_by: string | null;
          geo_data: Json;
          id: string;
          label: string | null;
          shift_id: string | null;
          site_id: string;
          type: Database['public']['Enums']['map_annotation_type'];
        };
        Insert: {
          color?: string;
          created_at?: string;
          created_by?: string | null;
          geo_data: Json;
          id?: string;
          label?: string | null;
          shift_id?: string | null;
          site_id: string;
          type: Database['public']['Enums']['map_annotation_type'];
        };
        Update: {
          color?: string;
          created_at?: string;
          created_by?: string | null;
          geo_data?: Json;
          id?: string;
          label?: string | null;
          shift_id?: string | null;
          site_id?: string;
          type?: Database['public']['Enums']['map_annotation_type'];
        };
        Relationships: [
          {
            foreignKeyName: 'map_annotations_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'map_annotations_shift_id_fkey';
            columns: ['shift_id'];
            isOneToOne: false;
            referencedRelation: 'shifts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'map_annotations_site_id_fkey';
            columns: ['site_id'];
            isOneToOne: false;
            referencedRelation: 'sites';
            referencedColumns: ['id'];
          },
        ];
      };
      posts: {
        Row: {
          created_at: string;
          geo_lat: number | null;
          geo_lng: number | null;
          id: string;
          name: string;
          permanent_instructions: string | null;
          permanent_instructions_pdf_url: string | null;
          site_id: string;
          staff_required: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          geo_lat?: number | null;
          geo_lng?: number | null;
          id?: string;
          name: string;
          permanent_instructions?: string | null;
          permanent_instructions_pdf_url?: string | null;
          site_id: string;
          staff_required?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          geo_lat?: number | null;
          geo_lng?: number | null;
          id?: string;
          name?: string;
          permanent_instructions?: string | null;
          permanent_instructions_pdf_url?: string | null;
          site_id?: string;
          staff_required?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'posts_site_id_fkey';
            columns: ['site_id'];
            isOneToOne: false;
            referencedRelation: 'sites';
            referencedColumns: ['id'];
          },
        ];
      };
      shift_assignments: {
        Row: {
          assigned_by: string | null;
          created_at: string;
          id: string;
          post_id: string;
          shift_id: string;
          user_id: string | null;
        };
        Insert: {
          assigned_by?: string | null;
          created_at?: string;
          id?: string;
          post_id: string;
          shift_id: string;
          user_id?: string | null;
        };
        Update: {
          assigned_by?: string | null;
          created_at?: string;
          id?: string;
          post_id?: string;
          shift_id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'shift_assignments_assigned_by_fkey';
            columns: ['assigned_by'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'shift_assignments_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'shift_assignments_shift_id_fkey';
            columns: ['shift_id'];
            isOneToOne: false;
            referencedRelation: 'shifts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'shift_assignments_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      shift_reports: {
        Row: {
          ai_narrative: string | null;
          created_at: string;
          finalized_at: string | null;
          finalized_by: string | null;
          id: string;
          kpi_data: Json | null;
          pdf_url: string | null;
          shift_id: string;
        };
        Insert: {
          ai_narrative?: string | null;
          created_at?: string;
          finalized_at?: string | null;
          finalized_by?: string | null;
          id?: string;
          kpi_data?: Json | null;
          pdf_url?: string | null;
          shift_id: string;
        };
        Update: {
          ai_narrative?: string | null;
          created_at?: string;
          finalized_at?: string | null;
          finalized_by?: string | null;
          id?: string;
          kpi_data?: Json | null;
          pdf_url?: string | null;
          shift_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'shift_reports_finalized_by_fkey';
            columns: ['finalized_by'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'shift_reports_shift_id_fkey';
            columns: ['shift_id'];
            isOneToOne: true;
            referencedRelation: 'shifts';
            referencedColumns: ['id'];
          },
        ];
      };
      shifts: {
        Row: {
          created_at: string;
          date: string;
          end_time: string | null;
          id: string;
          site_id: string;
          start_time: string | null;
          status: Database['public']['Enums']['shift_status'];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          date: string;
          end_time?: string | null;
          id?: string;
          site_id: string;
          start_time?: string | null;
          status?: Database['public']['Enums']['shift_status'];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          date?: string;
          end_time?: string | null;
          id?: string;
          site_id?: string;
          start_time?: string | null;
          status?: Database['public']['Enums']['shift_status'];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'shifts_site_id_fkey';
            columns: ['site_id'];
            isOneToOne: false;
            referencedRelation: 'sites';
            referencedColumns: ['id'];
          },
        ];
      };
      sites: {
        Row: {
          created_at: string;
          id: string;
          map_config_json: Json | null;
          name: string;
          settings_json: Json | null;
          tenant_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          map_config_json?: Json | null;
          name: string;
          settings_json?: Json | null;
          tenant_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          map_config_json?: Json | null;
          name?: string;
          settings_json?: Json | null;
          tenant_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'sites_tenant_id_fkey';
            columns: ['tenant_id'];
            isOneToOne: false;
            referencedRelation: 'tenants';
            referencedColumns: ['id'];
          },
        ];
      };
      tenants: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          plan_type: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          plan_type?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          plan_type?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          current_status: Database['public']['Enums']['user_status'];
          full_name: string | null;
          id: string;
          phone: string | null;
          role: Database['public']['Enums']['user_role'];
          site_id: string | null;
          tenant_id: string | null;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          current_status?: Database['public']['Enums']['user_status'];
          full_name?: string | null;
          id: string;
          phone?: string | null;
          role: Database['public']['Enums']['user_role'];
          site_id?: string | null;
          tenant_id?: string | null;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          current_status?: Database['public']['Enums']['user_status'];
          full_name?: string | null;
          id?: string;
          phone?: string | null;
          role?: Database['public']['Enums']['user_role'];
          site_id?: string | null;
          tenant_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_site_id_fkey';
            columns: ['site_id'];
            isOneToOne: false;
            referencedRelation: 'sites';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'users_tenant_id_fkey';
            columns: ['tenant_id'];
            isOneToOne: false;
            referencedRelation: 'tenants';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_my_role: {
        Args: never;
        Returns: Database['public']['Enums']['user_role'];
      };
      get_my_site_id: { Args: never; Returns: string };
      get_my_tenant_id: { Args: never; Returns: string };
      show_limit: { Args: never; Returns: number };
      show_trgm: { Args: { '': string }; Returns: string[] };
    };
    Enums: {
      document_category: 'fiche_poste' | 'procedure' | 'emergency' | 'site_map' | 'incident_report';
      log_type: 'info' | 'consigne' | 'incident' | 'urgent';
      map_annotation_type: 'zone' | 'marker';
      shift_status: 'draft' | 'published' | 'active' | 'completed' | 'finalized';
      user_role: 'manager' | 'agent' | 'client';
      user_status: 'online' | 'away' | 'offline';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      document_category: ['fiche_poste', 'procedure', 'emergency', 'site_map', 'incident_report'],
      log_type: ['info', 'consigne', 'incident', 'urgent'],
      map_annotation_type: ['zone', 'marker'],
      shift_status: ['draft', 'published', 'active', 'completed', 'finalized'],
      user_role: ['manager', 'agent', 'client'],
      user_status: ['online', 'away', 'offline'],
    },
  },
} as const;
