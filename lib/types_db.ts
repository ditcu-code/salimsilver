export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      collections: {
        Row: {
          cover_image_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          featured: boolean | null
          id: string
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          cover_image_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          cover_image_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_collection_cover_image"
            columns: ["cover_image_id"]
            isOneToOne: false
            referencedRelation: "jewelry_images"
            referencedColumns: ["id"]
          },
        ]
      }
      jewelry: {
        Row: {
          collection_id: string | null
          crafting_time_hours: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          material: Database["public"]["Enums"]["material_type"] | null
          material_purity: string | null
          production_year: number | null
          slug: string
          status: Database["public"]["Enums"]["jewelry_status"] | null
          title: string
          updated_at: string | null
          variants: Json | null
          weight_grams: number | null
        }
        Insert: {
          collection_id?: string | null
          crafting_time_hours?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          material?: Database["public"]["Enums"]["material_type"] | null
          material_purity?: string | null
          production_year?: number | null
          slug: string
          status?: Database["public"]["Enums"]["jewelry_status"] | null
          title: string
          updated_at?: string | null
          variants?: Json | null
          weight_grams?: number | null
        }
        Update: {
          collection_id?: string | null
          crafting_time_hours?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          material?: Database["public"]["Enums"]["material_type"] | null
          material_purity?: string | null
          production_year?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["jewelry_status"] | null
          title?: string
          updated_at?: string | null
          variants?: Json | null
          weight_grams?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jewelry_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      jewelry_images: {
        Row: {
          created_at: string | null
          created_by: string | null
          display_order: number | null
          id: string
          jewelry_id: string | null
          src: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          display_order?: number | null
          id?: string
          jewelry_id?: string | null
          src: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          display_order?: number | null
          id?: string
          jewelry_id?: string | null
          src?: string
        }
        Relationships: [
          {
            foreignKeyName: "jewelry_images_jewelry_id_fkey"
            columns: ["jewelry_id"]
            isOneToOne: false
            referencedRelation: "jewelry"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          content: string | null
          cover_image_url: string | null
          created_at: string | null
          excerpt: string | null
          featured: boolean | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published: boolean | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      silver_prices: {
        Row: {
          price_idr: number
          updated_at: string
          is_api: boolean | null
        }
        Insert: {
          price_idr: number
          updated_at?: string
          is_api?: boolean | null
        }
        Update: {
          price_idr?: number
          updated_at?: string
          is_api?: boolean | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name: string
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          role?: string | null
          updated_at?: string | null
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
      jewelry_status: "available" | "sold" | "reserved" | "hidden"
      material_type: "gold" | "silver" | "copper" | "brass"
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
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      jewelry_status: ["available", "sold", "reserved", "hidden"],
      material_type: ["gold", "silver", "copper", "brass"],
    },
  },
} as const
