json.extract! bill, :id, :amount, :description
json.debtors bill.debtors, partial: 'api/users/user', as: :user