import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderItemType, OrderType } from '@/types';

interface OrderCardProps {
  order: OrderType;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/20">
        <div className="flex flex-col md:flex-row justify-between">
          <CardTitle className="text-lg">Order #{order.id}</CardTitle>
          <div className="space-x-4 flex items-center mt-2 md:mt-0">
            <span className="text-sm text-muted-foreground">
              {order.created_at
                ? new Date(order.created_at).toLocaleDateString()
                : 'N/A'}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                order.status === 'delivered'
                  ? 'bg-green-100 text-green-800'
                  : order.status === 'shipped'
                  ? 'bg-blue-100 text-blue-800'
                  : order.status === 'processing'
                  ? 'bg-orange-100 text-orange-800'
                  : order.status === 'cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {order.order_items?.map((item: OrderItemType) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center py-2 border-b last:border-b-0"
            >
              <div className="flex items-center">
                {item.product?.image && (
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-12 h-12 object-cover rounded mr-4"
                  />
                )}
                <div>
                  <p className="font-medium">
                    {item.product?.title || 'Product'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="font-medium mt-2 md:mt-0">
                ${(item.quantity * item.price).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="flex justify-end pt-2">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
