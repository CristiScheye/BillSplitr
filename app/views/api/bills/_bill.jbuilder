json.extract! bill, :id, :amount, :description
json.date format_date(bill.date)

json.amount_not_charged bill.amount_not_charged

json.lender do
  json.id bill.lender.id
  json.f_name bill.lender.f_name
  json.l_name bill.lender.l_name
  json.email bill.lender.email
  json.name bill.lender.name
end

json.bill_shares bill.bill_shares, partial: 'api/bill_shares/bill_share', as: :bill_share