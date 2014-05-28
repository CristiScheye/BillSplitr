json.extract! bill_share, :id, :amount, :status, :created_at, :updated_at

json.bill do
  json.id bill_share.bill.id
  json.amount bill_share.bill.amount
  json.date format_date(bill_share.bill.date)
  json.description bill_share.bill.description
end

json.debtor do
  json.id bill_share.debtor.id
  json.f_name bill_share.debtor.f_name
  json.l_name bill_share.debtor.l_name
  json.email bill_share.debtor.email
end

json.lender do
  json.id bill_share.bill.lender.id
  json.f_name bill_share.bill.lender.f_name
  json.l_name bill_share.bill.lender.l_name
  json.email bill_share.bill.lender.email
end
