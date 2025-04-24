export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      notes: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          content: string
          summary: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          content: string
          summary?: string | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          content?: string
          summary?: string | null
          user_id?: string
        }
      }
    }
  }
}

export type Note = Database['public']['Tables']['notes']['Row']
export type InsertNote = Database['public']['Tables']['notes']['Insert']
export type UpdateNote = Database['public']['Tables']['notes']['Update']