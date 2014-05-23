json.extract! bill_share, :id, :amount

json.debtor do
  json.id bill_share.debtor.id
  json.f_name bill_share.debtor.f_name
  json.l_name bill_share.debtor.l_name
  json.email bill_share.debtor.email
end
