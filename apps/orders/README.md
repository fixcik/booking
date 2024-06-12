```mermaid

sequenceDiagram
  actor User
  participant LoadBalancer
  box
    participant Api
    participant OrderService
  end
  User ->> LoadBalancer: Create new order
  LoadBalancer ->> Api: Forward request
  OrderService ->> Database: Store order
  Database -->> OrderService: Confirmation
  Api -->> LoadBalancer: Order created
  LoadBalancer -->> User: Order created
```
