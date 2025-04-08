import { OrderType } from '@/types';
import { supabase } from '@/utils/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { logError } from '@/utils/errorHandling';

interface OrderResponse {
  data: OrderType[] | null;
  error: PostgrestError | null;
}

// Get a single order by order ID
export async function getOrder(orderId: string): Promise<OrderResponse> {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
      id,
      total,
      status,
      created_at,
      order_items (
        id,
        quantity,
        price,
        product:product_id (
          product_id,
          title,
          image
        )
      )
    `
    )
    .eq('id', orderId)
    .single();

  if (error) {
    logError('fetching order', error);
  }

  return { data: data ? ([data] as unknown as OrderType[]) : null, error };
}

// Get all orders for a user
export async function getUserOrders(userId: string): Promise<OrderResponse> {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
      id,
      total,
      status,
      created_at,
      order_items (
        id,
        quantity,
        price,
        product:product_id (
          product_id,
          title,
          image
        )
      )
    `
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    logError('fetching user orders', error);
  }

  return { data: data as unknown as OrderType[], error };
}
